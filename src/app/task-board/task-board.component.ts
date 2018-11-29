import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ConfirmationDialogComponent} from "../dialog/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material";
import {TaskDialogComponent} from "../dialog/task-dialog/task-dialog.component";
import {NavigationEnd, Router} from "@angular/router";
import {Task} from "../model/task";
import {ProjectService} from "../service/project.service";
import {Project} from "../model/project";

@Component({
  selector: 'todo-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
  // toDo = [
  //   'Get to work',
  //   'Pick up groceries Pick up groceries Pick up groceries Pick up groceries Pick up groceries',
  //   'Go home',
  //   'Fall asleep'
  // ];
  //
  // inProgress = [
  //   'Get up',
  //   'Brush teeth'
  // ];
  //
  // done = [
  //   'Get up',
  //   'Brush teeth',
  //   'Take a shower',
  //   'Check e-mail',
  //   'Walk dog'
  // ];

  project: Project;
  toDo: Array<Task>;
  inProgress: Array<Task>;
  done: Array<Task>;

  constructor(private router: Router,
              private projectService: ProjectService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    // this.router.events.subscribe(path => {
    //   if (path instanceof NavigationEnd) {
    //     let url = path.url;
    //     let projectId =
    //     path.url.substr(path.url.lastIndexOf('/'))
    //       console.log(route);
    //
    //   }
    // });
    this.getProject('5bff2ead57619219f469ae98')
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openDeleteDialog(task: Task) {
    this.dialog.open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe(data => {
        if (data) {
          this.project.tasks = this.project.tasks.filter(it => it != task);
          this.updateProject(this.project);
          this.splitTasksByStatus(this.project)
        }
      });
  }

  openTaskDialog(task?: Task) {
    this.dialog.open(TaskDialogComponent, {data: Object.assign({}, task)})
      .afterClosed()
      .subscribe(data => {
        if (!!data) {
          if (task == null) {
            data.status = 'TO_DO';
            data.order = this.project.tasks.length;
            this.project.tasks.push(data)
          } else {
            let ix = this.project.tasks.findIndex(it => it == task);
            this.project[ix] = data
          }
          this.updateProject(this.project)
        }
      })
  }

  private getProject(id: string) {
    this.projectService.get(id)
      .subscribe(data => {
        this.project = data;
        this.splitTasksByStatus(data)
      });
  }

  private updateProject(project: Project) {
    const id = project.id;
    this.projectService.update(id, project)
      .subscribe(() => {
        this.project = project;
        this.splitTasksByStatus(project)
      });
  }

  private splitTasksByStatus(project: Project) {
    this.toDo = project.tasks.filter(it => it.status = 'TO_DO');
    this.inProgress = project.tasks.filter(it => it.status = 'IN_PROGRESS');
    this.done = project.tasks.filter(it => it.status = 'DONE')
  }

  private sortTasks(taskList: Array<Task>) {
    taskList.sort((a, b) => a.order - b.order);
  }
}
