import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { AppService }        from './app.service';
import { Player }        from './model/player';
import { Team }        from './model/team';
import { Log }        from './model/log';
import { User }        from './model/user';

import { Error }        from './model/error';


declare var $:any;

@Component({
  selector: 'admin',
   templateUrl: 'src/admin.component.html',
    styleUrls: ['src/admin.component.css'],
})

export class AdminComponent implements OnInit {
    @ViewChild('errorModal') public errorModal:ModalDirective;

    config:any = {startDate: new Date(), matchDelay:30, roundDelay:30, roundsPerMatch:9, matchsPerDay:99};

    err:Error = new Error();
    player:Player = new Player();
    team:Team = new Team();
    log:Log = new Log();
    user:User = new User();

    teams:Team[] = [];
    players:Player[] = [];
    logs: Log[] = [];
    users:User[] = [];

    nav:string = 'players';
    add:boolean = false;
    edit:boolean = false;
    constructor( private services: AppService) {}

    ngOnInit(){
      this.getPlayers();
      this.services.loadScript('admin.js');
      this.services.getUser().then(co => {
			if(!(this.services.isLogged() && this.services.user.admin))
        this.services.router.navigate(['/404']);
      });
    }

    //Navigation

    navigate(nav:string){
      this.add = false;
      this.edit = false;
      this.nav = nav;
      if(nav === 'players')
        this.getPlayers();
      if(nav === 'log')
        this.getLog();
      if(nav === 'teams')
       this.getTeams();
      if(nav === 'users')
       this.getUsers();
       if(nav === 'league')
       this.getLeague();
    }

    //LEAGUE

    getLeague(){
      this.services.getLeague();
    }

    startLeague(){
      this.services.exec('startLeague',{config:this.config}).then(co=>{
        if(!co.err)
          this.services.setLeague(co.data);

        this.services.config = this.config;
      })
    }

    //Users

    getUsers(){
        this.services.exec('getUsers',{}).then(co => {this.users = co.data});
    }

    setNewUserForm(){
      this.add=true;
      this.edit=true;
      this.user = new User();
    }

    removeUser(user:User){
        this.services.exec('delUser',{user: user}).then(co => {
          if(co.err){
            this.err = co.err; this.errorModal.show();
          }
          else{
            let index = this.users.indexOf(user);
            this.users.splice(index,1);
          }
        });
    }

     addUser(){
        this.services.exec('addUser',{user: this.user}).then(co => {
          if(co.err){
            this.err = co.err; this.errorModal.show();
          }
          else{
            this.users.push(this.user);
            this.edit=false;
            this.add=false;
          }
        });
    }

    //Logs

    getLog(){
        this.services.exec('getLog',{}).then(co => {this.logs = co.data});
    }

    //Players

    setNewPlayerForm(){
      this.add=true;
      this.edit=true;
      this.player = new Player();
    }

    resetPlayer(){
      if(this.players && this.players.length > 0)
          this.setPlayer(this.players[0]);
    }

    setPlayer(p:Player){
      this.edit=false;
      this.add=false;
      this.player=Object.assign({}, p);
    }

    removePlayer(){
      if(!this.add)
        this.services.exec('delPlayer',{player: this.player}).then(co => {
          if(co.err){
            this.err = co.err; this.errorModal.show();
          }
          else{
            this.removeById(this.players,co.data._id);
            this.resetPlayer();
          }
        });
      else
        this.resetPlayer();
    }

    savePlayer(){
      if(this.add){
        this.services.exec('addPlayer',{player: this.player}).then(co => {
          if(co.err){
            this.err = co.err; this.errorModal.show();
          }
          else{
            this.player = co.data;
            this.players.push(co.data);
            this.edit=false;
            this.add=false;
          }
        });
      }
      else{
        this.services.exec('updPlayer',{player: this.player}).then(co => {
          if(co.err){
            this.err = co.err; this.errorModal.show();            
          }
          else{
            this.edit = false;
            this.player = co.data;
          }
        });
      }
    }

    getPlayers(){
        this.services.exec('getPlayers',{}).then(co => {
          if(!co.err){
            this.players= co.data;
            this.resetPlayer();
          }
          else{
            this.err = co.err;
            this.errorModal.show();
          }
      });
    }

    getPrice(){
      let positionChance = this.team.stats.TEC/(this.team.stats.TEC + 50);
      let goalChance = positionChance * this.team.stats.ATK/(this.team.stats.ATK + 50);
      let goalReceiveChance = (1 - positionChance) * 50/(this.team.stats.DEF + 50);
      if(this.edit)
        this.team.price = Math.round((goalChance - goalReceiveChance) * 40)*10;

      return this.team.price;
    }

    //TEAMS

    //Teams

    setNewTeamForm(){
      this.add=true;
      this.edit=true;
      this.team = new Team();
    }

    resetTeam(){
      if(this.teams && this.teams.length > 0)
          this.setTeam(this.teams[0]);
    }

    setTeam(t:Team){
      this.edit=false;
      this.add=false;
      this.team=Object.assign({}, t);
    }

    removeTeam(){
      if(!this.add)
        this.services.exec('delTeam',{team: this.team}).then(co => {
          if(co.err){
            this.err = co.err; this.errorModal.show();
          }
          else{
            this.removeById(this.teams,co.data._id);

            this.resetTeam();
          }
        });
      else
        this.resetTeam();
    }

    saveTeam(){
      if(this.add){
        this.services.exec('addTeam',{team: this.team}).then(co => {
          if(co.err){
            this.err = co.err; this.errorModal.show();
          }
          else{
            this.team = co.data;
            this.teams.push(this.team);
            this.edit=false;
            this.add=false;
          }
        });
      }
      else{
        this.services.exec('updTeam',{team: this.team}).then(co => {
          if(co.err){
            this.err = co.err; this.errorModal.show();            
          }
          else{
            this.edit = false;
            this.team = co.data;
          }
        });
      }
    }

    getTeams(){
        this.services.exec('getTeams',{}).then(co => {
          if(!co.err){
            this.teams= co.data;
            this.resetTeam();
          }
          else{
            this.err = co.err;
            this.errorModal.show();
          }
      });
    }

  uploadImage(){
    $('input[type=file]').click();
  }

    previewFile(){
       var file = $('input[type=file]')[0].files[0]; //sames as here
       var reader  = new FileReader();
       var i = this.player;
       if(this.nav=='teams')
        i = this.team;

       reader.onloadend = function () {
           i.image = reader.result;
       }

       if (file) 
          reader.readAsDataURL(file);
        else 
           i.image = "";
       
    }

    removeById(list:any[], _id:number){
      let obj =  list.find((val,index) => {
        return val._id == _id;
      })

      let index = list.indexOf(obj);
      if(index >= 0)
        list.splice(index,1);
    }
}