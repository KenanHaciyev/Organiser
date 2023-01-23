import { Component, OnInit } from "@angular/core";
import { DateService } from "../shared/date.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Task, TasksService } from "../shared/tasks.service";
import { switchMap } from "rxjs";

@Component({
  selector: "app-organizer",
  templateUrl: "./organizer.component.html",
  styleUrls: ["./organizer.component.scss"]
})
export class OrganizerComponent implements OnInit {
  form: FormGroup;
  tasks: Task[] = [];

  constructor(public dateServ: DateService, private taskServ: TasksService) {
  }

  ngOnInit(): void {
    this.dateServ.date
      .pipe(switchMap((value: any) => this.taskServ.load(value)))
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });

    this.form = new FormGroup<any>({
      title: new FormControl("", Validators.required)
    });
  }

  submit() {
    const { title } = this.form.value;
    const task: Task = {
      title,
      date: this.dateServ.date.value.format("DD-MM-YYYY")
    };

    this.taskServ.create(task).subscribe(
      (data: Task) => {
        this.tasks.push(task);
        this.form.reset();
      },
      (error) => console.error(error)
    );
  }

  remove(task: Task) {
    this.taskServ.remove(task).subscribe(
      () => {
        this.tasks = this.tasks.filter((t: Task) => t.id !== task.id);
      },
      (error) => console.error(error)
    );
  }
}
