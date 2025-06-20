import { Component, Input,Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { IonCardContent, IonCard, IonIcon, IonRow, IonCol, IonText, IonButton, IonModal, IonDatetime, IonButtons } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { Expenses } from 'src/app/interfaces/expenses.interface';
import { UserProfile } from 'src/app/utilities/user-profile';

@Component({
  selector: 'app-expense-daily-summary',
  templateUrl: './expense-daily-summary.component.html',
  styleUrls: ['./expense-daily-summary.component.scss'],
  standalone: true,
  imports: [IonButtons, IonDatetime, IonModal, IonButton, IonText, IonCol, IonRow, IonIcon, IonCard, IonCardContent, CommonModule]
})
export class ExpenseDailySummaryComponent implements OnInit {

  @ViewChild('dateModal', { static: true }) dateModal!: IonModal;

  @Input() set list(value: Expenses[]) {
    this.expenseList = value;
    this.calculateDailyExpenses();
  }

  @Output() date = new EventEmitter<Date>();

  private expenseList: Expenses[] = [];

  //Display Properties:
  public totalDailyExpenses: number = 0;
  public selectedDate: Date = new Date;

  public userNameDisplay: string = UserProfile.UserFirstName //+ ' ' + UserProfile.UserLastName; //Display user name in the summary

  constructor() { }

  ngOnInit() {

  }

  //Calculate Daily Expenses:
  calculateDailyExpenses() {
    this.totalDailyExpenses = this.expenseList.reduce((total, expense) => {
      return total + (expense.Amount || 0);
    }, 0);
    console.log('Total Daily Expenses:', this.totalDailyExpenses);
  }

  openDatePickerModal() {
    this.dateModal.present();
  }

  confirmSelectedDate(event: any) {
    // console.log('Selected Date:', event.detail.value);
    this.selectedDate = event.detail.value || new Date();
    this.date.emit(this.selectedDate);
  }
}
