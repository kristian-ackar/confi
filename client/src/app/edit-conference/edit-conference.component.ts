import { Component, OnInit, NgZone, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { ApiService } from '../shared/services/api.service';
import { Conference } from './../shared/models';

import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-conference',
  templateUrl: './edit-conference.component.html',
  styleUrls: ['./edit-conference.component.scss']
})
export class EditConferenceComponent implements OnInit {
	@ViewChild('autosize', {static: false}) autosizeDecription: CdkTextareaAutosize;
	@ViewChild('autosize', {static: false}) autosizeIntro: CdkTextareaAutosize;
	conference: Conference;

	constructor(public dialogRef: MatDialogRef<EditConferenceComponent>, private api: ApiService, private ngZone: NgZone,
		           @Inject(MAT_DIALOG_DATA) public data: Conference, private snackbar: MatSnackBar) { }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
			this.autosizeIntro.resizeToFitContent(true);
			this.autosizeDecription.resizeToFitContent(true);
		});
	}

  ngOnInit() {
		this.conference = this.data;
		delete this.conference.bookings;
	}

	onCancelClick(): void {
    this.dialogRef.close(false);
	}

	save(f: NgForm) {
		const id: number = this.conference.id;

		if (id) { // Update existing
			this.api.put(`conferences/${id}`, this.conference)
			.subscribe((res) => {
				this.dialogRef.close(this.conference);
			}, (err) => {
				this.snackbar.open('Error occured while saving data', 'OK', { duration: 3000 });
			});
		} else { // Save new
			this.api.post('conferences', this.conference)
			.subscribe((res: Conference) => {
				this.dialogRef.close(res);
			}, (err) => {
				this.snackbar.open('Error occured while saving data', 'OK', { duration: 3000 });
			});
		}
	}
}
