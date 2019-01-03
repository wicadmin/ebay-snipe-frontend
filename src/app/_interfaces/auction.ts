import { Seller } from './seller';

export interface Auction {
    ended: boolean;
    endingAt: Date;
    location: string;
    bidCount: number;
    shippingCost: number;
    currentBid: number;
    id: string;
    buyNowPrice: number;
    title: string;
    seller: Seller;
    thumbnailUrl: string;
}
