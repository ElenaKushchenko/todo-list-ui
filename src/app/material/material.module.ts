import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {A11yModule} from '@angular/cdk/a11y'

@NgModule({
  imports: [
    DragDropModule,
    A11yModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    DragDropModule,
    A11yModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
})
export class MaterialModule {
}
