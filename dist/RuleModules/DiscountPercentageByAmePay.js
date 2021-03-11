"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountPercentageByAmePay = void 0;
const moment_1 = __importDefault(require("moment"));
function DiscountPercentageByAmePay(cart) {
    if (moment_1.default.utc().isBetween(new Date(this.startDate), new Date(this.endDate))) {
        if (this.stores.includes(cart.store))
            if (!cart.flags.includes("service") &&
                cart.selectedPayments.includes("AME_DIGITAL"))
                cart.products.map((product) => {
                    if (this.productEans.includes(product.product.ean)) {
                        const discount = Number((product.price *
                            product.quantity *
                            this.discountByPercentage).toFixed(2));
                        product.discountArray.push({
                            message: "DISCOUNT_PERCENTAGE_BY_AME_PAY",
                            value: discount,
                            discountType: "VALUE",
                            campaign: "DISCOUNT_PERCENTAGE_BY_AME_PAY",
                        });
                        product.discount = discount;
                        cart.discount += discount;
                        cart.total = Number((cart.total - discount).toFixed(2));
                        cart.charges = Number(cart.charges).toFixed(2);
                    }
                    return product;
                });
        return cart;
    }
}
exports.DiscountPercentageByAmePay = DiscountPercentageByAmePay;
exports.default = DiscountPercentageByAmePay;
