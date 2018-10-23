import { Injectable } from '@angular/core';
import { IProduct} from '../product-list/product';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class ProductService {
  private _productUrl = 'http://localhost:3000/products';

  productsCollection: AngularFirestoreCollection<IProduct>;

  products: Observable<IProduct[]>;

  allProducts: IProduct[];
  errorMessage: string;
  
  constructor(private _Http: HttpClient, private _afs: AngularFirestore) {
    this.productsCollection = _afs.collection<IProduct>("products");
    this.addAllProducts();
   }
  
  getProducts(): Observable<IProduct[]> {
    this.products = this.productsCollection.valueChanges();
    this.products.subscribe(data => console.log("getProducts" + data));
    return this.products;     
  }

  addProduct(product: IProduct): void{
    this.productsCollection.add(product);
  }

  addAllProducts() {
    this._Http.get<IProduct[]>(this._productUrl).subscribe(
      products => {
        this.allProducts = products;
        for (let product of this.allProducts){
          console.log("Adding: " + product.productName);
          this.productsCollection.add(product);
        }
      },
      error => (this.errorMessage = <any>error)
    );    
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
    
  }
}
