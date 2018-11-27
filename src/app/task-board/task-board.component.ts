import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ConfirmationDialogComponent} from "../dialog/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material";
import {TaskDialogComponent} from "../dialog/task-dialog/task-dialog.component";

@Component({
  selector: 'todo-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
  toDo = [
    'Get to work',
    'Pick up groceries Pick up groceries Pick up groceries Pick up groceries Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  inProgress = [
    'Get up',
    'Brush teeth'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  openDeleteDialog(id: string) {
    this.dialog.open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe(result => {
        if (result) {
          // this.deleteProject(id)
        }
      });
  }

  openTaskDialog(id?: string) {
    this.dialog.open(TaskDialogComponent)
      .afterClosed()
      .subscribe(result => {
        if (result) {
          // this.deleteProject(id)
        }
      });
  }
}
