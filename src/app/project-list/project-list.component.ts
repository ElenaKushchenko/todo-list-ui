import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {ShortProject} from '../model/short-project';
import {ProjectService} from '../service/project.service';

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
    this.projectService.getProjects()
      .subscribe(data => {
        this.projects = data;
        this.projects.push(
          new ShortProject('third', 3, '3'),
          new ShortProject('second', 2, '2')
        );
        this.projects.sort((a, b) => a.order - b.order);
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    const prevIx = event.previousIndex;
    const curIx = event.currentIndex;

    moveItemInArray(this.projects, event.previousIndex, event.currentIndex);
  }

  openDeleteDialog(id: string): void {
    this.dialog.open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.projectService.delete(id).subscribe();
        }
    });
  }
}
