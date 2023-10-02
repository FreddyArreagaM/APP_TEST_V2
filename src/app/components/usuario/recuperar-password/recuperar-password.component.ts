import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {
  recuperarForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private toastr: ToastrService, private _error: ErrorService, private router: Router){
    this.recuperarForm = fb.group({
      usuario: ['', [Validators.required, Validators.email]]
    })
  }

  //Metodo para enviar email de recuperación de password
  recuperarPassword(){
    // Obtener el correo digitado
    const correo = this.recuperarForm.get('usuario')?.value;
    this.loading = true;
    this.auth.sendPasswordResetEmail(correo).then(() =>{
      this.toastr.info('Enviamos un correo electronico para restablecer su contraseña', 'Restablecer contraseña');
      this.router.navigate(['/usuario']);
    }).catch(error =>{
      this.loading = false;
      this.toastr.error(this._error.error(error.code), 'Error!');
      this.recuperarForm.reset;
    })
  }
}
