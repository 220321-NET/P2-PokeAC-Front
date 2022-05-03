import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { NgForm } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  displayLoginOrRegister: boolean = true;
  displayLogin: boolean = false;
  displayRegister: boolean = false; //
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
  stringifiedUserToRegister: any;

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
    this.api.createUser(this.userToRegister).subscribe((res) => {
      this.router.navigate([''])
    });
    
  }

  ngOnInit(): void {
  }

}
