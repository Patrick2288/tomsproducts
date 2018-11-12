import { Injectable } from '@angular/core';
import { IProduct} from '../product-list/product';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
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
   }
  
  getProducts(): Observable<IProduct[]> {
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions  => actions.map(a => {
        const data = a.payload.doc.data() as IProduct;
        console.log("getProducts:data" + JSON.stringify(data));
        const id = a.payload.doc.id;
        console.log("getProducts:id = " +id);
        return { id, ...data };
      }))
    );
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

  deleteProduct(id:string): void {
    this.productsCollection.doc(id).delete()
    .catch(error => {console.log("deleteProduct error: " +error); })
    .then(() => console.log('deleteProduct: id = ' +id));
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
    
  }
}
