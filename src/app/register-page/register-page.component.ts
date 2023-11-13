import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  getFormControl(controlName: string) {
    return this.registerForm.get(controlName);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      localStorage.setItem('user', JSON.stringify(this.registerForm.value));
      this.toastr.success('Registration successful!', 'Success');
      this.router.navigate(['/list']);
    } else {
      // Form is invalid, handle error or display validation messages
    }
  }
}