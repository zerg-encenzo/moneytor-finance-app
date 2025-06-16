import { Component } from '@angular/core';

//Components:
import { HeaderComponent } from "../../components/header/header.component";
import { IonContent, IonTitle, IonFooter, IonToolbar, IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonCardTitle, IonGrid, IonRow, IonCol, IonItemDivider, IonLabel, IonSearchbar, IonHeader, IonModal, IonButtons, IonButton, IonItem, IonInput } from "@ionic/angular/standalone";
import { ExpenseInputComponent } from "../../components/expense-input/expense-input.component";
import { ExpenseListComponent } from "../../components/expense-list/expense-list.component";
import { ExpenseDailySummaryComponent } from "../../components/expense-daily-summary/expense-daily-summary.component";
import { Expenses, ExpenseType } from 'src/app/interfaces/expenses';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [FormsModule, IonInput, IonItem, IonButton, IonButtons, IonModal, IonHeader, IonSearchbar, IonLabel, IonItemDivider, IonCol, IonRow, IonGrid, IonCardTitle, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonToolbar, IonFooter, IonTitle, IonContent, HeaderComponent, ExpenseInputComponent, ExpenseListComponent, ExpenseDailySummaryComponent],
})
export class HomePage {

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
  constructor() {}



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
}
