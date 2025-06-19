import { Component, OnInit, ViewChild } from '@angular/core';

//Components:
import { HeaderComponent } from "../../components/header/header.component";
import { IonContent, IonTitle, IonFooter, IonToolbar, IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonCardTitle, IonGrid, IonRow, IonCol, IonItemDivider, IonLabel, IonSearchbar, IonHeader, IonModal, IonButtons, IonButton, IonItem, IonInput, IonIcon, ModalController } from "@ionic/angular/standalone";
import { ExpenseListComponent } from "../../components/expense-list/expense-list.component";
import { ExpenseDailySummaryComponent } from "../../components/expense-daily-summary/expense-daily-summary.component";
import { ExpenseInput, Expenses, ExpenseType } from 'src/app/interfaces/expenses.interface';
import { FormsModule } from '@angular/forms';
import { RxjsLearningComponent } from "../../rxjs-components/rxjs-learning/rxjs-learning.component";
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExpenseAdditionInputModalComponent } from 'src/app/components/modals/expense-addition-input-modal/expense-addition-input-modal.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
  standalone: true,
  imports: [IonIcon, FormsModule, IonInput, IonItem, IonButton, IonButtons, IonModal, IonHeader, IonSearchbar, IonLabel, IonItemDivider, IonCol, IonRow, IonGrid,
    IonCardTitle, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonToolbar, IonFooter, IonTitle, IonContent, HeaderComponent, ExpenseListComponent,
    ExpenseDailySummaryComponent, RxjsLearningComponent, CommonModule],
})
export class ExpensesPage implements OnInit {

  @ViewChild('searchBarMobile') searchBarMobile: HTMLIonSearchbarElement | undefined;
  @ViewChild('searchBarWeb') searchBarWeb: HTMLIonSearchbarElement | undefined;

  public title: string = 'Moneytor';

  public expenseList: Expenses[] = [
    {
      Ionicon: 'fast-food',
      Category: 'Food',
      Amount: 150,
      Remarks: 'Lunch at the new cafe',
      Type: ExpenseType.VariableExpenses,
      Source: 'Cash',
      Date: new Date()
    },
    {
      Ionicon: 'restaurant',
      Category: 'Dining Out',
      Amount: 200,
      Remarks: 'Dinner with friends',
      Type: ExpenseType.VariableExpenses,
      Source: 'SeaBank',
      Date: new Date()
    },
    {
      Ionicon: 'pizza',
      Category: 'Snacks',
      Amount: 50,
      Remarks: 'Evening snacks',
      Type: ExpenseType.VariableExpenses,
      Source: 'Metrobank',
      Date: new Date()
    },
    // {
    //   Ionicon: 'fast-food',
    //   Category: 'Food',
    //   Amount: 150,
    //   Remarks: 'Lunch at the new cafe',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'Cash',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'restaurant',
    //   Category: 'Dining Out',
    //   Amount: 200,
    //   Remarks: 'Dinner with friends',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'SeaBank',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'pizza',
    //   Category: 'Snacks',
    //   Amount: 50,
    //   Remarks: 'Evening snacks',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'Metrobank',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'fast-food',
    //   Category: 'Food',
    //   Amount: 150,
    //   Remarks: 'Lunch at the new cafe',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'Cash',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'restaurant',
    //   Category: 'Dining Out',
    //   Amount: 200,
    //   Remarks: 'Dinner with friends',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'SeaBank',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'pizza',
    //   Category: 'Snacks',
    //   Amount: 50,
    //   Remarks: 'Evening snacks',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'Metrobank',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'fast-food',
    //   Category: 'Food',
    //   Amount: 150,
    //   Remarks: 'Lunch at the new cafe',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'Cash',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'restaurant',
    //   Category: 'Dining Out',
    //   Amount: 200,
    //   Remarks: 'Dinner with friends',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'SeaBank',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'pizza',
    //   Category: 'Snacks',
    //   Amount: 50,
    //   Remarks: 'Evening snacks',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'Metrobank',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'fast-food',
    //   Category: 'Food',
    //   Amount: 150,
    //   Remarks: 'Lunch at the new cafe',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'Cash',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'restaurant',
    //   Category: 'Dining Out',
    //   Amount: 200,
    //   Remarks: 'Dinner with friends',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'SeaBank',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'pizza',
    //   Category: 'Snacks',
    //   Amount: 50,
    //   Remarks: 'Evening snacks',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'Metrobank',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'fast-food',
    //   Category: 'Food',
    //   Amount: 150,
    //   Remarks: 'Lunch at the new cafe',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'Cash',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'restaurant',
    //   Category: 'Dining Out',
    //   Amount: 200,
    //   Remarks: 'Dinner with friends',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'SeaBank',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'pizza',
    //   Category: 'Snacks',
    //   Amount: 50,
    //   Remarks: 'Evening snacks',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'Metrobank',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'fast-food',
    //   Category: 'Food',
    //   Amount: 150,
    //   Remarks: 'Lunch at the new cafe',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'Cash',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'restaurant',
    //   Category: 'Dining Out',
    //   Amount: 200,
    //   Remarks: 'Dinner with friends',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'SeaBank',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'pizza',
    //   Category: 'Snacks',
    //   Amount: 50,
    //   Remarks: 'Evening snacks',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'Metrobank',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'fast-food',
    //   Category: 'Food',
    //   Amount: 150,
    //   Remarks: 'Lunch at the new cafe',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'Cash',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'restaurant',
    //   Category: 'Dining Out',
    //   Amount: 200,
    //   Remarks: 'Dinner with friends',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'SeaBank',
    //   Date: new Date()
    // },
    // {
    //   Ionicon: 'pizza',
    //   Category: 'Snacks',
    //   Amount: 50,
    //   Remarks: 'Evening snacks',
    //   Type: ExpenseType.VariableExpenses,
    //   Source: 'Metrobank',
    //   Date: new Date()
    // },
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


  async openAddExpenseInputModal() {
    const modal = await this.modal.create({
      component: ExpenseAdditionInputModalComponent,
      cssClass: "small-modal",
    });
    modal.onDidDismiss().then((response) => {
      console.log('Modal dismissed with data:', response.data);
      if (response.data != null) {

        let item: ExpenseInput = response.data;

        //Preparing payload to add new expense:
        const newExpense: Expenses = {
          Ionicon: item.Category.Ionicon,
          Source: item.Source,
          Date: new Date(), //Date today
          Type: item.Type,
          Category: item.Category.Name,
          Amount: item.Amount,
          Remarks: item.Remarks
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
