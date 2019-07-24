import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	constructor(private http: HttpClient, private storage: LocalStorageService) { }

	private get token() {
		return `Bearer ${this.storage.retrieve(environment.authTokenName) || ''}`;
	}

	/**
	 * Generic REST method for http GET requests
	 * @param route string
	 * @return Observable<object>
	 */
	get(route: string, params?: HttpParams): Observable<object> {
		return this.http.get(
			environment.apiUrl + route,
			{
				headers: new HttpHeaders().set(environment.authTokenName, this.token),
				params
			}
		);
	}

	/**
	 * Generic REST method for http POST requests
	 * @param route string
	 * @param payload object
	 * @return Observable<object>
	 */
	post(route: string, payload: object): Observable<object> {
		return this.http.post(
			environment.apiUrl + route,
			payload,
			{
				headers: new HttpHeaders().set(environment.authTokenName, this.token),
				//withCredentials: true
			}
		);
	}

	/**
	 * Generic REST method for http PUT requests
	 * @param route string
	 * @param payload object
	 * @return Observable<object>
	 */
	put(route: string, payload: object): Observable<object> {
		return this.http.put(
			environment.apiUrl + route,
			payload,
			{
				headers: new HttpHeaders().set(environment.authTokenName, this.token),
				//withCredentials: true
			}
		);
	}

	/**
	 * Generic REST method for http DELETE requests
	 * @param route string
	 * @return Observable<any>
	 */
	delete(route: string): Observable<any> {
		return this.http.delete(
			environment.apiUrl + route,
			{
				headers: new HttpHeaders().set(environment.authTokenName, this.token),
				//withCredentials: true
			}
		);
	}

  /**
   * Specific API methods
   */
	login(username: string, password: string): Observable<object> {
		return this.post('login', { username, password });
	}
}
