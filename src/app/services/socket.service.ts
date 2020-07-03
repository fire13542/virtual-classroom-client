import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public static API_URL = ApiService.API_URL;
  
  public static socket;

  constructor() { }
}
