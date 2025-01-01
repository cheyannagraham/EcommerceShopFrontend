import {ProductCategoryModel} from './productCategory.model';

export class ProductModel {

  constructor(public id: number,
              public name: string,
              public category: ProductCategoryModel,
              public description: string,
              public unitPrice: number,
              public imageUrl: string,
              public active: boolean,
              public unitsInStock: number,
              public dateCreated: Date,
              public lastUpdated: Date) {
  }
}

export interface ProductListResponse {
  _embedded: {
    products: ProductModel[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

export interface ProductListPage {
  products: ProductModel[],
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
