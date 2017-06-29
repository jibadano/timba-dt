import { Component,OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
	selector: 'app',
	template: `
	<menu (return)="services.nav = $event" (logOut)="services.logout();"></menu>
	<section class="content">
		<div class="container-fluid">
			<user></user>
			<router-outlet></router-outlet>				
		</div>
	</section>
`
})

export class AppComponent implements OnInit{
	constructor(private services: AppService) { };
	ngOnInit(){
		this.services.getUser().then(co =>{
			this.services.getTeams().then(co =>{
				this.services.getLeague();
				this.services.getConfig();
			});
		})
	}
}