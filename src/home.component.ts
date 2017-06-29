import { Component, OnInit} from '@angular/core';

import { AppService }        from './app.service';
import { Error }        from './model/error';

import { OrderBy } from './order-by.pipe';

@Component({
  selector: 'home',
   templateUrl:'src/home.component.html',
})

export class HomeComponent implements OnInit {
    err:Error = new Error();

    constructor( private services: AppService) {}

    ngOnInit(){
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