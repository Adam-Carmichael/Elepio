import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";


import { BoardResponse, CreatePlayerPayload, PlayerResponse, UpdatePlayerPayload, WebSocketPlayerMessage, WebSocketPlayersResponse, WS_Message } from 'src/app/interfaces/interfaces';
import { Board } from 'src/app/classes/board/board';
import { environment } from 'src/environments/environment';
import { AppConfigService } from '../app-config/app-config.service';
import * as Config from "src/assets/config.json";
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';

import { Observable, Observer, Subject, throwError, EMPTY, of } from 'rxjs';
import { catchError, tap, switchAll, retry, map, take, switchMap } from "rxjs/operators"
import { webSocket, WebSocketSubject, } from "rxjs/webSocket";
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { WebSocketService } from '../web-socket/web-socket.service';
import { WebSocketPlayerService } from '../web-socket-player/web-socket-player.service';



//const api = AppConfigService.settings.elepioAPI;
//const api = "http://167.172.246.162:8080/api";

const api = environment.elepioAPI;
const playersWebSocket = environment.elepioPlayersWS;
const playerWebSocket = environment.elepioPlayerWS;
const echoWebSocket = environment.elepioEchoWS;
@Injectable({
  providedIn: 'root'
})
export class GameService {
  public messages: any;
  public oMessages: Observable<any> | null = null;


  public messages2: any;
  public oMessages2: Observable<any> | null = null;

  constructor(private http: HttpClient, private ws: WebSocketService, private wsPlayers: WebSocketPlayerService) { }


  //==============================================================//
  //                        BOARDS API
  //==============================================================//
  getBoard(id: string): Observable<HttpResponse<Array<BoardResponse>>> {
    return this.http.get<Array<BoardResponse>>(`${api}/boards/${id}`, { observe: "response" });
  };

  getBoards(): Observable<HttpResponse<Array<BoardResponse>>> {
    return this.http.get<Array<BoardResponse>>(`${api}/boards`, { observe: "response" });
  };

  createBoard(): Observable<HttpResponse<BoardResponse>> {
    return this.http.post<BoardResponse>(`${api}/boards`, {}, { observe: "response" });
  };



  //==============================================================//
  //                        PLAYERS API
  //==============================================================//
  getPlayer(id: string): Observable<HttpResponse<PlayerResponse>> {
    return this.http.get<PlayerResponse>(`${api}/players/${id}`, { observe: "response" });
  }
  getPlayers(): Observable<HttpResponse<Array<PlayerResponse>>> {
    return this.http.get<Array<PlayerResponse>>(`${api}/players`, { observe: "response" });
  }
  updatePlayer(id: string, updates: UpdatePlayerPayload): Observable<HttpResponse<PlayerResponse>> {
    return this.http.patch<PlayerResponse>(`${api}/updatePlayer/${id}`, updates, { observe: "response" });
  }
  createPlayer(playerInfo: CreatePlayerPayload): Observable<HttpResponse<WebSocketPlayersResponse>> {
    return this.http.post<WebSocketPlayersResponse>(`${api}/players`, playerInfo, { observe: "response" });
  }
  deletePlayer(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${api}/players/${id}`, { observe: "response" });
  }



  //==============================================================//
  //                        Unique Methods
  //==============================================================//
  getFirstBoard(): Observable<HttpResponse<BoardResponse>> {
    return this.http.get<BoardResponse>(`${api}/board`, { observe: "response" });
  }

  getFirstActiveBoard(): Observable<HttpResponse<BoardResponse>> {
    // this.http.get<BoardResponse>(`${api}/board`, { observe: "response" });

    const response = this.http.get<BoardResponse>(`${api}/board`, { observe: "response" })

    return response;
  }


  getBoardInfo(): Observable<HttpResponse<BoardResponse>> {
    // this.http.get<BoardResponse>(`${api}/board`, { observe: "response" });


    const observable = this.http.get<BoardResponse>(`${api}/board`, { observe: "response" });
   


    return observable;








    // doSomething().pipe(
    //   tap(doSomethingResponse => this.performSomeOperation(doSomethingResponse)),
    //   switchMap(_ => this.doAnotherthing())
    // ).subscribe(doAnotherthingResponse => console.log(doAnotherthingResponse));

    //     .pipe(concatMap(value => {
    //   console.log(`${value}: first pipe operator (before promise)`);
    //   // return a promise that resolves with the specified value after 2 seconds
    //   return new Promise(resolve => setTimeout(() => resolve(value), 2000));
    // }))
    //   .pipe(concatMap(value => {
    //     console.log(`${value}: second pipe operator (after promise resolved)`);
    //     return of(value);
    //   }))
    //   .subscribe(value => this.values.push(value));








    // var one = someObservable.pipe(take(1));
    // var two = someOtherObservable.pipe(take(1));
    // concat(one, two).subscribe(function () {/*do something */ });


    // var boardResponse = this.http.get<BoardResponse>(`${api}/board`, { observe: "response" }).pipe(take(1));

    // if (boardResponse.)





    //   const response: Observable<HttpResponse<BoardResponse>> = this.http.get<BoardResponse>(`${api}/board`, { observe: "response" }).pipe(
    //     map(result => {
    //       console.log("getfirstactiveboard 1", result);
    //       var x: HttpResponse<BoardResponse> = result;

    //       if (!result.ok) {
    //         let y = this.createBoard();
    //         y.subscribe((success) => {
    //           console.log("creating new board");
    //           result = success;
    //           return result;
    //         });
    //       } else {
    //         return result;
    //       }
    //     }));

    // return response;
  }

  getPlayersOnBoard(board_id: string): Observable<HttpResponse<Array<PlayerResponse>>> {
    if (!board_id) {
      return throwError("Invalid Board ID");
    }
    return this.http.get<Array<PlayerResponse>>(`${api}/board/${board_id}/players`, { observe: "response" });
  };

  //61ec86adf66fc44889b0a66e
  //echoWebSocket
  //playersWebSocket

  //this.ws.testMethod(playersWebSocket);
  //return;

  getPlayersOnBoardWS(board_id: string): Observable<any> {
    //Connect to Web Socket if not already connected
    this.messages = <AnonymousSubject<any>>this.ws.connect(playersWebSocket);

    //Send message with body containing the current board id
    this.messages?.next({
      action: "get_players",
      body: {
        id: board_id
      }
    });

    //Return Observable Messages
    return this.messages?.asObservable();
  }

  updatePlayerOnBoardWS(player_id: string, data: WebSocketPlayerMessage) {
    //Connect to Web Socket if not already connected
    this.messages2 = <AnonymousSubject<any>>this.wsPlayers.connect(playerWebSocket);

    //Send message with body containing the current board id
    this.messages2?.next({
      action: "update_player",
      body: data
    });

    //Return Observable Messages
    return this.messages2?.asObservable();
  }






  /**
   * var messages = this.ws.connect(playersWebSocket)?.pipe(
      map(((response: MessageEvent) => {
        var data = JSON.parse(response.data);
        console.log(data);
        return data;
      }))
    );
   */

  //==============================================================//
  //                        MISC Methods
  //==============================================================//
  handleError(response: HttpErrorResponse): any {
    if (response.status >= 200 && response.status < 300) {
      return;
    }

    console.error("Error Occurred:", response.error);
    return throwError(response.error);
  }

  validID(id?: string) {
    if (!id) {
      return false
    }
    return id && id.length == 24;
  }

}