//Header Component:
import { HeaderComponent } from "../../components/header/header.component";

//Pages:
import { ExpensesPage } from "../expenses/expenses.page";
import { BudgetsPage } from "../budgets/budgets.page";
import { SavingsPage } from "../savings/savings.page";

import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonToolbar, IonFooter, IonGrid, IonRow, IonCol, IonButton, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonIcon, IonButton, IonCol, IonRow, IonGrid, IonFooter, IonToolbar, IonContent, HeaderComponent, ExpensesPage, CommonModule, BudgetsPage, SavingsPage],
})
export class HomePage {

  public title: string = 'Moneytor';
  public currentTab: string = 'Expenses';
  public tabButtons: TabButton[] = [
    {
      name: "Expenses",
      ionicon: "cart-outline"
    },
    {
      name: "Budgets",
      ionicon: "bar-chart-outline"
    },
    {
      name: "Savings",
      ionicon: "cash-outline"
    },
  ]

  constructor(
    private api: ApiService,
    private router: Router,
  ) {}

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

  toogleTab(btn: TabButton){
    this.currentTab = btn.name;
    console.log(btn);
  }

  viewBudgetDetails() {
    this.router.navigate(['/budgets']);
  }


  request(){
    this.getExpenseCategoriesFromServer();
  }
}


//INTERFACES:
interface TabButton {
  name: string;
  ionicon: string;
}