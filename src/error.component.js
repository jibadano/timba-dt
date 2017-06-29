"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var error_1 = require("./model/error");
var app_service_1 = require("./app.service");
var ErrorComponent = (function () {
    function ErrorComponent(services) {
        this.services = services;
        this._err = new error_1.Error();
    }
    Object.defineProperty(ErrorComponent.prototype, "err", {
        set: function (err) {
            if (err) {
                if (err.code && err.code != '') {
                    this.staticModal.show();
                    this._err = err;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ErrorComponent.prototype.ngOnInit = function () {
    };
    return ErrorComponent;
}());
__decorate([
    core_1.Input('err'),
    __metadata("design:type", error_1.Error),
    __metadata("design:paramtypes", [error_1.Error])
], ErrorComponent.prototype, "err", null);
ErrorComponent = __decorate([
    core_1.Component({
        selector: 'error',
        template: "\n    <!-- MODALS -->\n<div class=\"modal fade\" bsModal #errModal=\"bs-modal\" [config]=\"{backdrop: 'static'}\"\n     tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-sm\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title pull-left\">Error {{_err.code}}</h4>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"errModal.hide()\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        {{_err.msg}}\n        <div class=\"row clearfix\" >\n            <button type=\"button\" style=\"float:right\" (click)=\"errModal.hide();\" class=\"btn btn-info m-t-15 waves-effect\">OK</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n   "
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], ErrorComponent);
exports.ErrorComponent = ErrorComponent;
//# sourceMappingURL=error.component.js.map