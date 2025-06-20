import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTitle, IonContent, IonHeader, IonToolbar, IonFooter, NavParams, IonIcon, IonGrid, IonCol, IonRow, IonList, IonLabel, IonItem, IonInput, IonButton, ModalController } from "@ionic/angular/standalone";
import { Expenses } from 'src/app/interfaces/expenses.interface';
import { FormsModule } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-expense-item-detail-modal',
  templateUrl: './expense-item-detail-modal.component.html',
  styleUrls: ['./expense-item-detail-modal.component.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonLabel, IonList, IonRow, IonCol, IonGrid, IonIcon, IonFooter, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule]
})
export class ExpenseItemDetailModalComponent implements OnInit {

  public expenseItem: Expenses;

  //Editing parameters:
  public originalItem: { Amount: number, Remarks: string | null } = {
    Amount: 0,
    Remarks: null,
  }

  public colorMainTheme: string = "secondary"; //dark blue

  public isList: boolean = true;
  public isEditing: boolean = false;            //toogles if user is on edit mode or not
  public isChanged: boolean = false;            //true if user has made any changes to the data while on editing mode; false if no changes were made.

  //Editing buttons
  button: any = {
    edit: editingbuttons.Edit,
    save: editingbuttons.Save,
    discard: editingbuttons.Discard,
    delete: editingbuttons.Delete
  }


  constructor(
    private navParams: NavParams,
    private itemDetailModal: ModalController,
    private itemDetailAlert: AlertService
  ) {
    this.expenseItem = this.navParams.get('expenseItem');
    console.log('Expense Item:', this.expenseItem);
    if (!this.expenseItem) {
      console.error('Expense item not provided to the modal');
      //TODO: Handle invalid expense item error
    }

    //Store original information of the item to the originalItem object:
    this.originalItem.Amount = this.expenseItem.Amount;
    this.originalItem.Remarks = this.expenseItem.Remarks;
  }

  ngOnInit() { }

  async editExpense(state: string) {
    this.checkChanges();

    switch (state) {
      case (editingbuttons.Edit):
        this.isEditing = true;
        return;
      case (editingbuttons.Save):
        this.isEditing = false;
        return;
      case (editingbuttons.Discard):
        this.isEditing = false;
        this.expenseItem.Amount = this.originalItem.Amount;
        this.expenseItem.Remarks = this.originalItem.Remarks
        this.isChanged = false;
        return;
      case (editingbuttons.Delete):
        this.isEditing = false;
        await this.itemDetailAlert.confirm({message: "Are you sure you want to delete this item?"}).then((res) => {
          if (res) {
            this.itemDetailModal.dismiss(this.expenseItem);
          }
        });
        return;
    }
  }

  checkChanges() {
    if (this.expenseItem.Amount !== this.originalItem.Amount || this.expenseItem.Remarks !== this.originalItem.Remarks) {
      this.isChanged = true;
    }
    else {
      this.isChanged = false;
    }
  }

  public async dismissModal() {
    await this.itemDetailModal.dismiss();
  }
}

class editingbuttons {
  static Edit: string = 'Edit';
  static Save: string = 'Save';
  static Discard: string = 'Discard';
  static Delete: string = 'Delete';
}