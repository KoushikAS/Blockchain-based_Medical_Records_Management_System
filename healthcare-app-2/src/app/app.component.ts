import { Component, AfterViewInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app works!';

  constructor( private route: ActivatedRoute, private router: Router) {

  }

  ngAfterViewInit() {
    this.route
      .queryParams
      .subscribe(() => {
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
        });
  }
}
