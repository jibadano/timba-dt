import { Component, OnInit,ViewChild} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { AppService }        from './app.service';
import { CO } from './model/co';

@Component({
  selector: 'fixture',
   templateUrl: 'src/fixture.component.html',
    styleUrls: ['src/fixture.component.css'],
    
})

export class FixtureComponent implements OnInit {
    co: CO = new CO();
    match:any;
    liveMatch:boolean = false;
  constructor(private services: AppService) { };
    @ViewChild('errorModal') public errorModal:ModalDirective;
     @ViewChild('matchModal') public matchModal:ModalDirective;


    ngOnInit(){
    }
    
    showLiveMatch(i:number){
        if(this.liveMatch)
            setTimeout(()=>{
                this.services.getLeague();
                this.match = this.services.league.fixture[i];
                this.showLiveMatch(i);
            },this.services.config.roundDelay*1000);
    }


    getTeamImage(teamname:string){
      let team = this.services.teams.find(team=>{
        return team.name == teamname;
      });

      if(team)
        return team.image;
      
      return undefined;
    }

    getMatchScoreByRound(match:any, r:number){
        let localScore=0;
        let visitorScore=0;
        for(let i=0;i<=r;i++){
            if(match.rounds[i].goal == match.local.user.username)
                localScore++;

            if(match.rounds[i].goal == match.visitor.user.username)
                visitorScore++;
        }

        return localScore + ' - ' + visitorScore;
    }
}