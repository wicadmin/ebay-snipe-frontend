import { Auction } from './auction';

export interface Snipe {
    auctionId: string;
    bid: number;
    description?: string;
    quantity: number;
    snipeTime?: Date;
    auction?: Auction;
}
