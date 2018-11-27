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
    const prevIx = event.previousIndex;
    const curIx = event.currentIndex;

    const start = prevIx > curIx ? curIx : prevIx;
    const end = prevIx > curIx ? prevIx : curIx;
    const shift = prevIx > curIx ? 1 : -1;
    this.projects.slice(start + 1, end + 1)
      .forEach(it => {
        it.order = it.order + shift;
        this.updateProject(it)
      });
    this.projects[prevIx].order = curIx;
    this.updateProject(this.projects[prevIx]);

    moveItemInArray(this.projects, event.previousIndex, event.currentIndex);
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

  openProjectDialog(id?: string) {
    this.dialog.open(ProjectDialogComponent)
      .afterClosed()
      .subscribe(result => {
        if (result) {
          // this.deleteProject(id)
        }
      });
  }

  private getProjects() {
    this.projectService.getAll()
      .subscribe(data => {
        this.projects = data;
        this.projects.push(
          new ShortProject('third', 3, '3'),
          new ShortProject('second', 2, '2'),
          new ShortProject('fifth', 5, '5'),
          new ShortProject('fourth', 4, '4'),
          new ShortProject('sixth', 6, '6')
        );
        this.sortProjects()
      });
  }

  private updateProject(project: Project) {
    const id = project.id;
    this.projectService.update(id, project)
      .subscribe(data => {
        this.projects = this.projects.filter(it => it.id != id);
        this.projects.push(data);
        this.sortProjects()
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
