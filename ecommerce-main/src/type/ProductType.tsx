interface Variation {
    color: string;
    colorCode: string;
    colorImage: string;
    image: string;
}

export interface ProductType {
    id: string,
    category: string,
    type: string,
    name: string,
    gender: string,
    new: boolean,
    sale: boolean,
    rate: number,
    price: number,
    originPrice: number,
    sold: number,
    quantity: number,
    quantityPurchase: number,
    sizes: Array<string>,
    variation: Variation[],
    thumbImage: Array<string>,
    images: Array<string>,
    description: string,
    action: string,
    slug: string,
    unit: string;
    businessesTypeKeyValue: string;
    status: string;
    nameTypeKeyValue: string;
    discount: number;
    imageURLs: Array<{
      color: {
        name: string;
        clrCode: string;
      };
      img: string;
    }>;
    SK: string;
    featured: boolean;
    tags: string[];
    img: string;
    productType: string;
    brand: {
      name: string;
      id: string;
    };
    createdAt: string;
    children: string;
    isActive: boolean;
    isBlocked: boolean;
    businessType: string;
    updatedAt: string;
   
    parent: string;
    PK: string;
    sku: string;
    title: string;
    
}

