import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { lbSlot } from '../Models/lbSlot';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  http:HttpClient;
  httpService:HttpService;
  leaderboard: lbSlot[] = [];
  showleaderboard: boolean = false;

  @Output() notify = new EventEmitter<lbSlot[]>();

  // actually unsure if this is the right way of doing this
  passLB2GameBoard(){
    this.notify.emit(this.leaderboard);
  } 

  constructor(http:HttpClient, httpService:HttpService) { 
    this.http = http;
    this.httpService = httpService;
  }

  public activateLeaderboard()
  {
    this.httpService.getLeaderboardWinRate().subscribe((res) =>{
      this.leaderboard = [];
      for(let x in res)
        {
          this.leaderboard.push(res[x]);
        }
      })
    }

  ngOnInit(): void {
    this.activateLeaderboard();
  }

}
