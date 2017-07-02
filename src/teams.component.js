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
var team_1 = require("./model/team");
var error_1 = require("./model/error");
var TeamsComponent = (function () {
    function TeamsComponent(services) {
        this.services = services;
        this.err = new error_1.Error();
        this.team = new team_1.Team();
        this.showCard = false;
    }
    TeamsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getTeams();
        setTimeout(function () {
            _this.showCard = true;
        }, 100);
    };
    TeamsComponent.prototype.selectTeam = function () {
        var _this = this;
        this.services.exec('selectTeam', { team: this.team }).then(function (co) {
            if (!co.err) {
                _this.services.setLeague(co.data);
            }
            else {
                _this.err = co.err;
                _this.errorModal.show();
            }
        });
    };
    TeamsComponent.prototype.unselectTeam = function () {
        var _this = this;
        this.services.exec('selectTeam', { team: undefined }).then(function (co) {
            if (!co.err) {
                _this.services.team = null;
                _this.services.setLeague(co.data);
            }
            else {
                _this.err = co.err;
                _this.errorModal.show();
            }
        });
    };
    TeamsComponent.prototype.setTeam = function (team) {
        this.team = team;
    };
    TeamsComponent.prototype.getTeams = function () {
        var _this = this;
        this.services.getTeams().then(function (co) {
            if (!co.err) {
                if (_this.services.teams && _this.services.teams.length > 0)
                    _this.setTeam(_this.services.teams[0]);
            }
            else {
                _this.err = co.err;
                _this.errorModal.show();
            }
        });
    };
    return TeamsComponent;
}());
__decorate([
    core_1.ViewChild('errorModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], TeamsComponent.prototype, "errorModal", void 0);
TeamsComponent = __decorate([
    core_1.Component({
        selector: 'teams',
        templateUrl: 'src/teams.component.html',
        styleUrls: ['src/teams.component.css'],
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], TeamsComponent);
exports.TeamsComponent = TeamsComponent;
//# sourceMappingURL=teams.component.js.map