
//Interface for each expense item:
export interface Expenses {
    Ionicon: string;        // Icon representing the expense category
    Source: string;         // Source of the expense (e.g., Cash, Card)
    Date: Date;             // Date of the expense in ISO format (YYYY-MM-DD)
    Type: string;           // Type of the expense (e.g., Variable, Fixed, Extra)
    Category: string;       // Category of the expense (e.g., Food, Transport)
    Amount: number;         // Amount spent in the expense
    Remarks: string | null;        // Additional remarks or description of the expense
}

//Interface for each expense input/addition
export interface ExpenseInput {
    Source: string;
    Type: string;
    Category: CategoryInterface;
    Amount: number;
    Remarks: string | null;
}

//Interface for expense Categories
export interface CategoryInterface {
  Name: string; // Category name
  Ionicon: string; // Icon representing the category
}


export class ExpenseType {
    static VariableExpenses: string = 'Variable Expenses';  // Categories under Variable Expenses
    static FixedExpenses: string = 'Fixed Expenses';       // Categories under Fixed Expenses
    static ExtraExpenses: string = 'Extra Expenses';       // Categories under Extra Expenses
}