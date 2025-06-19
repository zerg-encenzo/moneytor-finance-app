import { Component, OnInit } from '@angular/core';
import { IonCardSubtitle, IonCard, IonCardHeader, IonCardContent, IonInput, IonCol, IonRow, IonSelect, IonSelectOption, IonTitle, IonContent, IonLabel, IonItem, IonToolbar, IonFooter, IonIcon, IonButton, IonGrid, IonHeader, ModalController } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { ExpenseInput, CategoryInterface } from 'src/app/interfaces/expenses.interface';


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
        { Name: 'Gasoline', Ionicon: 'car' },
        { Name: 'Food', Ionicon: 'fast-food' },
        { Name: 'Self-care', Ionicon: 'fitness' }
      ]
    },
    {
      Name: 'Fixed Expenses',
      Categories: [
        { Name: 'Rent', Ionicon: 'home' },
        { Name: 'Water District', Ionicon: 'water' },
        { Name: 'Internet', Ionicon: 'wifi' }
      ]
    },
  ]


  public Categories: CategoryInterface[] = [];    //Holds categories based on selected expense type

  public selectedFundSource: string = "";                                       //Holds selected fund source
  public selectedExpenseType: string = "";                                      //Holds selected type
  public selectedCategory: CategoryInterface = { Name: '', Ionicon: '' };   //Holds selected category
  public expenseRemarks: string | null = null;                                  //Holds expense Remarks/Description
  public expenseAmount: number | null = null;                                             //Holds expense amount

  //Toggle Bollean Parameters:
  public isExpenseInputVisible: boolean = true;

  constructor(
    private expenseInputModal: ModalController
  ) { }

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
    this.selectedCategory = { Name: '', Ionicon: '' }; // Reset category when expense type changes
  }

  //Category Change Function:
  onCategoryChange(event: any) {
    this.selectedCategory.Name = event.detail.value;
    this.selectedCategory.Ionicon = this.Categories.find(cat => cat.Name === this.selectedCategory.Name)?.Ionicon || 'information';
    console.log('Selected Category:', this.selectedCategory);
  }

  //Toggle Functions:
  toggleExpenseInput() {
    this.isExpenseInputVisible = !this.isExpenseInputVisible;
  }

  //Add Expense Function:
  addExpense() {
    const newExpense: ExpenseInput = {
      Source: this.selectedFundSource,
      Type: this.selectedExpenseType,
      Category: this.selectedCategory,
      Amount: this.expenseAmount || 0,
      Remarks: this.expenseRemarks,
    }
    this.exit(newExpense);
  }

  exit(returnObject?: any){
    this.expenseInputModal.dismiss(returnObject || null);
  }
}
