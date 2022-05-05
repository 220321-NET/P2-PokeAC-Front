import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
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
  displayLoggedIn: boolean = false;
  message: string = "Login if you have an accout or register if you want to join.";
  userToLogin: User = {
    id: 0,
    username: '',
    password: '',
    matches: 0,
    wins: 0,
    losses: 0
  }
  userToRegister: User = {
    id: 0,
    username: '',
    password: '',
    matches: 0,
    wins: 0,
    losses: 0
  }
  userToCheck: User = {
    id: 0,
    username: '',
    password: '',
    matches: 0,
    wins: 0,
    losses: 0
  }
  loggedInUser: User = {
    id: 0,
    username: '',
    password: '',
    matches: 0,
    wins: 0,
    losses: 0
  }
  @Output() notify = new EventEmitter<User>();

  constructor(private api : HttpService, private router: Router) { }

  passUserToGameBoard() {
    this.notify.emit(this.loggedInUser);
  }
  goToLogout(){
    this.displayLoginOrRegister = false;
    this.displayRegister = false;
  }
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
    this.displayLoggedIn = false;
    this.message = "Login if you have an accout or register if you want to join.";
  }
  goToLoggedIn(){
    this.message = `You are playing as ${this.loggedInUser.username}.`;
    this.displayLoginOrRegister = false;
    this.displayLogin = false;
    this.displayRegister = false;
    this.displayLoggedIn = true;
  }
  logout(){
    this.loggedInUser = {
      id: 0,
      username: '',
      password: '',
      matches: 0,
      wins: 0,
      losses: 0
    }
    this.api.getUserByUsername("Guest").subscribe(res => {
      this.loggedInUser = res;
      this.notify.emit(this.loggedInUser);
    });
    this.clearFields();
    this.goToLoginOrRegister();
  }
  
  tryToLogin(){
    this.api.getUserByUsername(this.userToLogin.username).subscribe(res => {
      this.userToCheck = res;
      if(!this.userToCheck) {
        this.message = `There is no account for ${this.userToLogin.username}. You can go back and register.`;
        this.clearFields();
      }
      if(this.userToCheck.username == this.userToLogin.username && this.userToCheck.password == this.userToLogin.password ) {
        this.loggedInUser = this.userToCheck;
        this.notify.emit(this.loggedInUser);
        this.goToLoggedIn();
      } else {
        this.message = "Invalid credentials.";
        this.clearFields();
      }
    });
  }
  tryToRegister(){
    // do an if statement calling to the api in checking if username is aleady taken
    /*
    this.api.usernameTaken(this.userToRegister.username).subscribe(res => {
      this.message = res.toString();
    })
    */
    
    this.api.usernameTaken(this.userToRegister.username).subscribe(res => {     
      if(res === true) {
      this.message = `The username ${this.userToRegister.username} is taken.`;
      this.clearFields();
      } else {
        this.api.createUser(this.userToRegister).subscribe();
        this.message = `An account was created for ${this.userToRegister.username}`;
        this.clearFields();
      }
    });
    
  }
  clearFields(){
    this.userToLogin.username = "";
    this.userToLogin.password = "";
    this.userToCheck.username = "";
    this.userToCheck.password = "";
    this.userToRegister.username = "";
    this.userToRegister.password = "";
  }

  ngOnInit(): void {
    
  }

}
