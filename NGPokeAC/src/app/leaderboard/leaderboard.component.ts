import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { lbSlot } from '../Models/lbSlot';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  http: HttpClient;
  httpService: HttpService;
  displayLeaderBoard: boolean = true;
  leaderboard: lbSlot[] = [];
  s: lbSlot = {id:0, username:"", password: "", matches:0, wins:0, losses:0};

  constructor(http: HttpClient, httpService: HttpService) {
    this.http = http;
    this.httpService = httpService;
  }
    
    HideLeaderBoard(){
      this.leaderboard = [];
      this.displayLeaderBoard = false;
    }
    public showLeaderboard()
    {
      this.displayLeaderBoard = true;
      this.httpService.getLeaderboard().subscribe((res) =>{
        this.leaderboard.push(res);
        console.log(res);
      })
    }

  ngOnInit(): void {
  }

}
