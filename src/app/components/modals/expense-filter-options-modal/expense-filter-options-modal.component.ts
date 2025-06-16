import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTitle, IonHeader, IonToolbar, IonContent, IonFooter, IonGrid, IonRow, IonCol, IonIcon, ModalController, IonList, IonItem, IonLabel, IonInput, IonDatetimeButton, IonDatetime, IonModal, IonCheckbox } from "@ionic/angular/standalone";

@Component({
  selector: 'app-expense-filter-options-modal',
  templateUrl: './expense-filter-options-modal.component.html',
  styleUrls: ['./expense-filter-options-modal.component.scss'],
  standalone: true,
  imports: [IonCheckbox, IonModal, IonDatetime, IonDatetimeButton, IonInput, IonLabel, IonItem, IonList, IonIcon, IonCol, IonRow, IonGrid, IonFooter, IonContent, IonToolbar, IonHeader, IonTitle,CommonModule]
})
export class ExpenseFilterOptionsModalComponent  implements OnInit {

  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {}


  confirmSelectedDate(event: any) {
    console.log('Selected Date:', event.detail.value);
  }


  public async dismissModal() {
    await this.modal.dismiss();
  }
}
