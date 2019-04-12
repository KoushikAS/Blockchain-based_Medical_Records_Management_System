import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { MedicalInfoService } from '.././MedicalInfo/MedicalInfo.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private signUp = {
    id: '',
    firstName: '',
    lastName: '',
    phNo: '',
    specialist: '',
    workExp: '',
    hospital: '',
    age: '',
    address: '',
  };

  private signUp1 = {
    id: '',
    firstName: '',
    lastName: '',
    phNo: '',
    specialist: '',
    workExp: '',
    hospital: '',
    age: '',
    address: '',
  };
  private loading = false;

  constructor(public serviceMedicalInfo: MedicalInfoService,
    private router: Router, private restService: RestService) { }

  ngOnInit() {
  }

  onSignUpDoctor() {
    this.loading=true;    
    return this.restService.signUpDoctor(this.signUp)
      .then(() => {
        this.loading=false;
        this.router.navigateByUrl('/MedicalInfo');
      });
  }

  onSignUpPatient() {
    this.loading=true;
    console.log("inside");
    return this.restService.signUpPatient(this.signUp1)
      .then(() => {
        console.log("2");
        var asset=({
          'owner': "resource:org.healthcare.basic.Patient#"+this.signUp1.id,
          'medId': this.signUp1.id,
          'allergy': null,
          'medication': " ",
          'pastVisitsArray': [ ],
          'permissionedDoctorsId': [ ]
        });

        return  this.serviceMedicalInfo.addAsset(asset)
        .toPromise()
        .then(()=>{
          console.log("3")
          this.router.navigateByUrl('/Patient');
          this.loading=false;
        });
      });
    }


}
