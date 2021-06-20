import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable, throwError } from "rxjs";
import { IProduct } from "./product";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class productService{
  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient){}

  getProduct(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.productUrl).pipe
      (
        tap(data => console.log('All', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  private handleError(err: HttpErrorResponse)
  {
    //in a real world app,we may send the server to some remote loggin infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent)
    {
      // A client-side or network error occurred.handle it accordingly
      errorMessage = `An error occurred: ${err.error.message}`;
    }
    else
    {
      //the backend returned an unsuccessful response code.
      //the response body may contain clues as to wht went worng,
      errorMessage = `Server returned code : ${err.status}, error message is : ${err.message}`;

    }
    console.error(errorMessage);
    return throwError (errorMessage);
  }
}