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
var error_1 = require("./model/error");
var UserComponent = (function () {
    function UserComponent(services) {
        this.services = services;
        this.err = new error_1.Error();
        this.iShow = [];
    }
    UserComponent.prototype.ngOnInit = function () {
        this.showNext(0);
    };
    UserComponent.prototype.showNext = function (i) {
        var _this = this;
        if (i < 4)
            setTimeout(function () {
                _this.iShow[i] = true;
                _this.showNext(++i);
            }, 200);
    };
    UserComponent.prototype.getNextMatch = function () {
        var _this = this;
        this.nextMatch = this.services.league.fixture.find(function (match) {
            if (match.rounds.length > 0)
                return false;
            return (match.local.user.username == _this.services.user.email || match.visitor.user.username == _this.services.user.email);
        });
        if (this.nextMatch) {
            if (this.nextMatch.local.user.username == this.services.user.email)
                this.nextUser = this.nextMatch.visitor.user.username;
            else
                this.nextUser = this.nextMatch.local.user.username;
        }
        return this.nextMatch;
    };
    UserComponent.prototype.getPosition = function () {
        var _this = this;
        var idx = this.services.league.table.findIndex(function (val) {
            return _this.services.user.email == val.username;
        });
        idx++;
        if (idx == 1)
            return '1ero';
        if (idx == 2)
            return '2do';
        if (idx == 3)
            return '3ero';
        return idx;
    };
    return UserComponent;
}());
__decorate([
    core_1.ViewChild('errorModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], UserComponent.prototype, "errorModal", void 0);
UserComponent = __decorate([
    core_1.Component({
        selector: 'user',
        templateUrl: 'src/user.component.html',
        styles: ["\n      .info-box-3{\n        opacity:0;\n        transition:opacity 0.6s;\n      }\n\n      .info-box-show{\n        opacity:1;\n      }\n\n   "]
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map