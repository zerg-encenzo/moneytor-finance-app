import { Component, OnInit } from '@angular/core';

//Components:
import { HeaderComponent } from "../../components/header/header.component";
import { IonContent, IonTitle, IonFooter, IonToolbar, IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonCardTitle, IonGrid, IonRow, IonCol, IonItemDivider, IonLabel, IonSearchbar, IonHeader, IonModal, IonButtons, IonButton, IonItem, IonInput, IonIcon } from "@ionic/angular/standalone";
import { ExpenseInputComponent } from "../../components/expense-input/expense-input.component";
import { ExpenseListComponent } from "../../components/expense-list/expense-list.component";
import { ExpenseDailySummaryComponent } from "../../components/expense-daily-summary/expense-daily-summary.component";
import { Expenses, ExpenseType } from 'src/app/interfaces/expenses';
import { FormsModule } from '@angular/forms';
import { RxjsLearningComponent } from "../../rxjs-components/rxjs-learning/rxjs-learning.component";
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
  standalone: true,
  imports: [IonIcon, FormsModule, IonInput, IonItem, IonButton, IonButtons, IonModal, IonHeader, IonSearchbar, IonLabel, IonItemDivider, IonCol, IonRow, IonGrid, IonCardTitle, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonToolbar, IonFooter, IonTitle, IonContent, HeaderComponent, ExpenseInputComponent, ExpenseListComponent, ExpenseDailySummaryComponent, RxjsLearningComponent, CommonModule],
})
export class ExpensesPage implements OnInit {

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
    }
  ];

  //Searchbar Parameters:
  public expenseListFiltered: Expenses[] = [... this.expenseList];


  //Searchbar Parameters:
  public searchbarPlaceholder: string = 'Find Item';
  constructor(
    private api: ApiService,
    private router: Router,
  ) {
    
  }

  ngOnInit() {
  }


  getExpenseCategoriesFromServer() {
    this.api.getData('/Moneytor/ExpenseCategory').subscribe({
      next: (data) => {
        console.log('Expense Categories From Server:', data);
        // You can process the data here if needed
      },
      error: (error) => {
        console.error('Error fetching expense categories:', error);
      }
    });
  }

  viewBudgetDetails() {
    this.router.navigate(['/budgets']);
  }


  addNewExpense(expense: Expenses) {
    // this.expenseList.unshift(expense); // Add new expense to the beginning of the list
    this.expenseList = [expense, ...this.expenseList]; // Add new expense to the beginning of the list
    this.expenseListFiltered = [...this.expenseList]; // Reset the filtered list to include the new expense
  }

  handleSearchInput(event: Event) {
    const targent = event.target as HTMLIonSearchbarElement;
    const query = targent.value?.toLowerCase() || '';
    this.expenseListFiltered = this.expenseList.filter(expense => expense.Category.toLowerCase().includes(query) ||
      expense.Remarks.toLowerCase().includes(query));
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

  request(){
    this.getExpenseCategoriesFromServer();
  }

}
