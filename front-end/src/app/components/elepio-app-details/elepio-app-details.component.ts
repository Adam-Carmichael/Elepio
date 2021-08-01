/*
    Test component to be used as a reference for game-space component
*/

import { Component, OnInit } from '@angular/core';
import { ElepioApp } from 'src/app/models/elepio-app.model';
import { ElepioAppService } from 'src/app/services/elepio-app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-elepio-app-details',
  templateUrl: './elepio-app-details.component.html',
  styleUrls: ['./elepio-app-details.component.scss']
})
export class ElepioAppDetailsComponent implements OnInit {

  currentElepioApp: ElepioApp = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(
    private elepioService: ElepioAppService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getElepioApp(this.route.snapshot.params.id);
  }

  getElepioApp(id: string): void {
    this.elepioService.get(id)
      .subscribe(
        data => {
          this.currentElepioApp = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentElepioApp.title,
      description: this.currentElepioApp.description,
      published: status
    };

    this.message = '';

    this.elepioService.update(this.currentElepioApp.id, data)
      .subscribe(
        response => {
          this.currentElepioApp.published = status;
          console.log(response);
          this.message = response.message ? response.message : 'The status was updated successfully!';
        },
        error => {
          console.log(error);
        }
      );
  }

  updateElepioApp(): void {
    this.message = '';

    this.elepioService.update(this.currentElepioApp.id, this.currentElepioApp)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This elepioApp was updated successfully!'
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteElepioApp(): void {
    this.elepioService.delete(this.currentElepioApp.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/elepioApp']);
        },
        error => {
          console.log(error);
        }
      );
  }
}
