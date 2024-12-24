class App {
    paycheckAmount = 0;
    taxDeductions = 0;
    takeHomePay = 0;
    spendingCategories = {};
    remaining = 0;

    calcTakeHomePay() {
        this.paycheckAmount = this.spendingCategories.gross;
        // this.taxDeductions = this.spendingCategories.
        this.takeHomePay = this.paycheckAmount - this.taxDeductions;
        return this.takeHomePay;
    }

    calcTotal(category) {
        // Go through each spending category and sum all subcategories
        // Return the total for the spending category
    };
}

const app = new App();