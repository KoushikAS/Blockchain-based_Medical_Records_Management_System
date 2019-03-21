/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

  private signUp = {
    id: '',
    firstName: '',
    surname: '',
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
    this.signUpInProgress = true;
    return this.restService.signUpDoctor(this.signUp)
      .then(() => {
        this.loggedIn = true;
        this.signUpInProgress = false;
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
