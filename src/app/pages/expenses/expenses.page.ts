import { Component, OnInit, ViewChild } from '@angular/core';

//Components:
import { IonGrid, IonRow, IonCol, IonSearchbar, IonButton, ModalController } from "@ionic/angular/standalone";
import { ExpenseListComponent } from "../../components/expense-list/expense-list.component";
import { ExpenseDailySummaryComponent } from "../../components/expense-daily-summary/expense-daily-summary.component";
import { ExpenseInput, Expenses, ExpenseType } from 'src/app/interfaces/expenses.interface';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExpenseAdditionInputModalComponent } from 'src/app/components/modals/expense-addition-input-modal/expense-addition-input-modal.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
  standalone: true,
  imports: [FormsModule, IonButton, IonSearchbar, IonCol, IonRow, IonGrid, ExpenseListComponent, ExpenseDailySummaryComponent, CommonModule],
})
export class ExpensesPage implements OnInit {

  @ViewChild('searchBarMobile') searchBarMobile: HTMLIonSearchbarElement | undefined;
  @ViewChild('searchBarWeb') searchBarWeb: HTMLIonSearchbarElement | undefined;

  public title: string = 'Moneytor';

  //ITEM CODE GENERATION SIMULATION:
  public itemCodeLastNumber: number = 3;

  public expenseList: Expenses[] = [
    {
      Ionicon: 'fast-food',
      Category: 'Food',
      Amount: 150,
      Remarks: 'Lunch at the new cafe',
      Type: ExpenseType.VariableExpenses,
      Source: 'Cash',
      Date: new Date(),
      ItemCode: 'AB12XXXXX'
    },
    {
      Ionicon: 'restaurant',
      Category: 'Dining Out',
      Amount: 200,
      Remarks: 'Dinner with friends',
      Type: ExpenseType.VariableExpenses,
      Source: 'SeaBank',
      Date: new Date(),
      ItemCode: 'HELLO7ZZZ'
    },
    {
      Ionicon: 'pizza',
      Category: 'Snacks',
      Amount: 50,
      Remarks: 'Evening snacks',
      Type: ExpenseType.VariableExpenses,
      Source: 'Metrobank',
      Date: new Date(),
      ItemCode: 'CODE12345'
    },
  ];

  //Searchbar Parameters:
  public expenseListFiltered: Expenses[] = [... this.expenseList];


  //Searchbar Parameters:
  public searchbarPlaceholder: string = 'Find Item';
  public searchTerm: string = '';
  public searchDebouce: number = 300;

  constructor(
    private api: ApiService,
    private router: Router,
    private modal: ModalController
  ) { }

  ngOnInit() {
    const mediaQuery = window.matchMedia('(max-width: 995px)');
    this.handleScreenChange(mediaQuery); // Call initially
    mediaQuery.addEventListener('change', this.handleScreenChange.bind(this));
  }

  handleScreenChange(e: MediaQueryList | MediaQueryListEvent) {
    if (this.searchBarMobile) {
      this.searchBarMobile.value = '';
    }
    if (this.searchBarWeb) {
      this.searchBarWeb.value = '';
    }
    this.expenseListFiltered = [...this.expenseList];
  }


  getExpenseCategoriesFromServer() {
    this.api.getData('/Moneytor/ExpenseCategory').subscribe({
      next: (data) => {
        console.log('Expense Categories From Server:', data);
      },
      error: (error) => {
        console.error('Error fetching expense categories:', error);
      }
    });
  }

  handleSearchInput(event?: Event) {
    const targent = event?.target as HTMLIonSearchbarElement;
    const query = targent.value?.toLowerCase() || '';
    this.expenseListFiltered = this.expenseList.filter(expense => expense.Category.toLowerCase().includes(query) ||
      expense.Remarks?.toLowerCase().includes(query));
  }

  filterListByDate(selectedDate: Date) {
    this.expenseListFiltered = this.expenseList.filter(expense => this.formatDateToYMD(expense.Date) == selectedDate.toString());
  }

  formatDateToYMD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  async openAddExpenseInputModal() {
    const modal = await this.modal.create({
      component: ExpenseAdditionInputModalComponent,
      cssClass: "small-modal",
    });
    modal.onDidDismiss().then((response) => {
      console.log('Modal dismissed with data:', response.data);
      if (response.data != null) {

        let item: Expenses = response.data;

        //Preparing payload to add new expense:
        const newExpense: Expenses = {
          Ionicon: item.Ionicon,
          Source: item.Source,
          Date: new Date(), //Date today
          Type: item.Type,
          Category: item.Category,
          Amount: item.Amount,
          Remarks: item.Remarks,
          ItemCode: item.ItemCode
        }
        this.addNewExpense(newExpense);
      }
    });
    modal.present();
  }

  addNewExpense(expense: Expenses) {
    this.expenseList = [expense, ...this.expenseList]; // Add new expense to the beginning of the list
    this.expenseListFiltered = [...this.expenseList]; // Reset the filtered list to include the new expense
  }


  login() {
    this.api.autoLoginTest().subscribe({
      next: (data) => {
        console.log('Auto Login Test Data:', data);
        //Store user info to local Storage:
        localStorage.setItem('userInfo', JSON.stringify(data));

      },
      error: (error) => {
        console.error('Error during auto login test:', error);
      }
    });
  }

  request() {
    this.getExpenseCategoriesFromServer();
  }

}
