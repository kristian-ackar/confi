import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConferencesComponent } from './conferences/conferences.component';
import { ConferenceComponent } from './conference/conference.component';

const routes: Routes = [
	{ path: '', component: ConferencesComponent },
	{ path: 'conferences/:id', component: ConferenceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
