import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from "./material/material.module";
import {HeaderComponent} from './header/header.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {ConfirmationDialogComponent} from './dialog/confirmation-dialog/confirmation-dialog.component';
import {TaskBoardComponent} from "./task-board/task-board.component";
import {ProjectService} from './service/project.service';
import {HttpClientModule} from '@angular/common/http';
import {ProjectDialogComponent} from './dialog/project-dialog/project-dialog.component';
import {TaskDialogComponent} from './dialog/task-dialog/task-dialog.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ProjectListComponent,
    TaskBoardComponent,
    ConfirmationDialogComponent,
    ProjectDialogComponent,
    TaskDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [
    ProjectService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationDialogComponent,
    ProjectDialogComponent,
    TaskDialogComponent
  ]
})
export class AppModule {
}
