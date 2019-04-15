import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PatientService } from './Patient.service';
import { MedicalInfoService } from '../MedicalInfo/MedicalInfo.service';
import { Router } from '@angular/router';
import { DoctorService } from '../Doctor/Doctor.service';
import 'rxjs/add/operator/toPromise';
import { RevokePermissionService } from '../RevokePermission/RevokePermission.service';
// import { GivePermissionService } from '../GivePermission/GivePermission.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-patient',
  templateUrl: './Patient.component.html',
  styleUrls: ['./Patient.component.css'],
  providers: [PatientService]
})
export class PatientComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;
  private medAsset;
  private allDoctors;
  private Transaction;
  private doctors;

  patientId = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  phNo = new FormControl('', Validators.required);
  _ = _;
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);
  // moment = moment;

  constructor(public servicePatient: PatientService, public medicalInfoService: MedicalInfoService, 
    public doctorService: DoctorService, fb: FormBuilder, private router: Router,
    private serviceRevokePermission: RevokePermissionService) {
    this.myForm = fb.group({
      patientId: this.patientId,
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
      address: this.address,
      phNo: this.phNo,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
    this.getMedicalHistory();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicePatient.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
      console.log(this.allParticipants);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

  public revokePermission(docId): void {
    this.serviceRevokePermission.addTransaction({
      $class: 'org.healthcare.basic.RevokePermission',
      'asset': 'resource:org.healthcare.basic.MedicalInfo#' + this.medAsset.medId,
      'doctorId': docId,
      'transactionId': this.transactionId.value,
      'timestamp': new Date()
    })
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.getMedicalHistory();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  public givePermission(): void {
    console.log(this.medAsset);
    this.router.navigate(['/GivePermission'], {queryParams : {
      medId : this.medAsset.medId
    }});
    
  }

  getMedicalHistory(): Promise<any> {
    const tempList = [];
    return this.medicalInfoService.getAll()
    .toPromise()
    .then((result) => {
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.medAsset = _.first(tempList);
      this.medAsset['pastVisisArray'] = _.sortBy(this.medAsset['pastVisisArray'], 
        [function(asset){return this.moment(asset.visitDate).format('LLL')}]);
      console.log(this.medAsset);
      this.getAllDoctors();

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

  getAllDoctors(): Promise<any> {
    const tempList = [];
    return this.doctorService.getAll()
    .toPromise()
    .then((result) => {
      result.forEach(doc => {
        tempList.push(doc);
      });
      this.allDoctors = tempList;
      console.log(this.allDoctors);
      this.getPermissionedDoctors();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

  getPermissionedDoctors(): void {
    this.doctors = [];

    _.forEach(this.medAsset['permissionedDoctorsId'], (docId) => {
      console.log(this.allDoctors);
      var index = _.indexOf(_.map(this.allDoctors, 'doctorId'), docId);
      (index != -1) ? this.doctors.push(this.allDoctors[index]) : '';
    });
    console.log(this.doctors);
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.servicePatient.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'patientId': null,
        'firstName': null,
        'lastName': null,
        'age': null,
        'address': null,
        'phNo': null
      };

      if (result.patientId) {
        formObject.patientId = result.patientId;
      } else {
        formObject.patientId = null;
      }

      if (result.firstName) {
        formObject.firstName = result.firstName;
      } else {
        formObject.firstName = null;
      }

      if (result.lastName) {
        formObject.lastName = result.lastName;
      } else {
        formObject.lastName = null;
      }

      if (result.age) {
        formObject.age = result.age;
      } else {
        formObject.age = null;
      }

      if (result.address) {
        formObject.address = result.address;
      } else {
        formObject.address = null;
      }

      if (result.phNo) {
        formObject.phNo = result.phNo;
      } else {
        formObject.phNo = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'patientId': null,
      'firstName': null,
      'lastName': null,
      'age': null,
      'address': null,
      'phNo': null
    });
  }
}
