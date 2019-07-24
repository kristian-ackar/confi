import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiService, StateService } from './shared/services';
import { LoginComponent } from './login/login.component';
import { ConferencesComponent } from './conferences/conferences.component';
import { ConferenceComponent } from './conference/conference.component';
import { EditConferenceComponent } from './edit-conference/edit-conference.component';
import { EditBookingComponent } from './edit-booking/edit-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConferencesComponent,
    ConferenceComponent,
    EditConferenceComponent,
    EditBookingComponent
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		NgxWebstorageModule.forRoot(),
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatMenuModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatSnackBarModule,
		MatTableModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatNativeDateModule
	],
  providers: [
		ApiService,
		StateService
	],
	entryComponents: [
		LoginComponent,
		EditConferenceComponent,
		EditBookingComponent
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
