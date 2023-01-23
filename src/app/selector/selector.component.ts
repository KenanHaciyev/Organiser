import { Component } from "@angular/core";
import { DateService } from "../shared/date.service";

@Component({
	selector: "app-selector",
	templateUrl: "./selector.component.html",
	styleUrls: ["./selector.component.scss"]
})
export class SelectorComponent {
	constructor(public dateServ: DateService) {}

	go(dir: number) {
		this.dateServ.changeMonth(dir);
	}
}
