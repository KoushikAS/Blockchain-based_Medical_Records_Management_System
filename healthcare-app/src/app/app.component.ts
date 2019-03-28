
import { Component, AfterViewInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app works!';
  private authenticated = false;
  private loggedIn = false;
  private signUpInProgress = false;
  
  private doctor={
    id: '',
    firstName: '',
    lastName: '',
  } 

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

  constructor(private route: ActivatedRoute,
    private router: Router, private restService: RestService) {

  }


  ngAfterViewInit() {

    this.route
      .queryParams
      .subscribe((queryParams) => {
        const loggedIn = queryParams['loggedIn'];
        if (loggedIn) {
          this.authenticated = true;
          $('.nav a').on('click', function () {
            $('.nav').find('.active').removeClass('active');
            $(this).parent().addClass('active');
          });

          $('.dropdown').on('show.bs.dropdown', function (e) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
          });

          $('.dropdown').on('hide.bs.dropdown', function (e) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
          });

          $('.dropdown-menu li').on('click', function () {
            $(this).parent().parent().addClass('active');
          });
        }
      });
  }


  onSignUpDoctor() {
    console.log('inside');
    console.log(this.signUp);
    this.signUpInProgress = true;
    
    return this.restService.signUpDoctor(this.signUp)
      .then(() => {
        //next 2 lines not needed
        this.loggedIn = true;
        this.signUpInProgress = false;
        this.router.navigateByUrl('/MedicalInfo');
      });
  }

  onSignUpPatient() {
    console.log('inside');
    this.signUpInProgress = true;
    return this.restService.signUpPatient(this.signUp)
      .then(() => {
        this.loggedIn = true;
        this.signUpInProgress = false;
      });
  }

}
