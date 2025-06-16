import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonCardTitle, IonIcon, IonRow, IonCol, IonText, IonLabel, IonButton, ModalController, IonDatetimeButton, IonModal, IonDatetime } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { Expenses } from 'src/app/interfaces/expenses';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { ExpenseFilterOptionsModalComponent } from '../modals/expense-filter-options-modal/expense-filter-options-modal.component';

@Component({
  selector: 'app-expense-daily-summary',
  templateUrl: './expense-daily-summary.component.html',
  styleUrls: ['./expense-daily-summary.component.scss'],
  standalone: true,
  imports: [IonDatetime, IonModal, IonDatetimeButton, IonButton, IonLabel, IonText, IonCol, IonRow, IonIcon, IonCardTitle, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, CommonModule]
})
export class ExpenseDailySummaryComponent implements OnInit {

  @Input() set list(value: Expenses[]) {
    this.expenseList = value;
    this.calculateDailyExpenses();
  }

  private expenseList: Expenses[] = [];

  //Display Properties:
  public totalDailyExpenses: number = 0;
  public dateToday: Date = new Date();
  public userNameDisplay: string = UserProfile.UserFirstName //+ ' ' + UserProfile.UserLastName; //Display user name in the summary

  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {

  }

  //Calculate Daily Expenses:
  calculateDailyExpenses() {
    this.totalDailyExpenses = this.expenseList.reduce((total, expense) => {
      return total + (expense.Amount || 0);
    }, 0);
    console.log('Total Daily Expenses:', this.totalDailyExpenses);
  }


  //Open Filters Modal:
  async openFiltersModal() {
    const modal = await this.modal.create({
      component: ExpenseFilterOptionsModalComponent,
      cssClass: "small-modal",
      componentProps: {
        expenseList: this.expenseList,
      }
    });
    modal.onDidDismiss().then((data) => {
      console.log('Modal dismissed with data:', data);
    });
    modal.present();
  }


  confirmSelectedDate(event: any) {
    console.log('Selected Date:', event.detail.value);
  }
}
