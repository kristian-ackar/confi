import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private isLoggedIn: BehaviorSubject<boolean>;

	constructor(private storage: LocalStorageService) {
		this.isLoggedIn = new BehaviorSubject<boolean>(!!this.storage.retrieve(environment.authIdentifier));
	}

	getLoggedInState(): BehaviorSubject<boolean> {
		return this.isLoggedIn;
	}

	setLoggedInState(state: boolean) {
		this.storage.store(environment.authIdentifier, state);
		this.isLoggedIn.next(state);
	}
}
