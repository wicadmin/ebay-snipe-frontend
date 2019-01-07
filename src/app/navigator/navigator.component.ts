import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatBottomSheet } from '@angular/material';
import { SnipeService } from '../_services/snipe.service';
import { Snipe } from '../_interfaces/snipe';
import { NewSnipeComponent } from './new-snipe.component';
import { Auction } from '../_interfaces/auction';
import { SnipeSheetComponent } from './snipe-sheet.component';

@Component({
  selector: 'app-root',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private service: SnipeService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet) {
  }

  snipes: Snipe[] = [];
  title = 'eBay Sniper';

  ngOnInit(): void {
    this.service.getSnipes().subscribe(data => {
      data.forEach((snipe: Snipe) => {
        this.service.getAuction(snipe.auctionId).subscribe((auction: Auction) => {
            // Transform Auction data to Numbers
            const buyNowPrice: any = auction.buyNowPrice || '';
            const currentBid: any = auction.currentBid || '';
            const shippingCost: any = auction.shippingCost || '';

            auction.buyNowPrice = Number(buyNowPrice.substr(4));
            auction.currentBid = Number(currentBid.substr(4));
            auction.shippingCost = Number(shippingCost.substr(4));

            auction.endingAt = new Date(auction.endingAt);

            // Convert UTC Date
            snipe.auction = auction;
          }
        );

        // Transform bid to Number
        const bid: any = snipe.bid || '';
        snipe.bid = Number(bid.substr(4));

        // Convert UTC Date
        snipe.snipeTime = new Date(snipe.snipeTime + 'Z');
      });
      this.snipes = data;
    }, () => this.alert('Error loading Snipes'));
  }

  add(): void {
    // Open Dialog with no data
    this.dialog.open(NewSnipeComponent, {data: {snipe: {}, title: 'Add a Snipe'}}).afterClosed().subscribe(
      (snipe: Snipe) => {
        // If not canceled
        if (snipe) {
          // Save and Reload
          this.service.snipe(snipe).subscribe(() => this.ngOnInit(), () => this.alert('Error adding Snipe'));
        }
      }
    );
  }

  sheet(snipe: Snipe): void {
    this.bottomSheet.open(SnipeSheetComponent, {data: snipe}).afterDismissed().subscribe((data: any) => {
      // If Edit
      if (data.action === 'edit') {

        // Open Edit Dialog with Data
        this.dialog.open(NewSnipeComponent, {data: {snipe: data.snipe, title: 'Edit Snipe'}}).afterClosed().subscribe(
          (editedSnipe: Snipe) => {
            // If not canceled
            if (editedSnipe) {
              // Save and Reload
              this.service.snipe(editedSnipe).subscribe(() => this.ngOnInit(), () => this.alert('Error editing Snipe'));
            }
          }
        );
      // If Delete
      } else if (data.action === 'delete') {
        // Delete and reload
        this.service.deleteSnipe(data.snipe).subscribe(() => this.ngOnInit(), () => this.alert('Error deleting Snipe'));
      }
    });
  }

  alert(message: string): void {
    this.snackBar.open(message, 'Ok', {duration: 5000});
  }
}
