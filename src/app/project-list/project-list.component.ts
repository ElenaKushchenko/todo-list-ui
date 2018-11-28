import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../dialog/confirmation-dialog/confirmation-dialog.component';
import {ShortProject} from '../model/short-project';
import {ProjectService} from '../service/project.service';
import {Project} from "../model/project";
import {ProjectDialogComponent} from "../dialog/project-dialog/project-dialog.component";

@Component({
  selector: 'todo-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Array<ShortProject>;

  constructor(private dialog: MatDialog,
              private projectService: ProjectService) {
  }

  ngOnInit() {
    this.getProjects()
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.projects, event.previousIndex, event.currentIndex);
    this.projects.forEach((it, ix) => {
      it.order = ix
    });
    this.updateProjects(this.projects);
  }

  openDeleteDialog(id: string) {
    this.dialog.open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.deleteProject(id)
        }
      });
  }

  openProjectDialog(project?: ShortProject) {
    this.dialog.open(ProjectDialogComponent, {data: Object.assign({}, project)})
      .afterClosed()
      .subscribe(result => {
        if (!!result) {
          if (project == null) {
            result.order = this.projects.length;
            this.createProject(result)
          } else {
            this.updateProject(result)
          }
        }
      });
  }

  private getProjects() {
    this.projectService.getAll()
      .subscribe(data => {
        this.projects = data
      });
  }

  private createProject(project: Project) {
    this.projectService.create(project)
      .subscribe(data => {
        project.id = data;
        this.projects.push(project)
      });
  }

  private updateProjects(projects: Array<ShortProject>) {
    this.projectService.updateAll(projects)
      .subscribe(() => {
        this.projects = projects
      });
  }

  private updateProject(project: Project) {
    const id = project.id;
    this.projectService.update(id, project)
      .subscribe(() => {
        const ix = this.projects.findIndex(it => it.id == id);
        this.projects[ix] = project;
      });
  }

  private deleteProject(id: string) {
    this.projectService.delete(id)
      .subscribe(() => {
        this.projects = this.projects.filter(it => it.id != id)
      });
  }

  private sortProjects() {
    this.projects.sort((a, b) => a.order - b.order);
  }
}
