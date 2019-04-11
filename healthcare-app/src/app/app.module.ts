
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { MedicalInfoComponent } from './MedicalInfo/MedicalInfo.component';
import { DoctorComponent } from './Doctor/Doctor.component';
import { PatientComponent } from './Patient/Patient.component';

import { UpdateVisitComponent } from './UpdateVisit/UpdateVisit.component';
import { GivePermissionComponent } from './GivePermission/GivePermission.component';
import { RevokePermissionComponent } from './RevokePermission/RevokePermission.component';

import { RestService } from 'services/rest.service';
import { MedicalInfoService } from './MedicalInfo/MedicalInfo.service';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MedicalInfoComponent,
    DoctorComponent,
    PatientComponent,
    UpdateVisitComponent,
    GivePermissionComponent,
    RevokePermissionComponent,
    LoginComponent,
    RegistrationComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService,
    RestService,
    MedicalInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
