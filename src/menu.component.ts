import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AppService}       from './app.service';

@Component({
  selector: 'menu',
   templateUrl: 'src/menu.component.html'    
})

export class MenuComponent implements OnInit {
    constructor( private services: AppService) {}

    startSearch(searchTerm:string){
    }

    ngOnInit(){
      //this.services.loadScript("admin.js");
    }

  
}