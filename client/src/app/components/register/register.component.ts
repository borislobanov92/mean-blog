import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IResponseData } from '../../interfaces/interfaces';
import {GlobalConfig} from '../../_config/global-config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  _config = GlobalConfig.CLIENT_SETTINGS;
  form: FormGroup;
  message: string;
  messageClass: string;
  processing: boolean = false;
  emailValid: boolean = true;
  emailMessage: string;
  usernameValid: boolean = true;
  usernameMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])],
      confirm: ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'confirm')});
  }

  onRegisterSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      email: this.email.value,
      username: this.username.value,
      password: this.password.value
    };
    this.authService.registerUser(user)
      .subscribe((data: IResponseData) => {
        this.message = data.message;

        if (!data.success) {
          this.messageClass = this._config.errorMessageClass;
          this.processing = false;
          this.enableForm();
        } else {
          this.messageClass = this._config.successMessageClass;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      });
  }

  checkEmail() {
    const email = this.email.value;
    if (email === '') { return; }

    this.authService.checkEmail(email)
      .subscribe((data: IResponseData) => {
        console.log(data);
        this.emailValid = data.success;
        this.emailMessage = data.message;
      });
  }

  checkUsername() {
    const username = this.username.value;
    if (username === '') { return; }

    this.authService.checkUsername(username)
      .subscribe((data: IResponseData) => {
        console.log(data);
        this.usernameValid = data.success;
        this.usernameMessage = data.message;
      });
  }

  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) { return null; }
      return { 'matchingPasswords': true };
    };
  }

  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value) || !controls.value) { return null; }
    return { 'validateEmail': true };
  }

  validatePassword(controls) {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if (regExp.test(controls.value) || !controls.value) { return null; }
    return { 'validatePassword': true };
  }

  validateUsername(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value) || !controls.value) { return null; }
    return { 'validateUsername': true };
  }

  disableForm() {
    this.email.disable();
    this.username.disable();
    this.password.disable();
    this.confirm.disable();
  }

  enableForm() {
    this.email.enable();
    this.username.enable();
    this.password.enable();
    this.confirm.enable();
  }

  get email(): AbstractControl {
    return this.form.controls.email;
  }

  get username(): AbstractControl {
    return this.form.controls.username;
  }

  get password(): AbstractControl {
    return this.form.controls.password;
  }

  get confirm(): AbstractControl {
    return this.form.controls.confirm;
  }
}
