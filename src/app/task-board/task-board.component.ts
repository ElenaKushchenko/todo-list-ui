import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ConfirmationDialogComponent} from '../dialog/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import {TaskDialogComponent} from '../dialog/task-dialog/task-dialog.component';
import {NavigationEnd, Router} from '@angular/router';
import {Task} from '../model/task';
import {ProjectService} from '../service/project.service';
import {Project} from '../model/project';

@Component({
  selector: 'todo-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
  project: Project;
  toDo: Array<Task>;
  inProgress: Array<Task>;
  done: Array<Task>;

  constructor(private router: Router,
              private projectService: ProjectService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.router.events.subscribe(path => {
      if (path instanceof NavigationEnd) {
        const url = path.url;
        if (RegExp('/projects/\.\+', 'ig').test(url)) {
          const projectId = path.url.substr(path.url.lastIndexOf('/'));
          this.getProject(projectId);
        } else {
          this.project = null;
          this.toDo = [];
          this.inProgress = [];
          this.done = [];
        }
      }
    });
  }

  drop(event: CdkDragDrop<string[]>, status: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      (event.container.data[event.currentIndex] as any).status = status;
    }

    this.aggregateTasks(this.toDo, this.inProgress, this.done);
    this.updateProject(this.project);
  }

  openDeleteDialog(task: Task) {
    this.dialog.open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe(data => {
        if (data) {
          this.project.tasks = this.project.tasks.filter(it => it !== task);
          this.updateProject(this.project);
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
            this.project.tasks.push(data);
          } else {
            const ix = this.project.tasks.findIndex(it => it === task);
            this.project.tasks[ix] = data;
          }
          this.updateProject(this.project);
        }
      });
  }

  private getProject(id: string) {
    this.projectService.get(id)
      .subscribe(data => {
        this.sortTasks(data.tasks);
        this.project = data;
        this.splitTasks(data);
      });
  }

  private updateProject(project: Project) {
    const id = project.id;
    this.projectService.update(id, project)
      .subscribe(() => {
        this.sortTasks(project.tasks);
        this.project = project;
        this.splitTasks(project);
      });
  }

  private splitTasks(project: Project) {
    this.toDo = project.tasks.filter(it => it.status === 'TO_DO');
    this.inProgress = project.tasks.filter(it => it.status === 'IN_PROGRESS');
    this.done = project.tasks.filter(it => it.status === 'DONE');
  }

  private aggregateTasks(toDoTasks: Array<Task>, progressTasks: Array<Task>, doneTasks: Array<Task>) {
    this.project.tasks = [];

    toDoTasks.forEach((it, ix) => {
      it.order = ix;
      this.project.tasks.push(it);
    });
    progressTasks.forEach((it, ix) => {
      it.order = ix;
      this.project.tasks.push(it);
    });
    doneTasks.forEach((it, ix) => {
      it.order = ix;
      this.project.tasks.push(it);
    });
  }

  private sortTasks(taskList: Array<Task>) {
    taskList.sort((a, b) => a.order - b.order);
  }
}
