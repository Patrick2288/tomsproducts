import { Injectable } from '@angular/core';
import { IProduct} from '../product-list/product';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ProductService {
  private _productUrl = 'http://localhost:3000/products';
  
  constructor(private _Http: HttpClient) { }
  
  getProducts(): Observable<IProduct[]> {
    return this._Http.get<IProduct[]>(this._productUrl).pipe(
      tap(data => console.log('All: '+ JSON.stringify(data))),
      catchError(this.handleError));
     
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
    
  }
}
