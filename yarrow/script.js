class App {
    paycheckAmount = 0;
    taxDeductions = 0;
    takeHomePay = 0;
    spendingCategories = {};

    remaining = 0;

    calcTakeHomePay() {
        this.takeHomePay = this.paycheckAmount - this.taxDeductions;
        return this.takeHomePay;
    }
}

const app = new App();