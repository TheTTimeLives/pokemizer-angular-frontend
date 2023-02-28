import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestingService {

  constructor(private http: HttpClient) { }

  configUrl = ""

  getTesting(port: any): Observable<string> {
    console.log("Testing a get...");
    return this.http.get(`http://localhost:${port}/hello`, { responseType: 'text' })
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  postTesting(port : any) {
    return this.http.post(`localhost://${port}/hello`, {});
  }

  putTesting(port : any) {
    return this.http.put(`localhost://${port}/hello`, {});
  }

  deleteTesting(port : any) {
    return this.http.delete(`localhost://${port}/hello`);
  }
}
