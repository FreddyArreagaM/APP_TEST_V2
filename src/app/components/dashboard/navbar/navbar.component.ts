import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private afAuth: AngularFireAuth, private _router: Router){

  }

  logOut(){
    this.afAuth.signOut();
    localStorage.removeItem('user')
    this._router.navigate(['/']);
  }
}
