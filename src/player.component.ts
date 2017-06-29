import { Component, OnInit} from '@angular/core';

import { AppService }        from './app.service';

@Component({
  selector: 'player',
   template: `
	
   `  
})

export class PlayerComponent implements OnInit {
    constructor( private services: AppService) {}

    ngOnInit(){
  }

}