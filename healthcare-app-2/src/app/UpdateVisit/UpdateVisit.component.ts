
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UpdateVisitService } from './UpdateVisit.service';
import 'rxjs/add/operator/toPromise';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updatevisit',
  templateUrl: './UpdateVisit.component.html',
  styleUrls: ['./UpdateVisit.component.css'],
  providers: [UpdateVisitService]
})
export class UpdateVisitComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;
  private medId;

  asset = new FormControl('', Validators.required);
  procedure = new FormControl('', Validators.required);
  medicationPrescribed = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceUpdateVisit: UpdateVisitService, fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.medId = params['medId'];
    });

    this.myForm = fb.group({
      asset: this.medId,
      procedure: this.procedure,
      medicationPrescribed: this.medicationPrescribed,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceUpdateVisit.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.healthcare.basic.UpdateVisit',
      'asset': 'resource:org.healthcare.basic.MedicalInfo#' + this.medId,
      'procedure': this.procedure.value,
      'medicationPrescribed': this.medicationPrescribed.value,
      'transactionId': this.transactionId.value,
      'timestamp': new Date()
    };

    this.myForm.setValue({
      'asset': this.medId,
      'procedure': null,
      'medicationPrescribed': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceUpdateVisit.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'asset': this.medId,
        'procedure': null,
        'medicationPrescribed': null,
        'transactionId': null,
        'timestamp': null
      });
      this.router.navigateByUrl('/MedicalInfo');
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.healthcare.basic.UpdateVisit',
      'asset': this.medId,
      'procedure': this.procedure.value,
      'medicationPrescribed': this.medicationPrescribed.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceUpdateVisit.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.serviceUpdateVisit.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

    return this.serviceUpdateVisit.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'asset': this.medId,
        'procedure': null,
        'medicationPrescribed': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.asset) {
        formObject.asset = result.asset;
      } else {
        formObject.asset = null;
      }

      if (result.procedure) {
        formObject.procedure = result.procedure;
      } else {
        formObject.procedure = null;
      }

      if (result.medicationPrescribed) {
        formObject.medicationPrescribed = result.medicationPrescribed;
      } else {
        formObject.medicationPrescribed = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'asset': this.medId,
      'procedure': null,
      'medicationPrescribed': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
