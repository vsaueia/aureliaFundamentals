export class Sponsors {
	constructor(){
		this.message = "Sponsors";
		setTimeout(() => this.message = "Changed after binding", 3000);
	}
}
