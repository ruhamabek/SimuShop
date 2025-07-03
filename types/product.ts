export interface Product{
    id: number;
    name: string;
    nameLowercase: string;
    amountInstock: number;
    currentPrice: number;
    previousPrice: number;
    deliveryPrice: number;
    deliveryInDays: number;
    isSimuShopChoice: boolean;
    imageUrl?: string | null;
    model3DUrl?: string | null;
}