export interface ProductType {
    unit: string;
    businessesTypeKeyValue: string;
    status: string;
    nameTypeKeyValue: string;
    name: string;
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
    quantity: number;
    productType: string;
    slug: string;
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
    category: {
      name: string;
      id: string;
    };
    parent: string;
    description: string;
    price: number;
    PK: string;
    sku: string;
    type: string;
    title: string;
  }
  