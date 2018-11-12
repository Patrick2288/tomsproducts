import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Router } from '@angular/router';
import { IProduct } from '../product-list/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productId: number;
  productName: string;
  productCode: string;
  releaseDate: string;
  description: string;
  price: number;
  starRating: number;
  imageUrl: string;
  showDisplayClipartComponent: boolean;

  listFilter: string;
  constructor(private _productService: ProductService, private router: Router) { }

  ngOnInit() {
  }

  showHideDisplayClipartComponent(): boolean {
    this.showDisplayClipartComponent = !this.showDisplayClipartComponent;
    return false;
  }

  addImageStringToFormTextBox(evt): boolean {
    this.imageUrl = evt;
    return false;
  }

  addProduct(): void {
    let product:IProduct = {
      productId:this.productId,
      productName:this.productName,
      productCode:this.productCode,
      releaseDate:this.releaseDate,
      description:this.description,
      price:this.price,
      starRating:this.starRating,
      imageUrl:this.imageUrl,
    };
    this._productService.addProduct(product);

    this.router.navigate(['/product-list']);
  }
}
