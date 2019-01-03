import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
      <mat-form-field style="width: 100%;" appearance="outline">
        <mat-label>Auction ID</mat-label>
        <input matInput [(ngModel)]="data.snipe.auctionId" placeholder="eBay Auction ID" required>
      </mat-form-field>
      <br>
      <mat-form-field style="width: 100%;" appearance="outline">
        <mat-label>Bid</mat-label>
        <input matInput type="number" [(ngModel)]="data.snipe.bid" placeholder="Enter Bid Amount" required>
        <span matPrefix>$</span>
      </mat-form-field>
      <br>
      <mat-form-field style="width: 100%;" appearance="outline">
        <mat-label>Description</mat-label>
        <input matInput [(ngModel)]="data.snipe.description" placeholder="Optional Description">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="dialog.close()">Cancel</button>
      <button mat-button [mat-dialog-close]="data.snipe" [disabled]="!data.snipe.auctionId || data.snipe.bid === 0">Save</button>
    </div>
  `
})
export class NewSnipeComponent {
  constructor(
    public dialog: MatDialogRef<NewSnipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}
