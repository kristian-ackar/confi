import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { Conference } from '../shared/models';
import { ApiService, StateService } from '../shared/services';
import { EditConferenceComponent } from '../edit-conference/edit-conference.component';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
	styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
	conferences: Conference[];
	displayedColumns: string[] = ['name', 'start', 'end'];
	dataSource: MatTableDataSource<Conference>;
	isLoggedIn: boolean;

  constructor(private api: ApiService, public dialog: MatDialog, public snackbar: MatSnackBar, private state: StateService) {	}

	ngOnInit() {
		this.state.getLoggedInState()
		.subscribe((state: boolean) => {
			this.isLoggedIn = state;
		});

		this.conferences = new Array<Conference>();
		this.dataSource = new MatTableDataSource<Conference>(this.conferences);

		this.api
		.get('conferences')
		.subscribe((conferences: Conference[]) => {
			this.dataSource.data = conferences.map((conference: Conference) => {
				conference.start = new Date(conference.start);
				conference.end = new Date(conference.end);

				return conference;
			});
		});
	}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	create() {
		const dialogRef = this.dialog.open(EditConferenceComponent, {
			width: '80%',
			data: new Conference()
    });

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.conferences.push(result);
				this.dataSource.data = this.conferences;
				this.snackbar.open('Conference data successfully saved', 'OK', { duration: 3000 });
			} else {
				this.snackbar.open('Error occured while saving data', 'OK', { duration: 3000 });
			}
    });
	}
}
