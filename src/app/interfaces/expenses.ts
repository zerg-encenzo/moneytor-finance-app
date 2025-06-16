export interface Expenses {
    Ionicon: string;        // Icon representing the expense category
    Source: string;         // Source of the expense (e.g., Cash, Card)
    Date: Date;           // Date of the expense in ISO format (YYYY-MM-DD)
    Type: string;           // Type of the expense (e.g., Variable, Fixed, Extra)
    Category: string;       // Category of the expense (e.g., Food, Transport)
    Amount: number;         // Amount spent in the expense
    Remarks: string;        // Additional remarks or description of the expense
}

export class ExpenseType {
    static VariableExpenses: string = 'Variable Expenses';  // Categories under Variable Expenses
    static FixedExpenses: string = 'Fixed Expenses';       // Categories under Fixed Expenses
    static ExtraExpenses: string = 'Extra Expenses';       // Categories under Extra Expenses
}