import { Component, OnInit, Input,ViewChild} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { AppService }        from './app.service';
import { Team }        from './model/team';
import { Error }        from './model/error';

@Component({
  selector: 'teams',
   templateUrl: 'src/teams.component.html',
    styleUrls: ['src/teams.component.css'],
    
})

export class TeamsComponent implements OnInit {
    @ViewChild('errorModal') public errorModal:ModalDirective;
    err:Error = new Error();
    team:Team = new Team();
    constructor( private services: AppService) {
    }

    ngOnInit(){
        this.getTeams();
    }

    selectTeam(){
         this.services.exec('selectTeam',{team:this.team}).then(co => {
         if(!co.err){
            this.services.setLeague(co.data);
          }
          else{
            this.err = co.err;
            this.errorModal.show();
          }
      });
    }

    unselectTeam(){
         this.services.exec('selectTeam',{team:undefined}).then(co => {
           if(!co.err){
            this.services.team = null;
            this.services.setLeague(co.data);
          }
          else{
            this.err = co.err;
            this.errorModal.show();
          }
      });
    }

    setTeam(team:Team){
        this.team = team;
    }

    getTeams(){
        this.services.getTeams().then(co => {
          if(!co.err){
            if(this.services.teams && this.services.teams.length > 0)
                this.setTeam(this.services.teams[0]);
          }
          else{
            this.err = co.err;
            this.errorModal.show();
          }
      });
    }

}