import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development'; //DEVELOPMENT

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  private apiUrl = environment.apiURL;

  /**
   * GET Request that fetches data from the specified endpoint.
   * @param endpoint The API endpoint to fetch data from. Format: '/Moneytor/endpointName'.
   * @returns An Observable containing the response data.
   */
  public getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${endpoint}`, {withCredentials: true});
  }


  public autoLoginTest(): Observable<any> {
    const user: string = 'demo';
    const pass: string = 'demo';
    return this.http.post(`${this.apiUrl}/Moneytor/Auth/login`, {username: user, password: pass}, {withCredentials: true});
  }
}
