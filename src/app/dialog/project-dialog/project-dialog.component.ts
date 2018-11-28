import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ShortProject} from "../../model/short-project";

@Component({
  selector: 'todo-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent {

  constructor(public dialogRef: MatDialogRef<ProjectDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public project?: ShortProject) {
    console.log(project)
  }

  onClose(project?: ShortProject) {
    this.dialogRef.close(project)
  }
}
