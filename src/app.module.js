"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var menu_component_1 = require("./menu.component");
var app_service_1 = require("./app.service");
var teams_component_1 = require("./teams.component");
var home_component_1 = require("./home.component");
var not_found_component_1 = require("./not-found.component");
var login_component_1 = require("./login.component");
var admin_component_1 = require("./admin.component");
var user_component_1 = require("./user.component");
var fixture_component_1 = require("./fixture.component");
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
var ng2_bootstrap_2 = require("ng2-bootstrap/ng2-bootstrap");
var order_by_pipe_1 = require("./order-by.pipe");
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'fixture', component: fixture_component_1.FixtureComponent },
    { path: 'teams', component: teams_component_1.TeamsComponent },
    { path: 'admin', component: admin_component_1.AdminComponent },
    { path: '**', component: not_found_component_1.NotFoundComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            forms_1.ReactiveFormsModule,
            common_1.CommonModule,
            ng2_bootstrap_1.ModalModule.forRoot(),
            router_1.RouterModule.forRoot(routes),
            ng2_bootstrap_2.TimepickerModule.forRoot()
        ],
        declarations: [
            home_component_1.HomeComponent,
            app_component_1.AppComponent,
            menu_component_1.MenuComponent,
            teams_component_1.TeamsComponent,
            not_found_component_1.NotFoundComponent,
            login_component_1.LoginComponent,
            admin_component_1.AdminComponent,
            user_component_1.UserComponent,
            fixture_component_1.FixtureComponent,
            order_by_pipe_1.OrderBy
        ],
        providers: [
            app_service_1.AppService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map