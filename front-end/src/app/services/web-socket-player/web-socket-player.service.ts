import { Injectable } from '@angular/core';

import { Observable, Observer, Subject, throwError, EMPTY, observable, } from 'rxjs';
import { catchError, tap, switchAll, retry, map } from "rxjs/operators"
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
import { WS_Message } from 'src/app/interfaces/interfaces';
import { R3ExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';


const api = environment.elepioAPI;
const url = `ws://167.172.246.162:8080/ws/board/players`;

@Injectable({
  providedIn: 'root'
})
export class WebSocketPlayerService {
  /*
    private subject: AnonymousSubject<MessageEvent> | null = null;
    public messages: Subject<WS_Message>;
  */

  private subject: Subject<MessageEvent> | null = null;

  constructor() {}

  testMethod(url:string){
    var myWebSocket: WebSocketSubject<any> = webSocket(url);
    var obsWebSocket = myWebSocket.asObservable();

    //receiving of data
    obsWebSocket.subscribe(
      (success) => {
        console.log("WS SUB SUCCESS:", success);
      },
      (error) => {
        console.error("WS SUB ERROR:", error);
      },
      () => {
        console.log("Connection closed");
      }
    )
    //sending data to server
    myWebSocket.next({ message: "Hello World!" });
  }

  createSubject(url: string): AnonymousSubject<MessageEvent> {
    var ws = new WebSocket(url);

    var observable = new Observable((o: Observer<MessageEvent>) => {
      ws.onmessage = o.next.bind(o);
      ws.onerror = o.error.bind(o);
      ws.onclose = o.complete.bind(o);
      return ws.close.bind(ws);
    });

    var observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
          // console.log("WS Next - Sent Data:", data);
        }
      },
      error: () => {
        console.log("WS Error - Error Occurred");
      },
      complete: () => {
        console.log("WS Complete - Connection Closed");
      }
    }

    var subject = new AnonymousSubject(observer, observable);
    return subject;
  }

  connect(url: string): AnonymousSubject<MessageEvent> | null {
    if(!url || url.indexOf("ws") != 0){
      this.subject = null;
      console.log("URL Doesnt have ws");
      return this.subject;
    }
    if (!this.subject) {
      this.subject = this.createSubject(url);
    }
    return this.subject;
  }

/*

//original working version:

    var myWebSocket: WebSocketSubject<any> = webSocket(url);
    var obsWebSocket = myWebSocket.asObservable();

    //receiving of data
    obsWebSocket.subscribe(
      (success) => {
        console.log("WS SUB SUCCESS:", success);
      },
      (error) => {
        console.error("WS SUB ERROR:", error);
      },
      () => {
        console.log("Connection closed");
      }
    )
    //sending data to server
    myWebSocket.next({ message: "Hello World!" });

*/

  /*
    create(url:string): Subject<MessageEvent>{
      var ws = new WebSocket(url);
  
      var observable = new Observable((o: Observer<MessageEvent>) =>{
        ws.onmessage = o.next.bind(o);
        ws.onerror = o.error.bind(o);
        ws.onclose = o.complete.bind(o);
        return ws.close.bind(ws);
      });
  
      var observer = {
        next: (data:  Object) => {
          
        }
      }
    }
  */




  /*
  connect(url: string): AnonymousSubject<MessageEvent> {

    var url = `${api}/board/test/players`;
    this.messages = <Subject<WS_Message>>this.connect(url).pipe(
      map(
        (response: MessageEvent): WS_Message => {
          return JSON.parse(response.data);
        }
      )
    );



    if (!this.subject) {
      this.subject = this.createWebSocket(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }


  private createWebSocket(url: string): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    let observer = {
      error: (err:any)=>{},
      complete: ()=>{},
      next: (data: Object) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };

    return new AnonymousSubject<MessageEvent>(observer, observable);
  }
  */
}



