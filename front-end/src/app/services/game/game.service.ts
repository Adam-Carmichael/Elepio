import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";


import { BoardResponse, CreatePlayerPayload, PlayerResponse, UpdatePlayerPayload, WebSocketPlayerMessage, WebSocketPlayersResponse, WS_Message } from 'src/app/interfaces/interfaces';
import { Board } from 'src/app/classes/board/board';
import { environment } from 'src/environments/environment';
import { AppConfigService } from '../app-config/app-config.service';
import * as Config from "src/assets/config.json";
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';

import { Observable, Observer, Subject, throwError, EMPTY } from 'rxjs';
import { catchError, tap, switchAll, retry, map } from "rxjs/operators"
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
  getBoard(id: string): Observable<HttpResponse<BoardResponse>> {
    return this.http.get<BoardResponse>(`${api}/boards/${id}`, { observe: "response" });
  };

  getBoards(): Observable<HttpResponse<Array<BoardResponse>>> {
    return this.http.get<Array<BoardResponse>>(`${api}/boards`, { observe: "response" });
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
  getFirstActiveBoard(): Observable<HttpResponse<BoardResponse>> {
    return this.http.get<BoardResponse>(`${api}/board`, { observe: "response" });
  };
  getPlayersOnBoard(board_id: string): Observable<HttpResponse<Array<PlayerResponse>>> {
    if (!board_id) {
      return throwError("Invalid Board ID");
    }
    return this.http.get<Array<PlayerResponse>>(`${api}/board/${board_id}/players`, { observe: "response" });
  }

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

  updatePlayerOnBoardWS(player_id:string, data: WebSocketPlayerMessage){
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