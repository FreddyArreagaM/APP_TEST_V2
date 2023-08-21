import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {
  recuperarForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.recuperarForm = fb.group({
      usuario: ['', [Validators.required, Validators.email]]
    })
  }

  recuperarPassword(){
    
  }

}
