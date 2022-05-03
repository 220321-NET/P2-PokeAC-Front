import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { NgForm } from '@angular/forms';
import { HttpService } from '../services/http.service';


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
  stringifiedUserToRegister: any;

  constructor(private api : HttpService) { }
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
    console.log("You want to send: ");
    console.log(this.userToLogin);
  }
  tryToRegister(){
    console.log("You want to Register: ");
    console.log(this.userToRegister);
    this.api.createUser(this.userToRegister);
  }

  ngOnInit(): void {
  }

}
