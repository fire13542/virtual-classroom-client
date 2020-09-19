import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // public static API_URL = 'https://o-class-virtual-classroom-api.herokuapp.com/';
  public static API_URL = "http://localhost:3000/";

  constructor() { }
}
