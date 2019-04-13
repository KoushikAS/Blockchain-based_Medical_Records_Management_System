import { Component, OnInit } from '@angular/core';
import { RestService } from '.../../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private signUp = {
    id: ''
  };
  private loading = false;
  constructor(private restService: RestService,private router: Router,) { }

  ngOnInit() {
  }

  onLoginPatient(){
    
    this.loading=true;
    return this.restService.loginInPatient(this.signUp)
    .then(() => {
      this.loading=false;
      this.router.navigate(['/Patient']);    
    });
  }

  onLoginDoctor(){
    this.loading=true;
    return this.restService.loginInDoctor(this.signUp)
    .then(() => {
      this.loading=false;
      this.router.navigate(['/MedicalInfo'], {queryParams : {
        docId : this.signUp.id
      }});
    });

  }
}
