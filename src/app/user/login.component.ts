import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { getMaskedUserName } from './state/users.reducer';
import * as UserActions from './state/users.actions';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  maskUserName$: Observable<boolean>;
  typeInput: string;

  constructor(private store: Store<Store>, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.maskUserName$ = this.store.select(getMaskedUserName).pipe(
      map(maskUserName => {
        this.typeInput = maskUserName?  'password' : 'text';
        return maskUserName
      })
    );
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    this.store.dispatch(UserActions.toggleMaskUserName())
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
