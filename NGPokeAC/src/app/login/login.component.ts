import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { NgForm } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  displayLoginOrRegister: boolean = true;
  displayLogin: boolean = false;
  displayRegister: boolean = false;
  displayPlay: boolean = false;
  message: string = "Login if you have an accout or register if you want to join.";
  userToLogin: User = {
    username: '',
    password: '',
    matches: 0,
    wins: 0,
    losses: 0
  }
  userToRegister: User = {
    username: '',
    password: '',
    matches: 0,
    wins: 0,
    losses: 0
  }
  userToCheck: User = {
    username: '',
    password: '',
    matches: 0,
    wins: 0,
    losses: 0
  }
  loggedInUser: User = {
    username: '',
    password: '',
    matches: 0,
    wins: 0,
    losses: 0
  }
  

  constructor(private api : HttpService, private router: Router) { }
  goToLogin(){
    this.displayLoginOrRegister = false;
    this.displayLogin = true;
    this.displayRegister = false;
  }
  goToRegister(){
    this.displayLoginOrRegister = false;
    this.displayLogin = false;
    this.displayRegister = true;
    this.message = "Choose a username and password.";
  }
  goToLoginOrRegister(){
    this.displayLoginOrRegister = true;
    this.displayLogin = false;
    this.displayRegister = false;
    this.message = "Login if you have an accout or register if you want to join.";
  }
  logOut(){
    this.loggedInUser = {
      username: '',
      password: '',
      matches: 0,
      wins: 0,
      losses: 0
    }
    this.displayPlay = false;
    this.displayLoginOrRegister = true;
    this.message = "You have logged out. Login if you have an accout or register if you want to join.";
  }
  
  tryToLogin(){
    this.api.getUserByUsername(this.userToLogin.username).subscribe(res => {
      this.userToCheck = res;
      if(!this.userToCheck) {
        this.message = `There is no account for ${this.userToLogin.username}. You can go back and register.`;
      }
      if(this.userToCheck.username == this.userToLogin.username && this.userToCheck.password == this.userToLogin.password ) {
        this.loggedInUser = this.userToCheck;
        this.displayLogin = false;
        this.displayPlay = true;
        this.message = `You have logged in as ${this.loggedInUser.username}.`;
      } else {
        this.message = "Invalid credentials.";
      }
    });
  }
  tryToRegister(){
    this.api.createUser(this.userToRegister).subscribe();
    this.message = `An account was created for ${this.userToRegister.username}`;
  }

  ngOnInit(): void {
  }

}
