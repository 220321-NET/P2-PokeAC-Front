import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  displayLeaderBoard: boolean = true;
  constructor() { }

  leaderboardSlot = {
    name: '',
    wins: 0,
    losses: 0,
    matches: 0
  }
  leaderboard: leaderboardSlot[] = [];

  ngOnInit(): void {
  }

}
