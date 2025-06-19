import { Component, input, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCardSubtitle, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonLabel, IonItem, IonList, IonGrid, IonCol, IonRow, ModalController } from "@ionic/angular/standalone";
import { Expenses } from 'src/app/interfaces/expenses.interface';
import { ExpenseItemDetailModalComponent } from '../modals/expense-item-detail-modal/expense-item-detail-modal.component';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
  standalone: true,
  imports: [IonRow, IonCol, IonGrid, IonList, IonItem, IonLabel, IonIcon, CommonModule, IonButton, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle]
})
export class ExpenseListComponent implements OnInit {

  @Input() public expenseListDisplay: Expenses[] = [];

  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.expenseListDisplay = this.expenseListDisplay.reverse(); // Reverse the order to show the latest expenses first
    console.log('Expense List Display:', this.expenseListDisplay);
  }

  async openItemDetailsModal(selectedExpenseItem: Expenses) {
    const modal = await this.modal.create({
      component: ExpenseItemDetailModalComponent,
      cssClass: "small-modal",
      componentProps: {
        expenseItem: selectedExpenseItem,
      }
    });
    modal.onDidDismiss().then((data) => {
      console.log('Modal dismissed with data:', data);
    });
    modal.present();
  }
}
