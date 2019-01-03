import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Snipe } from '../_interfaces/snipe';

@Component({
  template: `
    <h1 mat-dialog-title>Add a new Snipe</h1>
    <div mat-dialog-content>
      <mat-form-field style="width: 100%;">
        <mat-label>Auction ID</mat-label>
        <input matInput [(ngModel)]="snipe.auctionId" placeholder="eBay Auction ID" required>
      </mat-form-field>
      <br>
      <mat-form-field style="width: 100%;">
        <mat-label>Bid</mat-label>
        <span matPrefix>$</span>
        <input matInput type="number" [(ngModel)]="snipe.bid" placeholder="Enter Bid Amount" required>
      </mat-form-field>
      <br>
      <mat-form-field style="width: 100%;">
        <mat-label>Description</mat-label>
        <input matInput [(ngModel)]="snipe.description" placeholder="Optional Description">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="dialog.close()">Cancel</button>
      <button mat-button [mat-dialog-close]="snipe" [disabled]="!snipe.auctionId || snipe.bid === 0">Save</button>
    </div>
  `
})
export class NewSnipeComponent {
  constructor(
    public dialog: MatDialogRef<NewSnipeComponent>,
    @Inject(MAT_DIALOG_DATA) public snipe: Snipe) { }
}
