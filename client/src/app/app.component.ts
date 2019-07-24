import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { MatSnackBar } from '@angular/material';
import { LocalStorageService } from 'ngx-webstorage';
import { StateService } from './shared/services';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	isLoggedIn: boolean;

	constructor(public dialog: MatDialog, public snackBar: MatSnackBar, private storage: LocalStorageService, private state: StateService) { }

	ngOnInit() {
		this.state.getLoggedInState()
		.subscribe((state: boolean) => {
			this.isLoggedIn = state;
		});
	}

	openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
			width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
			if (result === true) {
				this.snackBar.open('Successfully logged in', 'OK', { duration: 3000 });
			}
    });
	}

	logout(): void {
		this.storage.clear(environment.authTokenName);
		this.state.setLoggedInState(false);

		this.snackBar.open('Successfully logged out', 'OK', { duration: 3000 });
	}
}
