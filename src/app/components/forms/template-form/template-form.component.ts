import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { userLogin } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent implements OnInit, AfterViewInit {
  loginform!: FormGroup;
  disbleBtn !: boolean
  constructor(private form: FormBuilder, private store: Store<{ user: any }>) {}
  ngAfterViewInit(): void {
    
  }
  messages!: string;
  ngOnInit(): void {
    this.loginform = this.form.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
    this.store.select('user').subscribe((state) => {
      if (state.loading) {
        this.disbleBtn = true
      }else{
        this.disbleBtn = false
      }
      if (state.message !== '') {
        alert(state.message);
      }
    });

    
  }
  handleSubmit() {
    if (this.loginform.valid) {
      console.log('user', this.loginform.value);
      this.store.dispatch(
        userLogin.login({
          email: this.loginform.value.email,
          password: this.loginform.value.password,
        })
      );
    }
  }
  get email() {
    return this.loginform.get('email');
  }
  get password() {
    return this.loginform.get('password');
  }
  
}
