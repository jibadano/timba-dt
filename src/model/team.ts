export class Team{
	_id: number;
	price: number;
	stats: {ATK:number,TEC:number,DEF:number} = {ATK:0,TEC:0,DEF:0};
	name: string;
	image: string;
}