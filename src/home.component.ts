import { Component, OnInit} from '@angular/core';

import { AppService }        from './app.service';
import { Error }        from './model/error';

import { OrderBy } from './order-by.pipe';

@Component({
  selector: 'home',
   templateUrl:'src/home.component.html',
   styles:[`td{vertical-align:middle!important} 
    .card{
        opacity:0;
        transition:opacity 0.4s;
      }

      .card-show{
        opacity:1;
      }
   `]
})

export class HomeComponent implements OnInit {
    err:Error = new Error();
    showCard:boolean =false;
    constructor( private services: AppService) {}

    ngOnInit(){
      setTimeout(()=>{
        this.showCard=true;
      },100)
      this.services.getLeague();
    }

    getTeamImage(teamname:string){
      let team = this.services.teams.find(team=>{
        return team.name == teamname;
      });

      if(team)
        return team.image;
      
      return undefined;
    }

}