import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.registerForm = fb.group({
      usuario : ['', [Validators.required, Validators.email]],
      password : ['',[Validators.required, Validators.minLength(6)]],
      repassword : ['']
    }, { validator: this.checkPassword})
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  checkPassword(group: FormGroup): any{
    const pass = group.controls['password']?.value;
    const repass = group.controls['repassword']?.value;
    console.log(pass)
    console.log(repass)
    return pass === repass ? null : {notSame: true}
  }

  registrar(){
    console.log(this.registerForm);
  }


}

