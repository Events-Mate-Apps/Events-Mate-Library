export type VendorReviewResponse = {
    reviews: VendorReview[];
    totalPages: number;
    totalReviews: number;
};

export type VendorReview = {
    id: string;
    rating: number;
    qualityOfService: number;
    responsiveness: number
    professionalism: number;
    value: number;
    flexibility: number;
    recommend: boolean;
    didWeHelp: boolean;
    title: string;
    description?: string;
    amountSpent?: number;
    guestsAttended?: number;
    authorEmail: string;
    createdAt: Date;
};