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
