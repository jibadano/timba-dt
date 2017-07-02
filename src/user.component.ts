import { Component, OnInit,ViewChild} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { AppService }        from './app.service';
import { Error }        from './model/error';

@Component({
  selector: 'user',
   templateUrl: 'src/user.component.html',
   styles:[`
      .info-box-3{
        opacity:0;
        transition:opacity 0.6s;
      }

      .info-box-show{
        opacity:1;
      }

   `]
})

export class UserComponent implements OnInit {
    @ViewChild('errorModal') public errorModal:ModalDirective;
    err:Error = new Error();
    nextMatch:any;
    nextUser:string;
    iShow:boolean[] = [];
    constructor( private services: AppService) {
    }

    ngOnInit(){
      this.showNext(0);
    }

    showNext(i:number){
      if(i < 4)
      setTimeout(()=>{
        this.iShow[i] = true;
        this.showNext(++i);
      },200);
    }

    getNextMatch(){
      this.nextMatch = this.services.league.fixture.find((match)=>{
        if(match.rounds.length > 0)
          return false;
        
        return (match.local.user.username == this.services.user.email || match.visitor.user.username == this.services.user.email)
      })
      if(this.nextMatch){
        if(this.nextMatch.local.user.username == this.services.user.email)
          this.nextUser =  this.nextMatch.visitor.user.username;
        else
          this.nextUser =  this.nextMatch.local.user.username;
      }

      return this.nextMatch;
    }

    getPosition(){
      let idx = this.services.league.table.findIndex(val => {
        return this.services.user.email == val.username;
      });
        idx++;
      if(idx == 1)
        return '1ero';

      if(idx == 2)
        return '2do';

      if(idx == 3)
        return '3ero';

      return idx;
    }

}