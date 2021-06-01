import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { getMaskedUserName } from './state/users.reducer';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  maskUserName$: Observable<boolean>;
  typeInput: string;

  constructor(private store: Store<any>, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.maskUserName$ = this.store.pipe(
      select(getMaskedUserName)
    );

    this.maskUserName$.subscribe(maskUserName => {
      this.typeInput = maskUserName?  'password' : 'text';

    })
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    this.store.dispatch({
      type: '[User] Toggle Mask User Name'
    })
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
