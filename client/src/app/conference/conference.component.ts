import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService, StateService } from '../shared/services';
import { Conference, Booking } from '../shared/models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { EditConferenceComponent } from './../edit-conference/edit-conference.component';
import { EditBookingComponent } from '../edit-booking/edit-booking.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss']
})
export class ConferenceComponent implements OnInit {
	conference: Conference;
	bookings: Booking[];
	displayedColumns: string[] = ['firstName', 'phone', 'email', 'icon'];
	dataSource: MatTableDataSource<Booking>;
	confId: number;
	isLoggedIn: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(public router: Router, private route: ActivatedRoute, private api: ApiService, public dialog: MatDialog, public snackbar: MatSnackBar, private state: StateService) { }

  ngOnInit() {
		this.state.getLoggedInState()
		.subscribe((state: boolean) => {
			this.isLoggedIn = state;
		});

		this.confId = Number(this.route.snapshot.paramMap.get('id'));

		this.conference = new Conference();
		this.bookings = new Array<Booking>();
		this.dataSource = new MatTableDataSource<Booking>(this.bookings);

		this.api
		.get(`conferences/${this.confId}`, new HttpParams().set('eager', 'true'))
		.subscribe((conference: Conference) => {
			this.conference = conference;
			this.dataSource.data = conference.bookings;
		});
  }

	delBooking(bookId: number) {
		this.api.delete(`bookings/${bookId}`)
		.subscribe((res) => {
			this.conference.bookings.splice(this.conference.bookings.findIndex(b => b.id === bookId), 1);
			this.dataSource.data = this.conference.bookings;
			this.snackbar.open('Booking successfully deleted', 'OK', { duration: 3000 });
		}, (err) => {
			this.snackbar.open('Error occured while deleting booking', 'OK', { duration: 3000 });
		});
	}

	edit() {
		const dialogRef = this.dialog.open(EditConferenceComponent, {
			width: '80%',
			data: { ...this.conference }
    });

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.conference = result;
				this.snackbar.open('Conference data successfully saved', 'OK', { duration: 3000 });
			}
    });
	}

	book() {
		const booking = new Booking();
		booking.conference = this.conference;

		const dialogRef = this.dialog.open(EditBookingComponent, {
			width: '80%',
			data: booking
    });

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.conference.bookings.push(result);
				this.dataSource.data = this.conference.bookings;
				this.snackbar.open('Booking data successfully saved', 'OK', { duration: 3000 });
			}
    });
	}
}
