import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: UntypedFormGroup;
  loggedInUser: any = null;

  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private authService: AuthService) {
    this.createLoginForm();
  }


  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    })
  }


  ngOnInit() {
  }

  login() {
    const { email, password } = this.loginForm.value
    this.authService.login(email, password).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/dashboard']);
      },
      error: err=> console.log(err)
    });
  }

}
