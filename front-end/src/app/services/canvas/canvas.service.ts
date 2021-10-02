import { Injectable } from '@angular/core';
import p5 from "p5";

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private p5:p5;

  constructor() {
    this.p5 = new p5((p: any) => {
      p.preload = () => { }
      p.setup = () => { }
      p.draw = () => { }
    });
  }
  public getP5() {
    return this.p5;
  }
}
