import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient) {}

    private productUrl = '/api/products/products.json';
    
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl)
        .pipe(
          tap(data => console.log('All: ', JSON.stringify(data))),
          catchError(this.handleError)
        );
    }

    getProduct(id: number): Observable<IProduct | undefined> {
      return this.getProducts()
      .pipe(
        map((products:IProduct[]) => products.find(x => x.productId === id))
      );
    }

    private handleError(err: HttpErrorResponse) {
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {

      }
      else {
        errorMessage = `Server return code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(() => errorMessage);
    }
}