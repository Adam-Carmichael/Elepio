import { 
  Component, 
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'elepio';
  
  public ngOnInit() {
  }

  public ngAfterViewInit() {
  }

 








  //IGNORE =============

  //import "p5/lib/addons/p5.sound";



//Evolve - 1 path - killing +1 spells
//firebackk - left
//wall - right
//body - circle
//farming - bumping/fireball
//ui - minimap + main content
//controls - wasd
//

/*
  private p5:any;
  private canvas:any;

  public updateCurrentPlayer(direction:Direction){
    this.game.updateCurrentPlayer(direction);
  }


  private createCanvas(){
    this.p5 = new p5(this.sketch);
  }
  private sketch(p:any){
    p.setup = () => {
      p.createCanvas(700,600);  
    }

    p.draw = () => {
      p.background(255);
      p.fill(0);
      p.rect(p.width/2, p.height/2, 50, 50);
    }
  }
  
*/



}
