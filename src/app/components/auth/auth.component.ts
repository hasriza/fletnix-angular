import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormLayoutType, NzFormModule } from 'ng-zorro-antd/form';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { sub } from 'date-fns';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    NzCardModule,
    NzTabsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    CommonModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    RouterLink,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  activeTab: string = 'register';
  today: Date = new Date();
  defaultDate: Date = sub(this.today, { years: 5 });
  formLayout: NzFormLayoutType = 'horizontal';

  loading: boolean = false;

  validateForm: any;

  validateFormRegister: FormGroup<{
    name: FormControl<string> | any;
    email: FormControl<string> | any;
    dob: FormControl<Date> | any;
    password: FormControl<string>;
    confirm: FormControl<string>;
  }>;

  validateFormLogin: FormGroup<{
    email: FormControl<string> | any;
    password: FormControl<string>;
  }>;

  disabledDate = (d: Date): boolean =>
    // Can not select days before today and today
    !d || d > sub(this.today, { years: 5 });

  validateConfirmPassword(): void {
    setTimeout(
      () =>
        this.validateForm.controls.confirm &&
        this.validateForm.controls.confirm.updateValueAndValidity()
    );
  }

  confirmValidator: ValidatorFn = (control: AbstractControl) => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private metaService: Meta,
    private fb: NonNullableFormBuilder,
    private user: UserService
  ) {
    this.user.authLoading.subscribe((val) => (this.loading = val));

    this.metaService.addTag({
      name: 'description',
      content: 'Authenticate for access',
    });

    this.validateFormRegister = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      dob: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
    });

    this.validateFormLogin = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });

    this.validateForm = this.validateFormRegister;
  }

  onTabChanged(newTab: string) {
    this.activeTab = newTab;
    if (newTab === 'register') {
      this.validateForm = this.validateFormRegister;
    } else {
      this.validateForm = this.validateFormLogin;
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      let { confirm, ...otherValues } = this.validateForm.value;
      (this.user as any)[
        this.activeTab === 'register' ? 'registerUser' : 'loginUser'
      ](otherValues);
    } else {
      Object.values(this.validateForm.controls).forEach((control: any) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
