import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  displayLoginOrRegister: boolean = true;
  displayLogin: boolean = false;
  displayRegister: boolean = false;
  userToLogin: User = new User();
  userToRegister: User = new User();

  constructor() { }
  goToLogin(){
    this.displayLoginOrRegister = false;
    this.displayLogin = true;
    this.displayRegister = false;


    // let userToSend: User = new User();
  }
  goToRegister(){
    this.displayLoginOrRegister = false;
    this.displayLogin = false;
    this.displayRegister = true;
  }
  goToLoginOrRegister(){
    this.displayLoginOrRegister = true;
    this.displayLogin = false;
    this.displayRegister = false;
  }
  tryToLogin(){

  }
  tryToRegister(){

  }

  ngOnInit(): void {
  }

}
