import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { NavigatorComponent } from './navigator/navigator.component';

import {
  MatBottomSheetModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnipeService } from './_services/snipe.service';
import { NewSnipeComponent } from './navigator/new-snipe.component';
import { FormsModule } from '@angular/forms';
import { SnipeSheetComponent } from './navigator/snipe-sheet.component';

@NgModule({
  declarations: [
    NavigatorComponent,
    NewSnipeComponent,
    SnipeSheetComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  providers: [
    SnipeService
  ],
  bootstrap: [
    NavigatorComponent
  ],
  entryComponents: [
    SnipeSheetComponent,
    NewSnipeComponent
  ]
})
export class AppModule { }
