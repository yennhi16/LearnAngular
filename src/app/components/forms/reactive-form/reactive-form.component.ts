import { validateUserName } from './../../../service/validateUsername.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, map, switchMap, timer } from 'rxjs';
import {
  NoWhitespaceValidator,
  validateUserNameFromApi,
  validateUserNameFromApiDebounce,
} from 'src/app/interface/customValidator';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit {
  signInform!: FormGroup;
  inputFomrcontrol !: FormControl
  constructor(
    private formBuilder: FormBuilder,
    private api: validateUserName
  ) {}
  ngOnInit(): void {
    this.signInform = this.formBuilder.group({
      username: this.formBuilder.group(
        {
          lastname: [
            '',
            Validators.compose([
              Validators.required,
              NoWhitespaceValidator(),
              Validators.minLength(3),
            ]),
            Validators.composeAsync([
              validateUserNameFromApiDebounce(this.api),
              validateUserNameFromApi(this.api)
            ]),
          ],
          firstname: '',
        }
        ,
        // {
        //   updateOn: 'submit',
        // }
      ),
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/),
        ]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      remember: '',
    });
    this.lastname?.valueChanges.subscribe((v) =>
      console.log('valueChanges', v)
    );
    this.lastname?.statusChanges.subscribe((v) =>
      console.log('statusChanges', v)
    );
    console.log('root', this.lastname?.root);
    

    
   
    // this.lastname?.markAsTouched({onlySelf: true})
    // this.lastname?.setValue('gg');
    // this.lastname?.disable()
    // this.lastname?.reset()
  }
  get lastname() {
    return this.signInform.get('username.lastname');
  }
  get email() {
    return this.signInform.get('email');
  }
  get password() {
    return this.signInform.get('password');
  }
  

  // signInform = new FormGroup({
  //   username: new FormGroup({
  //     lastname: new FormControl(''),
  //     firstname: new FormControl(''),
  //   }),
  //   password: new FormControl(''),
  //   email: new FormControl(''),
  //   remember: new FormControl(false),
  // });
  handleSubmit() {
    console.log('Submit');
    console.log(this.signInform)
    // console.log(this.signInform.valid);
    // console.log(this.signInform.getRawValue());
    if (this.signInform.valid) {
      console.log(this.signInform.value);
    }
  }
  handleUpdateValue() {
    this.signInform.setValue({
      username: {
        lastname: 'htt',
        firstname: 'yyy',
      },
      password: '111111',
      email: 'nhi',
      remember: true,
    });
    this.signInform.patchValue({ email: 'ttt' });
  }
}
