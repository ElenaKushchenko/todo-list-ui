import {NgModule} from '@angular/core';
import {MatListModule, MatSidenavModule, MatToolbarModule} from "@angular/material";

@NgModule({
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
})
export class MaterialModule {
}
