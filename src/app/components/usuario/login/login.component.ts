import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private toastr: ToastrService, private _error: ErrorService, private router: Router){
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required ]
    })
  }

  ngOnInit(): void {
    
  }

  login(){
    const user = this.loginForm.get('usuario')?.value;
    const pass = this.loginForm.get('password')?.value;

    this.loading = true;
    this.auth.signInWithEmailAndPassword(user,pass).then( result=>{

      if(result.user?.emailVerified == false){
        this.router.navigate(['/usuario/verificarCorreo']);
      }else{
        if(result.user?.emailVerified == true){
          //Etiqueta de mensaje login extioso
          this.toastr.success('Ingreso exitoso', 'Benvenido al Sistema');
          //this.loading = false;
        }
      }      
    }, error => {
      this.loading = false;     
      //Etiqueta de mensaje errores
      this.toastr.error(this._error.error(error.code), 'Error!');
      this.loginForm.reset;
    })

  }
}
