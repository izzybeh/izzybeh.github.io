class App {
    paycheckAmount = 0;
    taxes = 0;
    takeHomePay = 0;
    spendingCategories = {};
    remaining = 0;

    calcTakeHomePay() {
        this.paycheckAmount = this.spendingCategories.pay.gross;
        let taxes = 0;
        for (const [key, tax] of Object.entries(this.spendingCategories.taxes)) {
            taxes = tax+taxes;
        }

        this.taxes = taxes;
        this.takeHomePay = this.paycheckAmount - taxes;
    };

    addCategory(category, subCategory, val) {
        let categoryObj = {};

        categoryObj[subCategory] = val;

        if (category in app.spendingCategories) {
            Object.assign(app.spendingCategories[category], categoryObj);
        } else {
            app.spendingCategories[category] = categoryObj;
        }
    };

    calcTotals() {
        // Go through each spending category and sum all subcategories
        // Return the total for the spending category
        for (let [category, subCategories] of Object.entries(this.spendingCategories)) {
            let total = 0,
                totalObj = {};
            
            console.log('cat:', category);

            for (let [subCategory, value] of Object.entries(subCategories)) {
                totalObj['total'] = value + total;
                console.log('total', total);
            }

            Object.assign(app.spendingCategories[category], totalObj);
        }
    };


}

const app = new App();