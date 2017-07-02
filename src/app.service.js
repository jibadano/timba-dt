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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var league_1 = require("./model/league");
require("./rxjs-extensions");
var AppService = (function () {
    function AppService(http, router) {
        this.http = http;
        this.router = router;
        this.league = new league_1.League();
        this.teams = [];
    }
    ;
    AppService.prototype.ngOnInit = function () {
        this.loadScript("admin.js");
    };
    //CORE
    AppService.prototype.exec = function (serviceId, data) {
        return this.http.post('/services', JSON.stringify({ serviceId: serviceId, data: data }))
            .toPromise()
            .then(function (co) { return co.json(); });
    };
    //USER LOGIN LOGOUT FORGOT SIGNIN
    AppService.prototype.login = function (user) {
        var _this = this;
        return this.http.post('/login', '', this.authHeader(user))
            .toPromise()
            .then(function (co) {
            _this.user = co.json().user;
            if (_this.isLogged())
                _this.router.navigate(['']);
            return co.json();
        });
    };
    ;
    AppService.prototype.logout = function () {
        var _this = this;
        this.http.post('/logout', '').toPromise().then(function (res) {
            _this.user = null;
            _this.team = null;
            _this.status = null;
            _this.router.navigate(['/login']);
        });
    };
    AppService.prototype.forgotPassword = function (user) {
        return this.http.post('/forgotPassword', '', this.authHeader(user))
            .toPromise()
            .then(function (co) { return co.json(); });
    };
    ;
    AppService.prototype.signIn = function (user) {
        var _this = this;
        return this.http.post('/signIn', '', this.authHeader(user))
            .toPromise()
            .then(function (co) { _this.user = co.json().user; return co.json(); });
    };
    ;
    AppService.prototype.authHeader = function (user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(user.email + ':' + user.password) });
        return new http_1.RequestOptions({ headers: headers });
    };
    //CONFIG INIT
    AppService.prototype.getUser = function () {
        var _this = this;
        return this.http.post('/user', '')
            .toPromise()
            .then(function (co) { _this.user = co.json().user; co.json(); });
    };
    AppService.prototype.getLeague = function () {
        var _this = this;
        return this.http.post('/getLeague', '')
            .toPromise()
            .then(function (co) { _this.setLeague(co.json().league); co.json(); });
    };
    AppService.prototype.getConfig = function () {
        var _this = this;
        return this.http.post('/getConfig', '')
            .toPromise()
            .then(function (co) { _this.config = co.json().config; co.json(); });
    };
    AppService.prototype.getTeams = function () {
        var _this = this;
        return this.http.post('/getTeams', '')
            .toPromise()
            .then(function (co) { _this.teams = co.json().teams; return co.json(); });
    };
    AppService.prototype.getMatch = function (matchIdx) {
        var _this = this;
        return this.http.post('/getMatch', JSON.stringify({ matchIdx: matchIdx }))
            .toPromise()
            .then(function (co) {
            if (co.json().data.match)
                _this.league.fixture[matchIdx] = co.json().data.match;
            return co.json();
        });
    };
    AppService.prototype.setLeague = function (league) {
        var _this = this;
        this.league = league;
        if (this.user)
            this.status = this.league.table.find(function (entry) {
                return entry.username == _this.user.email;
            });
        if (this.status)
            this.team = this.teams.find(function (team) {
                return team.name == _this.status.teamname;
            });
    };
    //AUX
    AppService.prototype.isLogged = function () {
        return this.user && this.user.email && this.user.email != '';
    };
    AppService.prototype.isAdmin = function () {
        return this.isLogged() && this.user.admin;
    };
    AppService.prototype.getBetAmount = function () {
        var betAmount = 0;
        for (var i = 0; i < this.league.table.length; i++)
            betAmount += this.league.table[i].teamprice;
        return betAmount;
    };
    AppService.prototype.loadScript = function (script) {
        var node = document.createElement('script');
        node.src = 'js/' + script;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('body')[0].appendChild(node);
    };
    AppService.prototype.loadCustomScript = function (script) {
        var node = document.createElement('script');
        node.src = script;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('body')[0].appendChild(node);
    };
    return AppService;
}());
AppService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map