import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppConfig } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  static settings:AppConfig;

  constructor(private http:HttpClient) {}

  public load(){
    const jsonFile = "assets/config/conifg." + environment.name + ".json";
    return new Promise<void>((resolve,reject) => {
      this.http.get(jsonFile).toPromise().then( (success: any) => {
          AppConfigService.settings = <AppConfig>success;
          resolve();
      }).catch((error:any) => {
        reject(`Could not load ${jsonFile}`);
      });
    });
  }
}