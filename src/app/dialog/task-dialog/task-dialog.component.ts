import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Task} from "../../model/task";

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {

  constructor(public dialogRef: MatDialogRef<TaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public task?: Task) {
  }

  onClose(task?: Task) {
    this.dialogRef.close(task)
  }
}
