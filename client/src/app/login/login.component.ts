import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { ApiService, StateService } from '../shared/services';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public dialogRef: MatDialogRef<LoginComponent>, private api: ApiService, private storage: LocalStorageService, private state: StateService) { }

  onCancelClick(): void {
    this.dialogRef.close(false);
	}

	login(form: NgForm): void {
		this.api
		.login(form.value.username, form.value.password)
		.subscribe((response: any) => {
			this.storage.store(environment.authTokenName, `Bearer ${response.token}`);
			this.state.setLoggedInState(true);
			this.dialogRef.close(true);
		});
	}
}
