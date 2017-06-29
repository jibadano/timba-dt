"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Category = (function () {
    function Category() {
    }
    Category.prototype.getType = function () {
        return 'Category';
    };
    Category.prototype.getDesc = function () {
        return this.name;
    };
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=category.js.map