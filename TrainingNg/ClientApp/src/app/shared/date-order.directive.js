"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateOrderValidator = function (control) {
    var startDate = new Date(control.controls['start'].value);
    var endDate = new Date(control.controls['end'].value);
    var diffTime = endDate.getTime() - startDate.getTime();
    return diffTime < 0 ? { 'dateOrder': true } : null;
};
//# sourceMappingURL=date-order.directive.js.map