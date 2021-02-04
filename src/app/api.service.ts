import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private REST_API_SERVER = "https://www.mocky.io/v2/5eda4003330000740079ea60";
  constructor(
    private http: HttpClient
  ) { }
  getApiData() {
    return this.http.get(this.REST_API_SERVER);
  }

 
}
