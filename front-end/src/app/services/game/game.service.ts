import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from "rxjs/operators"
import { ILocation, BoardResponse, CreatePlayerPayload, PlayerResponse, UpdatePlayerPayload } from 'src/app/interfaces/interfaces';
import { Board } from 'src/app/classes/board/board';
import { environment } from 'src/environments/environment';
import { AppConfigService } from '../app-config/app-config.service';
import * as Config from "src/assets/config.json";
//const api = AppConfigService.settings.elepioAPI;
//const api = "http://167.172.246.162:8080/api";

const api = environment.elepioAPI;

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private headers: any;
  private config: any;

  constructor(private http: HttpClient) {}

  getObservableBoardInfo(newPlayer?: boolean): Observable<HttpResponse<BoardResponse>> {
    return this.http.get<BoardResponse>(`${api}/getFirstActiveBoard`, { observe: "response" });
  };

  getFirstActiveBoard(): BoardResponse | void {
    this.http.get<BoardResponse>(`${api}/getFirstActiveBoard`, { observe: "response" }).subscribe(
      (data: HttpResponse<BoardResponse>) => {
        console.log(data.body);
        return data.body;
      },
      (response) => { 
        console.log("getFirstActiveBoard ERROR");
        this.handleError(response); 
      }
    );
  };

  getObservableFirstActiveBoard(): Observable<HttpResponse<BoardResponse>>{
    return this.http.get<BoardResponse>(`${api}/getFirstActiveBoard`, { observe: "response" });
  };


  createPlayer(playerInfo: CreatePlayerPayload): Observable<HttpResponse<PlayerResponse>>{
    return this.http.post<PlayerResponse>(`${api}/createPlayer`, playerInfo, {observe: "response"});
  }


  getPlayersByBoardID(boardID: number): Observable<HttpResponse<Array<PlayerResponse>>>{
    return this.http.get<Array<PlayerResponse>>(`${api}/getPlayersByBoardID/${boardID}`, { observe: "response" });
  }

  updatePlayerLocation(playerID:number, newPos: UpdatePlayerPayload):Observable<HttpResponse<any>> {
    return this.http.patch<any>(`${api}/updatePlayer/${playerID}`, newPos, {observe: "response"});
  }


  public handleError(response: HttpErrorResponse) {
    if (response.status === 0) {
      console.error("Error Occurred:", response.error);
    }
    else {
      console.error("Backend Error Occurred:", response.error);
    }
    return throwError(response.error);
  }

}