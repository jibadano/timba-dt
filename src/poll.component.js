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
var poll_1 = require("./model/poll");
var PollComponent = (function () {
    function PollComponent(services) {
        this.services = services;
        this.poll = new poll_1.Poll();
        this.edit = true;
        this.editOpt = [];
        this.mouseOverOpt = [];
        this.newOption = '';
        this.userVoted = false;
        this.poll.owner = this.services.user;
    }
    Object.defineProperty(PollComponent.prototype, "setPoll", {
        set: function (poll) {
            this.edit = false;
            this.poll = poll || new poll_1.Poll();
        },
        enumerable: true,
        configurable: true
    });
    PollComponent.prototype.ngOnInit = function () {
        this.services.loadScript("admin.js");
        this.userVoted = this.userHasVoted();
    };
    PollComponent.prototype.savePoll = function () {
        delete this.poll._id;
        this.services.exec('addPoll', this.poll).then(function (result) { });
    };
    PollComponent.prototype.userHasVoted = function () {
        var _this = this;
        return this.poll.options.some(function (option) {
            return option.users.some(function (user) {
                return user.email == _this.services.user.email;
            });
        });
    };
    PollComponent.prototype.vote = function (option) {
        if (!this.userVoted) {
            option.users.push(this.services.user);
            this.userVoted = true;
            var totalVotes = this.getTotalVotes();
            for (var i = 0; i < this.poll.options.length; i++) {
                var result = this.getOptionResult(this.poll.options[i], totalVotes);
                $("#poll" + this.poll._id + " #progressbar" + i)
                    .attr("style", "width:" + result)
                    .html(result);
            }
        }
    };
    PollComponent.prototype.getTotalVotes = function () {
        var totalVotes = 0;
        for (var i = 0; i < this.poll.options.length; i++)
            totalVotes += this.poll.options[i].users.length;
        return totalVotes;
    };
    PollComponent.prototype.removeOpt = function (i) {
        this.poll.options.splice(i, 1);
    };
    PollComponent.prototype.getOptionResult = function (option, totalVotes) {
        if (totalVotes == 0 || !option)
            return "0%";
        return (100 * option.users.length / totalVotes) + "%";
    };
    PollComponent.prototype.addOption = function (opt, event) {
        if (opt && opt != '' && (!event || event.keyCode == 13)) {
            this.poll.options.push({ desc: opt, users: [] });
            this.newOption = '';
        }
    };
    PollComponent.prototype.uploadImage = function () {
        $('input[type=file]').click();
    };
    PollComponent.prototype.previewFile = function () {
        var file = $('input[type=file]')[0].files[0]; //sames as here
        var reader = new FileReader();
        var poll = this.poll;
        reader.onloadend = function () {
            poll.image = reader.result;
        };
        if (file)
            reader.readAsDataURL(file);
        else
            this.poll.image = "";
    };
    return PollComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", poll_1.Poll),
    __metadata("design:paramtypes", [poll_1.Poll])
], PollComponent.prototype, "setPoll", null);
PollComponent = __decorate([
    core_1.Component({
        selector: 'poll',
        templateUrl: 'src/poll.component.html',
        styleUrls: ['src/poll.component.css'],
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], PollComponent);
exports.PollComponent = PollComponent;
//# sourceMappingURL=poll.component.js.map