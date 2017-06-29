"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NotFound404Component = (function () {
    function NotFound404Component() {
    }
    return NotFound404Component;
}());
NotFound404Component = __decorate([
    core_1.Component({
        selector: '404',
        template: "\n   <body class=\"four-zero-four\">\n    <div class=\"four-zero-four-container\">\n        <div class=\"error-code\">404</div>\n        <div class=\"error-message\">This page doesn't exist</div>\n        <div class=\"button-place\">\n            <a href=\"../../index.html\" class=\"btn btn-default btn-lg waves-effect\">GO TO HOMEPAGE</a>\n        </div>\n    </div>\n\n    <!-- Jquery Core Js -->\n    <script src=\"../../plugins/jquery/jquery.min.js\"></script>\n\n    <!-- Bootstrap Core Js -->\n    <script src=\"../../plugins/bootstrap/js/bootstrap.js\"></script>\n\n    <!-- Waves Effect Plugin Js -->\n    <script src=\"../../plugins/node-waves/waves.js\"></script>\n\n\n</body>\n   "
    })
], NotFound404Component);
exports.NotFound404Component = NotFound404Component;
//# sourceMappingURL=404.component.js.map