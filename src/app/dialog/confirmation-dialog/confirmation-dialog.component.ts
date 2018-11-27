import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'todo-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
  }

  close(isConfirmed: boolean) {
    this.dialogRef.close(isConfirmed);
  }
}
