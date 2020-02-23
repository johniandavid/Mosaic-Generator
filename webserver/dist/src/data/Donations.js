"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Donations = /** @class */ (function () {
    function Donations() {
        this.donations_arr = new Array();
        this.currentDonationAmount = 0;
    }
    Donations.prototype.addDonationAmount = function (amount) {
        this.currentDonationAmount += amount;
    };
    return Donations;
}());
exports.Donations = Donations;
