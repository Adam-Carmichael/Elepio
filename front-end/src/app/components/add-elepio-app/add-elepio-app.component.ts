/*
    Test component to be used as a reference for game-space component
*/

import { Component, OnInit } from '@angular/core';
import { ElepioApp } from 'src/app/models/elepio-app.model';
import { ElepioAppService } from 'src/app/services/elepio-app.service';

@Component({
  selector: 'app-add-elepio-app',
  templateUrl: './add-elepio-app.component.html',
  styleUrls: ['./add-elepio-app.component.scss']
})
export class AddElepioAppComponent implements OnInit {

  elepioApp: ElepioApp = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private elepioService: ElepioAppService) { }

  ngOnInit(): void {
  }

  saveElepioApp(): void {
    const data = {
      title: this.elepioApp.title,
      description: this.elepioApp.description
    };

    this.elepioService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        }
      );
  }

  newElepioApp(): void {
    this.submitted = false;
    this.elepioApp = {
      title: '',
      description: '',
      published: false
    };
  }
}
