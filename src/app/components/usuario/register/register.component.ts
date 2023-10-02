import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private router: Router, private toastr: ToastrService, private _error: ErrorService){
    this.registerForm = fb.group({
      usuario : ['', [Validators.required, Validators.email]],
      password : ['',[Validators.required, Validators.minLength(6)]],
      repassword : ['']
    }, { validator: this.checkPassword})
  }

  ngOnInit(): void {
    
  }

  //Metodo para validar que las contraseñas sean iguales
  checkPassword(group: FormGroup): any{
    const pass = group.controls['password']?.value;
    const repass = group.controls['repassword']?.value;
    return pass === repass ? null : {notSame: true}
  }

  //Metodo para registrar el usuario en firebase 
  registrar(){
    const user = this.registerForm.get('usuario')?.value;
    const pass = this.registerForm.get('password')?.value;

    this.loading = true;
    this.auth.createUserWithEmailAndPassword(user,pass).then(rta =>{
      rta.user?.sendEmailVerification();

      //Etiqueta de mensaje registro exitoso
      this.toastr.success('Enviamos un correo electrónico para verificar su cuenta!', 'Usuario Registrado!');
      this.loading = false;
      this.router.navigate(['/usuario'])
    }).catch(error =>{
      this.loading = false;     
      //Etiqueta de mensaje errores
      this.toastr.error(this._error.error(error.code), 'Error!');
      this.registerForm.reset;
    })
  }

}

