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
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
var app_service_1 = require("./app.service");
var user_1 = require("./model/user");
var error_1 = require("./model/error");
var co_1 = require("./model/co");
var LoginComponent = (function () {
    function LoginComponent(services) {
        this.services = services;
        this.co = new co_1.CO();
        this.err = new error_1.Error();
        this.nav = 'login';
        this.user = new user_1.User();
        this.confirmPassword = '';
    }
    ;
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.services.getUser().then(function (co) {
            if (_this.services.isLogged())
                _this.services.router.navigate(['']);
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (this.user.password && this.user.password != '' && this.user.email && this.user.email != '')
            this.services.login(this.user).then(function (co) {
                _this.co = co;
                if (co.err)
                    _this.errorModal.show();
            });
        else {
            this.co.err = { code: 'CHANNEL_VALIDATION', msg: "Must complete user and password" };
            this.errorModal.show();
        }
    };
    LoginComponent.prototype.forgotPassword = function () {
        var _this = this;
        if (this.user.email != '')
            this.services.forgotPassword(this.user).then(function (co) { return _this.co; });
        else {
            this.co.err = { code: 'CHANNEL_VALIDATION', msg: "Must complete email" };
            this.errorModal.show();
        }
    };
    LoginComponent.prototype.signIn = function () {
        var _this = this;
        if (this.user.email && this.user.email != '' && this.user.password == this.confirmPassword) {
            this.services.signIn(this.user).then(function (co) {
                _this.co = co;
                if (co.err)
                    _this.errorModal.show();
            });
        }
        else {
            if (!this.user.email || this.user.email == '')
                this.co.err = { code: 'CHANNEL_VALIDATION', msg: "Must complete email" };
            if (this.user.password != this.confirmPassword)
                this.co.err = { code: 'CHANNEL_VALIDATION', msg: "Wrong password confirmation" };
            this.errorModal.show();
        }
    };
    return LoginComponent;
}());
__decorate([
    core_1.ViewChild('errorModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], LoginComponent.prototype, "errorModal", void 0);
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: 'src/login.component.html',
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map