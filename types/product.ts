export type TProductCharacteristic = {
    value: string;
    name: string;
};

export type TReviewModel = {
    _id: string;
    name: string;
    title: string;
    description: string;
    rating: number;
    createAt: Date;
};

export type TProductModel = {
    _id: string;
    categories: string[];
    tags: string[];
    title: string;
    description: string;
    link: string;
    image: string;
    characteristics: TProductCharacteristic[];
    initialRating: number;
    credit: number;
    price: number;
    oldPrice: number;
    advantages: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    html: string;
    reviews: TReviewModel[];
    reviewCount: number;
    reviewAvg?: number;
};
