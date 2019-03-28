
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { MedicalInfoComponent } from './MedicalInfo/MedicalInfo.component';

import { DoctorComponent } from './Doctor/Doctor.component';
import { PatientComponent } from './Patient/Patient.component';

import { UpdateVisitComponent } from './UpdateVisit/UpdateVisit.component';
import { GivePermissionComponent } from './GivePermission/GivePermission.component';
import { RevokePermissionComponent } from './RevokePermission/RevokePermission.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'MedicalInfo', component: MedicalInfoComponent },
  { path: 'Doctor', component: DoctorComponent },
  { path: 'Patient', component: PatientComponent },
  { path: 'UpdateVisit', component: UpdateVisitComponent },
  { path: 'GivePermission', component: GivePermissionComponent },
  { path: 'RevokePermission', component: RevokePermissionComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
