
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

import { UpdateMedicationComponent } from './UpdateMedication/UpdateMedication.component';
import { UpdateVisitComponent } from './UpdateVisit/UpdateVisit.component';
import { RestService } from 'services/rest.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MedicalInfoComponent,
    DoctorComponent,
    PatientComponent,
    UpdateMedicationComponent,
    UpdateVisitComponent
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
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
