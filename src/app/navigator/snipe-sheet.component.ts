import { Component, Inject } from '@angular/core';
import { SnipeService } from '../_services/snipe.service';
import { MatDialog, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Snipe } from '../_interfaces/snipe';
import { NewSnipeComponent } from './new-snipe.component';

@Component({
  template: `
  <mat-nav-list>
    <mat-list-item (click)="edit(snipe)">
      <mat-icon matListIcon>edit</mat-icon>
      <h3 matLine>Edit</h3>
      <p matLine>Edit the Snipe Settings</p>
    </mat-list-item>
    <mat-list-item (click)="delete(snipe)">
      <mat-icon matListIcon>delete</mat-icon>
      <h3 matLine>Delete</h3>
      <p matLine>Delete the Scheduled Snipe</p>
    </mat-list-item>
  </mat-nav-list>
  `
})
export class SnipeSheetComponent  {

  constructor(
    private service: SnipeService,
    private dialog: MatDialog,
    @Inject(MAT_BOTTOM_SHEET_DATA) public snipe: Snipe) { }

    edit(snipe: Snipe): void {
      this.dialog.open(NewSnipeComponent, {data: {snipe: snipe, title: 'Edit Snipe'}}).afterClosed().subscribe(() => {});
    }

    delete(snipe: Snipe): void {
      this.service.deleteSnipe(snipe).subscribe(() => {});
    }
}
