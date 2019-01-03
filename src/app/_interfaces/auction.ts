import { Seller } from './seller';

export interface Auction {
    ended: boolean;
    endingAt: Date;
    location: string;
    bidCount: number;
    shippingCost: string;
    currentBid: string;
    id: string;
    buyNowPrice: string;
    title: string;
    seller: Seller;
    thumbnailUrl: string;
}
