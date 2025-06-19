import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTitle, IonContent, IonHeader, IonToolbar, IonFooter, NavParams, IonIcon, IonText, IonGrid, IonCol, IonRow, IonList, IonLabel, IonItem, IonInput, IonButton, ModalController } from "@ionic/angular/standalone";
import { Expenses } from 'src/app/interfaces/expenses.interface';

@Component({
  selector: 'app-expense-item-detail-modal',
  templateUrl: './expense-item-detail-modal.component.html',
  styleUrls: ['./expense-item-detail-modal.component.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonLabel, IonList, IonRow, IonCol, IonGrid, IonText, IonIcon, IonFooter, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule]
})
export class ExpenseItemDetailModalComponent implements OnInit {

  private expenseItem: Expenses;

  public itemCategory: string;
  public itemAmount: number;
  public itemRemarks: string | null;
  public itemType: string;
  public itemIonicon: string;
  public itemSourceOfFund: string;
  public itemExpenseDate: string;

  public colorMainTheme: string = "secondary"; //dark blue

  public isList: boolean = true;
  public isEditing: boolean = false;

  //Editing buttons
  button: any = {
    edit: editingbuttons.Edit,
    save: editingbuttons.Save,
    discard: editingbuttons.Discard,
    delete: editingbuttons.Delete
  }


  constructor(
    private navParams: NavParams,
    private itemDetailModal: ModalController
  ) {
    this.expenseItem = this.navParams.get('expenseItem');
    console.log('Expense Item:', this.expenseItem);
    if (!this.expenseItem) {
      console.error('Expense item not provided to the modal');
      //TODO: Handle invalid expense item error
    }
    this.itemCategory = this.expenseItem.Category;
    this.itemAmount = this.expenseItem.Amount;
    this.itemRemarks = this.expenseItem.Remarks;
    this.itemType = this.expenseItem.Type;
    this.itemIonicon = this.expenseItem.Ionicon;
    this.itemSourceOfFund = this.expenseItem.Source;
    this.itemExpenseDate = this.expenseItem.Date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
  }

  ngOnInit() { }

  editExpense(state: string) {
    switch (state) {
      case (editingbuttons.Edit):
        this.isEditing = true;
        return;
      case (editingbuttons.Save):
        this.isEditing = false;
        return;
      case (editingbuttons.Discard):
        this.isEditing = false;
        return;
      case (editingbuttons.Delete):
        this.isEditing = false;
        return;
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