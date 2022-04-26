import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../Models/Pokemon';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  constructor() { }

  gameTicks: number = 1
  round: number = 1

  // implement later when i figure out how to get models into tscript
  // let Pokedex: Pokemon[] = new Array();
  // let playerDex: Pokemon[] = new Array();
  // let enemyDex: Pokemon[] = new Array();




  ngOnInit(): void {
  }

}
