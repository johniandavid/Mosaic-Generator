"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Campain = /** @class */ (function () {
    function Campain(channelID) {
        this.channelID = channelID;
        this.mosaicState = 'Start';
    }
    Campain.prototype.setSocket = function (socket) {
        this.socket = socket;
    };
    return Campain;
}());
exports.default = Campain;
