import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SnipeService } from '../_services/snipe.service';
import { Snipe } from '../_interfaces/snipe';
import { NewSnipeComponent } from './new-snipe.component';

@Component({
  selector: 'app-root',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private service: SnipeService,
    private dialog: MatDialog) {
  }

  snipes: Snipe[] = [];
  title = 'eBay Sniper';

  ngOnInit(): void {
    this.service.getSnipes().subscribe(data => {
      data.forEach(snipe => this.service.getAuction(snipe.auctionId).subscribe(auction => snipe.auction = auction));
      this.snipes = data;
    }, () => this.alert('Error loading Snipes'));
  }

  delete(snipe): void {
    this.service.deleteSnipe(snipe).subscribe(() => this.ngOnInit(), () => this.alert('Error deleting Snipe'));
  }

  add(): void {
    this.dialog.open(NewSnipeComponent).afterClosed().subscribe(
      snipe => this.service.snipe(snipe).subscribe(() => this.ngOnInit(), () => this.alert('Error adding Snipe'))
    );
  }

  alert(message: string): void {
    this.snackBar.open(message, 'Ok', {duration: 5000});
  }
}
