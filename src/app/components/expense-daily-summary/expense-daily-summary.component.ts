import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonCardTitle, IonIcon, IonRow, IonCol, IonText, IonLabel, IonButton, ModalController, IonDatetimeButton, IonModal, IonDatetime, IonGrid, IonButtons } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { Expenses } from 'src/app/interfaces/expenses.interface';
import { UserProfile } from 'src/app/interfaces/user-profile';

@Component({
  selector: 'app-expense-daily-summary',
  templateUrl: './expense-daily-summary.component.html',
  styleUrls: ['./expense-daily-summary.component.scss'],
  standalone: true,
  imports: [IonButtons, IonGrid, IonDatetime, IonModal, IonDatetimeButton, IonButton, IonLabel, IonText, IonCol, IonRow, IonIcon, IonCardTitle, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, CommonModule]
})
export class ExpenseDailySummaryComponent implements OnInit {

  @ViewChild('dateModal', { static: true }) dateModal!: IonModal;

  @Input() set list(value: Expenses[]) {
    this.expenseList = value;
    this.calculateDailyExpenses();
  }

  private expenseList: Expenses[] = [];

  //Display Properties:
  public totalDailyExpenses: number = 0;
  public selectedDate: Date = new Date;

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


  // //Open Filters Modal:
  // async openFiltersModal() {
  //   const modal = await this.modal.create({
  //     component: ExpenseFilterOptionsModalComponent,
  //     cssClass: "small-modal",
  //     componentProps: {
  //       expenseList: this.expenseList,
  //     }
  //   });
  //   modal.onDidDismiss().then((data) => {
  //     console.log('Modal dismissed with data:', data);
  //   });
  //   modal.present();
  // }

  openDatePickerModal() {
    this.dateModal.present();
  }

  confirmSelectedDate(event: any) {
    console.log('Selected Date:', event.detail.value);
    this.selectedDate = event.detail.value || new Date();
  }
}
