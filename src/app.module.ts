import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }   from '@angular/router';

import { AppComponent }  from './app.component';

import { MenuComponent }   from './menu.component';
import { AppService }   from './app.service';
import { TeamsComponent }   from './teams.component';
import { HomeComponent }   from './home.component';
import { NotFoundComponent }   from './not-found.component';
import { LoginComponent }   from './login.component';
import { AdminComponent }   from './admin.component';
import { UserComponent }   from './user.component';

import { FixtureComponent }   from './fixture.component';

import {JsonPipe} from '@angular/common';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TimepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { OrderBy } from './order-by.pipe';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'fixture', component: FixtureComponent},
  { path: 'teams',  component: TeamsComponent },
  { path: 'admin',  component: AdminComponent },
  { path: '**',  component: NotFoundComponent }
];


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    CommonModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(routes),
    TimepickerModule.forRoot()
  ],
  declarations: [
    HomeComponent,
    AppComponent,
    MenuComponent,
    TeamsComponent,
    NotFoundComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    FixtureComponent,
        OrderBy

  ],
   providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }