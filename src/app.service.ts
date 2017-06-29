import { Component, Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router }    from '@angular/router';

import { User } from './model/user';
import { Team } from './model/team';
import { League } from './model/league';
import { Match } from './model/match';

import { CO } from './model/co';

import './rxjs-extensions';

@Injectable()
export class AppService implements OnInit {
  user: User;
  status: any;
  team: Team;
  league: League = new League();
  teams: Team[] = [];
  nextMatch:Match;
  config:any;
  constructor(private http: Http, public router:Router) {};

  ngOnInit() {
    this.loadScript("admin.js");

  }
  
  //CORE

  exec(serviceId: string, data: any): Promise<CO> {
    return this.http.post('/services', JSON.stringify({ serviceId: serviceId, data: data }))
      .toPromise()
      .then(co => co.json() as CO)
  }

  //USER LOGIN LOGOUT FORGOT SIGNIN

  login(user: User): Promise<CO> {
    return this.http.post('/login', '', this.authHeader(user))
      .toPromise()
      .then(co => {this.user = co.json().user; 
        if(this.isLogged())
          this.router.navigate(['']);
        return co.json() as CO});
  };

  logout() {
    this.http.post('/logout', '').toPromise().then(res => {
      this.user = null;
      this.team = null;
      this.status = null;
      this.router.navigate(['/login']);
    });
  }

  forgotPassword(user: User): Promise<CO> {
    return this.http.post('/forgotPassword', '', this.authHeader(user))
      .toPromise()
      .then(co => co.json() as CO);
  };

  signIn(user: User): Promise<CO> {
    return this.http.post('/signIn', '', this.authHeader(user))
      .toPromise()
      .then(co => {this.user = co.json().user; return co.json() as CO});
  };

  authHeader(user:User){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(user.email + ':' + user.password) });
    return new RequestOptions({ headers: headers });
  }


  //CONFIG INIT

  getUser(){
    return this.http.post('/user', '')
      .toPromise()
      .then(co => {this.user = co.json().user; co.json() as CO});
  }

  getLeague(){
    return this.http.post('/getLeague', '')
      .toPromise()
      .then(co => {this.setLeague(co.json().league);co.json() as CO});
  }

  getConfig(){
    return this.http.post('/getConfig', '')
      .toPromise()
      .then(co => {this.config = co.json().config;co.json() as CO});
  }

  getTeams(){
    return this.http.post('/getTeams', '')
      .toPromise()
      .then(co => {this.teams = co.json().teams;return co.json() as CO});
  }

  setLeague(league:League){
    this.league = league;
    if(this.user)
      this.status = this.league.table.find(entry => {
        return entry.username == this.user.email;
      });
    if(this.status)
      this.team = this.teams.find(team => {
        return team.name == this.status.teamname;
      });
  }

  //AUX

  isLogged(): Boolean {
    return this.user && this.user.email && this.user.email != '';
  }

  isAdmin(): Boolean{
    return this.isLogged() && this.user.admin;
  }

  getBetAmount(){
		let betAmount = 0;
		for(let i = 0; i<this.league.table.length;i++)
			betAmount += this.league.table[i].teamprice;

		return betAmount;
	}

  loadScript(script: string) {
    let node = document.createElement('script');
    node.src = 'js/' + script;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  loadCustomScript(script: string) {
    let node = document.createElement('script');
    node.src = script;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

}