import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MedicalInfoService } from './MedicalInfo.service';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import $ from 'jquery';
import { DoctorService } from '../Doctor/Doctor.service';
import { PatientService } from '../Patient/Patient.service'; 

@Component({
  selector: 'app-medicalinfo',
  templateUrl: './MedicalInfo.component.html',
  styleUrls: ['./MedicalInfo.component.css'],
  providers: [MedicalInfoService]
})

export class MedicalInfoComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;
  private expanded = {};
  private doctor;
  private docId;

  owner = new FormControl('', Validators.required);
  medId = new FormControl('', Validators.required);
  allergy = new FormControl('', Validators.required);
  medication = new FormControl('', Validators.required);
  pastVisitsArray = new FormControl('', Validators.required);
  permissionedDoctorsId = new FormControl('', Validators.required);
  _ = _;

  constructor(public serviceMedicalInfo: MedicalInfoService, fb: FormBuilder, 
    private router: Router, public doctorService: DoctorService, 
    public activatedRoute: ActivatedRoute, public patientService: PatientService) {
    this.myForm = fb.group({
      owner: this.owner,
      medId: this.medId,
      allergy: this.allergy,
      medication: this.medication,
      pastVisitsArray:  this.pastVisitsArray,
      permissionedDoctorsId: this.permissionedDoctorsId
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      this.docId = params['docId'];
    });

  };

  ngOnInit(): void {
    this.loadAll();
    
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceMedicalInfo.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
        console.log(asset);
        this.expanded[asset.medId] = false;
      });
      this.allAssets = tempList;
      console.log(this.allAssets);
      this.getPatientName();
      this.getDoctorInfo();
      
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

  getPatientName(): void {
    var patientList = [];
    this.patientService.getAll()
    .toPromise()
    .then((result) => {
      result.forEach(asset => {
        patientList.push(asset);
      });
      console.log(patientList);
      _.forEach(this.allAssets, (asset) => {
        var index = _.indexOf(_.map(patientList, 'patientId'), _.last(_.split(asset.owner, '#')));
        asset.patientName = patientList[index]['firstName'] + ' ' + patientList[index]['lastName'];
      });
      console.log(this.allAssets);
    });

    
  }

  updateVisit(medId): void {
    this.router.navigate(['/UpdateVisit'], {queryParams : {
      medId : medId
    }});
  }

  getDoctorInfo(): void {
    const tempList = [];

    this.doctorService.getAll()
    .toPromise()
    .then((result) => {
      result.forEach((doc) => {
        tempList.push(doc);
      });
      // this.doctor = tempList[_.indexOf(_.map(tempList, 'doctorId'), this.docId)];
      this.doctor = _.first(tempList);
      console.log(this.doctor);
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

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.healthcare.basic.MedicalInfo',
      'owner': this.owner.value,
      'medId': this.medId.value,
      'allergy': this.allergy.value,
      'medication': this.medication.value,
      'pastVisitsArray': this.pastVisitsArray.value,
      'permissionedDoctorsId': this.permissionedDoctorsId.value
    };

    this.myForm.setValue({
      'owner': null,
      'medId': null,
      'allergy': null,
      'medication': null,
      'pastVisitsArray': null,
      'permissionedDoctorsId': null
    });

    return this.serviceMedicalInfo.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'owner': null,
        'medId': null,
        'allergy': null,
        'medication': null,
        'pastVisitsArray': null,
        'permissionedDoctorsId': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.healthcare.basic.MedicalInfo',
      'owner': this.owner.value,
      'allergy': this.allergy.value,
      'medication': this.medication.value,
      'pastVisitsArray': this.pastVisitsArray.value,
      'permissionedDoctorsId': this.permissionedDoctorsId.value
    };

    return this.serviceMedicalInfo.updateAsset(form.get('medId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
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

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceMedicalInfo.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'owner': null,
        'medId': null,
        'allergy': null,
        'medication': null,
        'pastVisitsArray': null,
        'permissionedDoctorsId': null
      };

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      if (result.medId) {
        formObject.medId = result.medId;
      } else {
        formObject.medId = null;
      }

      if (result.allergy) {
        formObject.allergy = result.allergy;
      } else {
        formObject.allergy = null;
      }

      if (result.medication) {
        formObject.medication = result.medication;
      } else {
        formObject.medication = null;
      }

      if (result.pastVisitsArray) {
        formObject.pastVisitsArray = result.pastVisitsArray;
      } else {
        formObject.pastVisitsArray = null;
      }

      if (result.permissionedDoctorsId) {
        formObject.permissionedDoctorsId = result.permissionedDoctorsId;
      } else {
        formObject.permissionedDoctorsId = null;
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
      'owner': null,
      'medId': null,
      'allergy': null,
      'medication': null,
      'pastVisitsArray': null,
      'permissionedDoctorsId': null
      });
  }

}
