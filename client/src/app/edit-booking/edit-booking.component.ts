import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../shared/services/api.service';
import { Booking } from './../shared/models';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.scss']
})
export class EditBookingComponent implements OnInit {
	booking: Booking;

	constructor(public dialogRef: MatDialogRef<EditBookingComponent>, private api: ApiService,
             @Inject(MAT_DIALOG_DATA) public data: Booking) { }

  ngOnInit() {
		this.booking = this.data;
	}

	onCancelClick(): void {
    this.dialogRef.close(false);
	}

	save() {
		this.api.post('bookings', this.booking)
		.subscribe((res) => {
			this.dialogRef.close(res);
		}, (err) => {
			console.log(err);
		});
	}
}
