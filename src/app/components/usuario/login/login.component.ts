import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { user } from 'src/app/interfaces/user';
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

    //Metodo para iniciar sesion mediante email and password en firebase
    this.auth.signInWithEmailAndPassword(user,pass).then( result=>{

      if(result.user?.emailVerified == false){
        this.router.navigate(['/usuario/verificarCorreo']);
      }else{
        if(result.user?.emailVerified == true){
          //Etiqueta de mensaje login extioso
          this.toastr.success('Ingreso exitoso', 'Bienvenido al Quizz');
          //this.loading = false;
          this.router.navigate(['/dashboard']);

          //Enviamos los datos del user a LocalStorage para tener su inicio de sesion
          this.setLocalStorage(result.user);
        }
      }      
    }, error => {
      this.loading = false;     
      //Etiqueta de mensaje errores
      this.toastr.error(this._error.error(error.code), 'Error!');
      this.loginForm.reset;
    })

  }

  //Envío de los datos del usuario que inició sesion para guardar su user y así
  // utilizarlo en futuros componentes
  setLocalStorage(user: any){
    const usuario: user ={
      uid:user.uid,
      email: user.email
    }
    //Envío de los datos usando estructura JSON
    localStorage.setItem('user', JSON.stringify(usuario));
  }
}
