import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  pageTitle: string = "Tom's Products";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  _listFilter: string;
  get listFilter(): string {
      return this._listFilter;
  }
  set listFilter(value: string){
      this._listFilter = value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }   

  filteredProducts: IProduct[];
  products: IProduct[];

constructor(private _productService: ProductService){
    
}
public ngOnInit(): void{
    this.products = this._productService.getProducts();
    this.filteredProducts = this.products
}
performFilter(filterBy: string): IProduct[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
    product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
}
toggleImage():void{
    this.showImage = !this.showImage;
}
}
