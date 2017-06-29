"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NotFoundComponent = (function () {
    function NotFoundComponent() {
    }
    return NotFoundComponent;
}());
NotFoundComponent = __decorate([
    core_1.Component({
        selector: 'not-found',
        template: "\n   <body class=\"four-zero-four\">\n    <div class=\"four-zero-four-container\">\n        <div class=\"error-code\">404</div>\n        <div class=\"error-message\">This page doesn't exist</div>\n        <div class=\"button-place\">\n            <a href=\"/\" class=\"btn btn-default btn-lg waves-effect\">GO TO HOMEPAGE</a>\n        </div>\n    </div>\n</body>\n   "
    })
], NotFoundComponent);
exports.NotFoundComponent = NotFoundComponent;
//# sourceMappingURL=not-found.component.js.map