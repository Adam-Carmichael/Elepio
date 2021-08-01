import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";

import { Observable } from 'rxjs';
import { catchError, retry } from "rxjs/operators"
import { throwError } from 'rxjs';

const api = "https://api.spotify.com/v1/search?q=gold";

@Injectable({
  providedIn: 'root'
})
export class GameUpdatesService {
  private headers: any;
  private config: any;

  constructor(private http: HttpClient) { }

  getBoardInfo(newPlayer?: boolean) {
    return this.http.get(
      `${api}`,
      { params: { "q": "gold", "newPlayer": !!newPlayer }, observe: "response" }
    );
  }

  addNewPlayer() {
    return this.http.post(`${api}/player`, {});
  }

  updatePlayerLocation(){
    return false;
  }

  private handleError(response: HttpErrorResponse) {
    console.error(response.error);
    return throwError(response.error || "Server Error");
  }




  getResponse(): Observable<HttpResponse<any>> {
    return this.getBoardInfo();
  }

  showBoardUpdates() {
    this.getResponse().subscribe(resp => {
      const keys = resp.headers.keys();
      this.headers = keys.map(key => {
        `${key}: ${resp.headers.get(key)}`
      });
      this.config = { ...resp.body! };
    })
  }


}
