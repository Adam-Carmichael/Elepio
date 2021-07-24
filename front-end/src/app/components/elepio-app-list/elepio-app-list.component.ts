/*
    Test component to be used as a reference for game-space component
*/

import { Component, OnInit } from '@angular/core';
import { ElepioApp } from 'src/app/models/elepio-app.model';
import { ElepioAppService } from 'src/app/services/elepio-app.service';

@Component({
  selector: 'app-elepio-app-list',
  templateUrl: './elepio-app-list.component.html',
  styleUrls: ['./elepio-app-list.component.scss']
})
export class ElepioAppListComponent implements OnInit {

  elepioApps?: ElepioApp[];
  currentElepioApp: ElepioApp = {};
  currentIndex = -1;
  title = '';

  constructor(private elepioService: ElepioAppService) { }

  ngOnInit(): void {
    this.retrieveElepioApps();
  }

  retrieveElepioApps(): void {
    this.elepioService.getAll()
      .subscribe(
        data => {
          this.elepioApps = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  refreshList(): void {
    this.retrieveElepioApps;
    this.currentElepioApp = {};
    this.currentIndex = -1;
  }

  setActiveElepioApp(elepioApp: ElepioApp, index: number): void {
    this.currentElepioApp = elepioApp;
    this.currentIndex = index;
  }

  removeAllElepioApps(): void {
    this.elepioService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        }
      );
  }

  searchTitle(): void {
    this.currentElepioApp = {};
    this.currentIndex = -1;

    this.elepioService.findByTitle(this.title)
      .subscribe(
        data => {
          this.elepioApps = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
}
