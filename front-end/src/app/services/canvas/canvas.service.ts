import { Injectable } from '@angular/core';
import p5 from "p5";

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private p5:p5;

  constructor() {

    this.p5 = new p5((p: any) => {
      p.preload = () => { 
        //setup waits until everthing here is done and then creates the canvas

      }
      p.setup = () => { }
      p.draw = () => { }
    });
  }
  public setP5(newP5:p5){
    this.p5 = newP5;
  }
  
  public getP5() {
    return this.p5;
  }
}
