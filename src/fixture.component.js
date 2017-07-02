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
var co_1 = require("./model/co");
var FixtureComponent = (function () {
    function FixtureComponent(services) {
        this.services = services;
        this.co = new co_1.CO();
        this.liveMatch = false;
        this.showCard = false;
    }
    ;
    FixtureComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.services.getLeague();
        setTimeout(function () {
            _this.showCard = true;
        }, 100);
    };
    FixtureComponent.prototype.refresh = function () {
        var _this = this;
        this.showCard = false;
        setTimeout(function () {
            _this.showCard = true;
        }, 200);
        this.services.getLeague();
    };
    FixtureComponent.prototype.live = function (i) {
        var _this = this;
        if (this.liveMatch)
            setTimeout(function () {
                _this.getMatch(i);
                _this.live(i);
            }, this.services.config.roundDelay * 1000);
    };
    FixtureComponent.prototype.showLiveMatch = function (matchIdx) {
        var _this = this;
        this.services.getMatch(matchIdx).then(function (co) {
            if (co.err) {
                _this.co = co;
                _this.errorModal.show();
            }
            else {
                _this.match = co.data.match;
                if (_this.match.live) {
                    _this.live(matchIdx);
                }
            }
        });
    };
    FixtureComponent.prototype.getMatch = function (matchIdx) {
        var _this = this;
        this.services.getMatch(matchIdx).then(function (co) {
            if (co.err) {
                _this.co = co;
                _this.errorModal.show();
            }
            else
                _this.match = co.data.match;
        });
    };
    FixtureComponent.prototype.getTeamImage = function (teamname) {
        var team = this.services.teams.find(function (team) {
            return team.name == teamname;
        });
        if (team)
            return team.image;
        return undefined;
    };
    FixtureComponent.prototype.getMatchScoreByRound = function (match, r) {
        var localScore = 0;
        var visitorScore = 0;
        for (var i = 0; i <= r; i++) {
            if (match.rounds[i].goal == match.local.user.username)
                localScore++;
            if (match.rounds[i].goal == match.visitor.user.username)
                visitorScore++;
        }
        return localScore + ' - ' + visitorScore;
    };
    return FixtureComponent;
}());
__decorate([
    core_1.ViewChild('errorModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], FixtureComponent.prototype, "errorModal", void 0);
__decorate([
    core_1.ViewChild('matchModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], FixtureComponent.prototype, "matchModal", void 0);
FixtureComponent = __decorate([
    core_1.Component({
        selector: 'fixture',
        templateUrl: 'src/fixture.component.html',
        styleUrls: ['src/fixture.component.css'],
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], FixtureComponent);
exports.FixtureComponent = FixtureComponent;
//# sourceMappingURL=fixture.component.js.map