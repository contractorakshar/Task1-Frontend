import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  LoginTime;
  len;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private _route: Router) { }
  ngOnInit() {
    this.LoginTime = localStorage.getItem('LoginTime');
    let c: any[] = JSON.parse(localStorage.getItem('Escalate'));
    this.len = c.length;
  }
  Logout() {
    localStorage.removeItem('u_EmailId');
    this._route.navigate(['']);
  }
}
