import {Player} from './player';
import {Team} from './team';

export class User {
	_id: number;
	email: string;// = "jibadano@gmail.com";
	password: string;
	admin: boolean;
	player: Player;
	team: Team;
	status:{points:number,played:number,won:number,lost:number,draw:number,gf:number,gc:number} = 
	{points:0,played:0,won:0,lost:0,draw:0,gf:0,gc:0};
}
