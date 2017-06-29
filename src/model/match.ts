import {User} from './user';

export class Match{
	local:{user:any, score:number};
	visitor:{user:any, score:number};
	date: Date;
	rounds:any[] = [];
}