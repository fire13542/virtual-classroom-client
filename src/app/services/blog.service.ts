import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public static blog = {};

  public static API_URL = ApiService.API_URL;

  constructor() { }
}
