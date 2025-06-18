import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonCardSubtitle, IonCard, IonCardHeader, IonCardContent, IonInput, IonCol, IonRow, IonSelect, IonSelectOption, IonTitle, IonContent, IonLabel, IonItem, IonToolbar, IonFooter, IonIcon, IonButton, IonGrid, IonHeader } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { Expenses } from 'src/app/interfaces/expenses';

interface CategoryInterface {
  Category: string; // Category name
  Ionicon: string; // Icon representing the category
}


@Component({
  selector: 'app-expense-addition-input-modal',
  templateUrl: './expense-addition-input-modal.component.html',
  styleUrls: ['./expense-addition-input-modal.component.scss'],
  standalone: true,
  imports: [IonHeader, IonGrid, IonButton, IonIcon, IonFooter, IonToolbar, IonItem, IonLabel, IonContent, IonTitle, IonRow, IonCol, IonInput, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonSelect, IonSelectOption, FormsModule]
})

export class ExpenseAdditionInputModalComponent implements OnInit {

  //Temporary Object to hold fund sources data:
  public fundSources: { Name: string, Ionicon: string }[] = [
    { Name: 'Cash', Ionicon: 'cash-outline' },
    { Name: 'SeaBank', Ionicon: 'card-outline' },
    { Name: 'Metrobank', Ionicon: 'card-outline' },
    { Name: 'BDO', Ionicon: 'card-outline' },
    { Name: 'GCash', Ionicon: 'wallet-outline' }
  ]

  //Temporary Object to hold expense type data:
  public expenseType: { Name: string, Categories: CategoryInterface[] }[] = [
    {
      Name: 'Variable Expenses',
      Categories: [
        { Category: 'Gasoline', Ionicon: 'car' },
        { Category: 'Food', Ionicon: 'fast-food' },
        { Category: 'Self-care', Ionicon: 'fitness' }
      ]
    },
    {
      Name: 'Fixed Expenses',
      Categories: [
        { Category: 'Rent', Ionicon: 'home' },
        { Category: 'Water District', Ionicon: 'water' },
        { Category: 'Internet', Ionicon: 'wifi' }
      ]
    },
  ]

  public Categories: CategoryInterface[] = [];    //Holds categories based on selected expense type

  public selectedFundSource: string | null = null;    //Holds selected fund source
  public selectedExpenseType: string | null = null;   //Holds selected type
  public selectedCategory: CategoryInterface = { Category: '', Ionicon: '' };      //Holds selected category
  public expenseRemarks: string | null = null;          //Holds expense Remarks/Description
  public expenseAmount: number | null = null;         //Holds expense amount

  //Toggle Bollean Parameters:
  public isExpenseInputVisible: boolean = true;

  constructor() { }

  ngOnInit() { }

  //Fund Source Change Function:
  onFundSourceChange(event: any) {
    this.selectedFundSource = event.detail.value;
  }

  //Expense Type Functions:
  onExpenseTypeChange(event: any) {
    this.selectedExpenseType = event.detail.value;
    const selectedType = this.expenseType.find(type => type.Name === this.selectedExpenseType);
    this.Categories = selectedType ? selectedType.Categories : [];
    this.selectedCategory = { Category: '', Ionicon: '' }; // Reset category when expense type changes
  }

  //Category Change Function:
  onCategoryChange(event: any) {
    this.selectedCategory.Category = event.detail.value;
    this.selectedCategory.Ionicon = this.Categories.find(cat => cat.Category === this.selectedCategory.Category)?.Ionicon || 'information';
    console.log('Selected Category:', this.selectedCategory);
  }

  //Toggle Functions:
  toggleExpenseInput() {
    this.isExpenseInputVisible = !this.isExpenseInputVisible;
  }

  //Add Expense Function:
  addExpense() {

  }

}
