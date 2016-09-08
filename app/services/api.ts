import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import {ConfigService} from './config.service'

@Injectable()
export class ApiService implements OnInit{
  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });
  API_BASE_URL:string = 'api_base_url'; 
  //api_url = sessionStorage.getItem('api_base_url');
  //api_url:string = 'http://localhost:8080/rest/default/garage/v1/@authentication';
  api_url:string;
  _dataFromConfig:any;
  
  
  ngOnInit(){
    this._configService.loadConfig()
            .subscribe(_dataFromConfig => this._dataFromConfig = _dataFromConfig); 
      }

  constructor(private http: Http,
              private _configService: ConfigService) {
    this.api_url = sessionStorage.getItem('api_base_url')  + '@authentication';
  }

  private getJson(response: Response) {
    return response.json();
  }

  private checkForError(response: Response): Response | Observable<any> {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText)
      error['response'] = response;
      console.error(error);
      throw error;
    }
  }

  get(path: string): Observable<any> {
    return this.http.get(`${this.api_url}${path}`, { headers: this.headers })
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  post(path: string, body): Observable<any> {
    return this.http.post(
      `${this.api_url}`,
      JSON.stringify(body),
      { headers: this.headers }
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.api_url}${path}`,
      { headers: this.headers }
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  setHeaders(headers) {
    Object.keys(headers).forEach(header => this.headers.set(header, headers[header]));
  }
}