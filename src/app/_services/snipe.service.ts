import { Observable } from 'rxjs';
import { Snipe } from '../_interfaces/snipe';
import { HttpClient } from '@angular/common/http';
import { Auction } from '../_interfaces/auction';
import { Inject } from '@angular/core';

@Inject({providedIn: 'root'})
export class SnipeService {
  constructor(private http: HttpClient) { }

  getSnipes(): Observable<Snipe[]> {
    return this.http.get<Snipe[]>('/snipes');
  }

  getAuction(id: string): Observable<Auction> {
    return this.http.get<Auction>(`/auction/${id}`);
  }

  getAuctionSnipe(id: string): Observable<Snipe> {
    return this.http.get<Snipe>(`/auction/${id}/snipe`);
  }

  snipe(snipe: Snipe): Observable<Snipe> {
    return this.http.post<Snipe>(`/auction/${snipe.auctionId}/snipe`, snipe);
  }

  deleteSnipe(snipe: Snipe): Observable<Snipe> {
    return this.http.delete<Snipe>(`/auction/${snipe.auctionId}/snipe`);
  }
}
