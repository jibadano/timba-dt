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
    showCard= false;
  constructor(private services: AppService) { };
    @ViewChild('errorModal') public errorModal:ModalDirective;
     @ViewChild('matchModal') public matchModal:ModalDirective;


    ngOnInit(){
        this.services.getLeague();
        setTimeout(()=>{
        this.showCard=true;
      },100)
    }
    
    refresh(){
        this.showCard=false;
        setTimeout(()=>{
        this.showCard=true;
      },200)
        this.services.getLeague();
    }

    live(i:number){
        if(this.liveMatch)
            setTimeout(()=>{
                this.getMatch(i);
                this.live(i);
            },this.services.config.roundDelay*1000);
    }

    showLiveMatch(matchIdx:number){
        this.services.getMatch(matchIdx).then(co => {
            if(co.err){
                this.co = co;this.errorModal.show();
            }
            else{
                this.match = co.data.match;
                if(this.match.live){
                    this.live(matchIdx);
                }
            }
            
        })
    }

    getMatch(matchIdx:number){
        this.services.getMatch(matchIdx).then(co => {
            if(co.err){
                this.co = co;this.errorModal.show();
            }
            else
                this.match = co.data.match;
            
        })
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