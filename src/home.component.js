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
var app_service_1 = require("./app.service");
var error_1 = require("./model/error");
var HomeComponent = (function () {
    function HomeComponent(services) {
        this.services = services;
        this.err = new error_1.Error();
        this.showCard = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.showCard = true;
        }, 100);
        this.services.getLeague();
    };
    HomeComponent.prototype.getTeamImage = function (teamname) {
        var team = this.services.teams.find(function (team) {
            return team.name == teamname;
        });
        if (team)
            return team.image;
        return undefined;
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        templateUrl: 'src/home.component.html',
        styles: ["td{vertical-align:middle!important} \n    .card{\n        opacity:0;\n        transition:opacity 0.4s;\n      }\n\n      .card-show{\n        opacity:1;\n      }\n   "]
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map