
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DoctorService } from './Doctor.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-doctor',
  templateUrl: './Doctor.component.html',
  styleUrls: ['./Doctor.component.css'],
  providers: [DoctorService]
})
export class DoctorComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  doctorId = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  specialist = new FormControl('', Validators.required);
  workExp = new FormControl('', Validators.required);
  hospital = new FormControl('', Validators.required);
  phNo = new FormControl('', Validators.required);


  constructor(public serviceDoctor: DoctorService, fb: FormBuilder) {
    this.myForm = fb.group({
      doctorId: this.doctorId,
      firstName: this.firstName,
      lastName: this.lastName,
      specialist: this.specialist,
      workExp: this.workExp,
      hospital: this.hospital,
      phNo: this.phNo
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceDoctor.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
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

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.healthcare.basic.Doctor',
      'doctorId': this.doctorId.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'specialist': this.specialist.value,
      'workExp': this.workExp.value,
      'hospital': this.hospital.value,
      'phNo': this.phNo.value
    };

    this.myForm.setValue({
      'doctorId': null,
      'firstName': null,
      'lastName': null,
      'specialist': null,
      'workExp': null,
      'hospital': null,
      'phNo': null
    });

    return this.serviceDoctor.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'doctorId': null,
        'firstName': null,
        'lastName': null,
        'specialist': null,
        'workExp': null,
        'hospital': null,
        'phNo': null
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.healthcare.basic.Doctor',
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'specialist': this.specialist.value,
      'workExp': this.workExp.value,
      'hospital': this.hospital.value,
      'phNo': this.phNo.value
    };

    return this.serviceDoctor.updateParticipant(form.get('doctorId').value, this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceDoctor.deleteParticipant(this.currentId)
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

    return this.serviceDoctor.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'doctorId': null,
        'firstName': null,
        'lastName': null,
        'specialist': null,
        'workExp': null,
        'hospital': null,
        'phNo': null
      };

      if (result.doctorId) {
        formObject.doctorId = result.doctorId;
      } else {
        formObject.doctorId = null;
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

      if (result.specialist) {
        formObject.specialist = result.specialist;
      } else {
        formObject.specialist = null;
      }

      if (result.workExp) {
        formObject.workExp = result.workExp;
      } else {
        formObject.workExp = null;
      }

      if (result.hospital) {
        formObject.hospital = result.hospital;
      } else {
        formObject.hospital = null;
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
      'doctorId': null,
      'firstName': null,
      'lastName': null,
      'specialist': null,
      'workExp': null,
      'hospital': null,
      'phNo': null
    });
  }
}
