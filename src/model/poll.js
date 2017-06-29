"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Poll = (function () {
    function Poll() {
        this._id = -1;
        this.question = 'this is the question, this is the question, this is the question, this is the question';
        this.date = new Date();
        this.options = [{ desc: 'opt1', users: [] }, { desc: 'opt2', users: [] }, { desc: 'opt3', users: [] }];
    }
    Poll.prototype.getType = function () {
        return 'Poll';
    };
    Poll.prototype.getDesc = function () {
        return this.question;
    };
    return Poll;
}());
exports.Poll = Poll;
var Option = (function () {
    function Option() {
        this.desc = '';
        this.users = [];
    }
    return Option;
}());
exports.Option = Option;
//# sourceMappingURL=poll.js.map