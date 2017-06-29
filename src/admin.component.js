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
var player_1 = require("./model/player");
var team_1 = require("./model/team");
var log_1 = require("./model/log");
var user_1 = require("./model/user");
var error_1 = require("./model/error");
var AdminComponent = (function () {
    function AdminComponent(services) {
        this.services = services;
        this.config = { startDate: new Date(), matchDelay: 30, roundDelay: 30, roundsPerMatch: 9, matchsPerDay: 99 };
        this.err = new error_1.Error();
        this.player = new player_1.Player();
        this.team = new team_1.Team();
        this.log = new log_1.Log();
        this.user = new user_1.User();
        this.teams = [];
        this.players = [];
        this.logs = [];
        this.users = [];
        this.nav = 'players';
        this.add = false;
        this.edit = false;
    }
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getPlayers();
        this.services.loadScript('admin.js');
        this.services.getUser().then(function (co) {
            if (!(_this.services.isLogged() && _this.services.user.admin))
                _this.services.router.navigate(['/404']);
        });
    };
    //Navigation
    AdminComponent.prototype.navigate = function (nav) {
        this.add = false;
        this.edit = false;
        this.nav = nav;
        if (nav === 'players')
            this.getPlayers();
        if (nav === 'log')
            this.getLog();
        if (nav === 'teams')
            this.getTeams();
        if (nav === 'users')
            this.getUsers();
        if (nav === 'league')
            this.getLeague();
    };
    //LEAGUE
    AdminComponent.prototype.getLeague = function () {
        this.services.getLeague();
    };
    AdminComponent.prototype.startLeague = function () {
        var _this = this;
        this.services.exec('startLeague', { config: this.config }).then(function (co) {
            if (!co.err)
                _this.services.setLeague(co.data);
            _this.services.config = _this.config;
        });
    };
    //Users
    AdminComponent.prototype.getUsers = function () {
        var _this = this;
        this.services.exec('getUsers', {}).then(function (co) { _this.users = co.data; });
    };
    AdminComponent.prototype.setNewUserForm = function () {
        this.add = true;
        this.edit = true;
        this.user = new user_1.User();
    };
    AdminComponent.prototype.removeUser = function (user) {
        var _this = this;
        this.services.exec('delUser', { user: user }).then(function (co) {
            if (co.err) {
                _this.err = co.err;
                _this.errorModal.show();
            }
            else {
                var index = _this.users.indexOf(user);
                _this.users.splice(index, 1);
            }
        });
    };
    AdminComponent.prototype.addUser = function () {
        var _this = this;
        this.services.exec('addUser', { user: this.user }).then(function (co) {
            if (co.err) {
                _this.err = co.err;
                _this.errorModal.show();
            }
            else {
                _this.users.push(_this.user);
                _this.edit = false;
                _this.add = false;
            }
        });
    };
    //Logs
    AdminComponent.prototype.getLog = function () {
        var _this = this;
        this.services.exec('getLog', {}).then(function (co) { _this.logs = co.data; });
    };
    //Players
    AdminComponent.prototype.setNewPlayerForm = function () {
        this.add = true;
        this.edit = true;
        this.player = new player_1.Player();
    };
    AdminComponent.prototype.resetPlayer = function () {
        if (this.players && this.players.length > 0)
            this.setPlayer(this.players[0]);
    };
    AdminComponent.prototype.setPlayer = function (p) {
        this.edit = false;
        this.add = false;
        this.player = Object.assign({}, p);
    };
    AdminComponent.prototype.removePlayer = function () {
        var _this = this;
        if (!this.add)
            this.services.exec('delPlayer', { player: this.player }).then(function (co) {
                if (co.err) {
                    _this.err = co.err;
                    _this.errorModal.show();
                }
                else {
                    _this.removeById(_this.players, co.data._id);
                    _this.resetPlayer();
                }
            });
        else
            this.resetPlayer();
    };
    AdminComponent.prototype.savePlayer = function () {
        var _this = this;
        if (this.add) {
            this.services.exec('addPlayer', { player: this.player }).then(function (co) {
                if (co.err) {
                    _this.err = co.err;
                    _this.errorModal.show();
                }
                else {
                    _this.player = co.data;
                    _this.players.push(co.data);
                    _this.edit = false;
                    _this.add = false;
                }
            });
        }
        else {
            this.services.exec('updPlayer', { player: this.player }).then(function (co) {
                if (co.err) {
                    _this.err = co.err;
                    _this.errorModal.show();
                }
                else {
                    _this.edit = false;
                    _this.player = co.data;
                }
            });
        }
    };
    AdminComponent.prototype.getPlayers = function () {
        var _this = this;
        this.services.exec('getPlayers', {}).then(function (co) {
            if (!co.err) {
                _this.players = co.data;
                _this.resetPlayer();
            }
            else {
                _this.err = co.err;
                _this.errorModal.show();
            }
        });
    };
    AdminComponent.prototype.getPrice = function () {
        var positionChance = this.team.stats.TEC / (this.team.stats.TEC + 50);
        var goalChance = positionChance * this.team.stats.ATK / (this.team.stats.ATK + 50);
        var goalReceiveChance = (1 - positionChance) * 50 / (this.team.stats.DEF + 50);
        if (this.edit)
            this.team.price = Math.round((goalChance - goalReceiveChance) * 40) * 10;
        return this.team.price;
    };
    //TEAMS
    //Teams
    AdminComponent.prototype.setNewTeamForm = function () {
        this.add = true;
        this.edit = true;
        this.team = new team_1.Team();
    };
    AdminComponent.prototype.resetTeam = function () {
        if (this.teams && this.teams.length > 0)
            this.setTeam(this.teams[0]);
    };
    AdminComponent.prototype.setTeam = function (t) {
        this.edit = false;
        this.add = false;
        this.team = Object.assign({}, t);
    };
    AdminComponent.prototype.removeTeam = function () {
        var _this = this;
        if (!this.add)
            this.services.exec('delTeam', { team: this.team }).then(function (co) {
                if (co.err) {
                    _this.err = co.err;
                    _this.errorModal.show();
                }
                else {
                    _this.removeById(_this.teams, co.data._id);
                    _this.resetTeam();
                }
            });
        else
            this.resetTeam();
    };
    AdminComponent.prototype.saveTeam = function () {
        var _this = this;
        if (this.add) {
            this.services.exec('addTeam', { team: this.team }).then(function (co) {
                if (co.err) {
                    _this.err = co.err;
                    _this.errorModal.show();
                }
                else {
                    _this.team = co.data;
                    _this.teams.push(_this.team);
                    _this.edit = false;
                    _this.add = false;
                }
            });
        }
        else {
            this.services.exec('updTeam', { team: this.team }).then(function (co) {
                if (co.err) {
                    _this.err = co.err;
                    _this.errorModal.show();
                }
                else {
                    _this.edit = false;
                    _this.team = co.data;
                }
            });
        }
    };
    AdminComponent.prototype.getTeams = function () {
        var _this = this;
        this.services.exec('getTeams', {}).then(function (co) {
            if (!co.err) {
                _this.teams = co.data;
                _this.resetTeam();
            }
            else {
                _this.err = co.err;
                _this.errorModal.show();
            }
        });
    };
    AdminComponent.prototype.uploadImage = function () {
        $('input[type=file]').click();
    };
    AdminComponent.prototype.previewFile = function () {
        var file = $('input[type=file]')[0].files[0]; //sames as here
        var reader = new FileReader();
        var i = this.player;
        if (this.nav == 'teams')
            i = this.team;
        reader.onloadend = function () {
            i.image = reader.result;
        };
        if (file)
            reader.readAsDataURL(file);
        else
            i.image = "";
    };
    AdminComponent.prototype.removeById = function (list, _id) {
        var obj = list.find(function (val, index) {
            return val._id == _id;
        });
        var index = list.indexOf(obj);
        if (index >= 0)
            list.splice(index, 1);
    };
    return AdminComponent;
}());
__decorate([
    core_1.ViewChild('errorModal'),
    __metadata("design:type", ng2_bootstrap_1.ModalDirective)
], AdminComponent.prototype, "errorModal", void 0);
AdminComponent = __decorate([
    core_1.Component({
        selector: 'admin',
        templateUrl: 'src/admin.component.html',
        styleUrls: ['src/admin.component.css'],
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AdminComponent);
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map