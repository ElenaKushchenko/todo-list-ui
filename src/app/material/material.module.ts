import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
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
    MatDialogModule
  ],
  exports: [
    DragDropModule,
    A11yModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
})
export class MaterialModule {
}
