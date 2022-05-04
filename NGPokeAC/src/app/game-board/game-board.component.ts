import { Component, OnInit, EventEmitter, ɵAPP_ID_RANDOM_PROVIDER, Output } from '@angular/core';
import { Pokemon } from '../Models/Pokemon';
import { HttpService } from '../services/http.service';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})

export class GameBoardComponent implements OnInit {

  http: HttpClient;
  httpService: HttpService;
  selectPokemon: Pokemon[] = [];
  enemySelectPokemon: Pokemon[] = [];
  playerPokemon: Pokemon[] = [];
  enemyPokemon: Pokemon[] = [];
  playerHP: number[] = [10, 10];
  gameticks: number = 1;
  round: number = 1;

  @Output()
  success: EventEmitter<Array<Pokemon>> = new EventEmitter<Array<Pokemon>>();

  constructor(http: HttpClient, httpService: HttpService) {
    this.http = http;
    this.httpService = httpService;
  }

  public run() {
    this.startRound(this.playerPokemon, this.enemyPokemon);
  } // end run method

  public startGame() {
    //at the start of the game reset everything to 0
    this.playerHP = [10, 10];
    this.playerPokemon = [];
    this.enemyPokemon = [];
  } // end startGame method

  public startRound(Attacker: Pokemon[], Defender: Pokemon[]) {
    let w = 0;
    let l = 0;
    let t = 0;

    let aDex = Attacker;
    let dDex = Defender;
    this.shuffle(aDex);
    this.shuffle(dDex);

    for (let x = 0; x < Attacker.length; x++) {
      let aPokemon = aDex[x];
      let dPokemon = dDex[x];

      switch (this.startFight(aPokemon, dPokemon)) {
        case -1:
          this.playerHP[0]--;
          console.log("Player Lost");
          l++;
          break;
        case 0:
          t++;
          console.log("Player tied");
          break;
        case 1:
          this.playerHP[1]--;
          console.log("Player won");
          w++;
          break;
        default:
          break;
      }
    }
    //at end of round allow another selection

  } // end startRound method

  public startFight(Attacker: Pokemon, Defender: Pokemon): number {
    let turn = 1;
    let result = 0;
    let aDamageBonus = this.damageBonus(Attacker, Defender);
    let dDamageBonus = this.damageBonus(Defender, Attacker);
    let aHP = Attacker.hp;
    let dHP = Defender.hp;

    while (aHP > 0 && dHP > 0) {
      //while both either are alive keep fighting
      let aDamage = this.damageCalc(Attacker.attack, aDamageBonus, Defender.defense)
      let dDamage = this.damageCalc(Defender.attack, dDamageBonus, Attacker.defense)
      aHP = aHP - dDamage;
      dHP = dHP - aDamage;
      // console.log(dDamage + "dealt to player");
      // console.log(aDamage + "dealt to enemy");
      turn++;
      // console.log(turn + "turn count");
      if (turn > 10) {
        console.log("tied");
        return result;
      }
    }
    if (aHP <= 0) {
      console.log(Attacker.name + "fainted");
      result--;
    }
    if (dHP <= 0) {
      console.log(Defender.name + "fainted");
      result++;
    }
    return result;
  }


  public damageBonus(Attacker: Pokemon, Defender: Pokemon): number {
    let bonus = 0;
    switch (Attacker.type1) {
      case "normal":
        if (Defender.type1 == "rock") { bonus = -1; }
        if (Defender.type1 == "ghost") { bonus = -5; }
        if (Defender.type1 == "steel") { bonus = -1; }
        break;
      case "fire":
        if (Defender.type1 == "fire") { bonus = -1; }
        if (Defender.type1 == "water") { bonus = -1; }
        if (Defender.type1 == "grass") { bonus = 1; }
        if (Defender.type1 == "ice") { bonus = 1; }
        if (Defender.type1 == "bug") { bonus = 1; }
        if (Defender.type1 == "rock") { bonus = -1; }
        if (Defender.type1 == "dragon") { bonus = -1; }
        if (Defender.type1 == "steel") { bonus = 1; }
        break;
      case "water":
        if (Defender.type1 == "fire") { bonus = 1; }
        if (Defender.type1 == "water") { bonus = -1; }
        if (Defender.type1 == "grass") { bonus = -1; }
        if (Defender.type1 == "ground") { bonus = 1; }
        if (Defender.type1 == "rock") { bonus = 1; }
        if (Defender.type1 == "dragon") { bonus = -1; }
        break;
      case "electric":
        if (Defender.type1 == "water") { bonus = 1; }
        if (Defender.type1 == "electric") { bonus = -1; }
        if (Defender.type1 == "grass") { bonus = -1; }
        if (Defender.type1 == "ground") { bonus = -5; }
        if (Defender.type1 == "flying") { bonus = 1; }
        if (Defender.type1 == "dragon") { bonus = -1; }
        break;
      case "grass":
        if (Defender.type1 == "fire") { bonus = -1; }
        if (Defender.type1 == "water") { bonus = 1; }
        if (Defender.type1 == "grass") { bonus = -1; }
        if (Defender.type1 == "poison") { bonus = -1; }
        if (Defender.type1 == "ground") { bonus = 1; }
        if (Defender.type1 == "flying") { bonus = -1; }
        if (Defender.type1 == "bug") { bonus = -1; }
        if (Defender.type1 == "rock") { bonus = 1; }
        if (Defender.type1 == "dragon") { bonus = -1; }
        if (Defender.type1 == "steel") { bonus = -1; }
        break;
      case "ice":
        if (Defender.type1 == "fire") { bonus = -1; }
        if (Defender.type1 == "water") { bonus = -1; }
        if (Defender.type1 == "grass") { bonus = 1; }
        if (Defender.type1 == "ice") { bonus = -1; }
        if (Defender.type1 == "ground") { bonus = 1; }
        if (Defender.type1 == "flying") { bonus = 1; }
        if (Defender.type1 == "dragon") { bonus = 1; }
        if (Defender.type1 == "normal") { bonus = -1; }
        break;
      case "fighting":
        if (Defender.type1 == "normal") { bonus = 1; }
        if (Defender.type1 == "ice") { bonus = 1; }
        if (Defender.type1 == "poison") { bonus = -1; }
        if (Defender.type1 == "flying") { bonus = -1; }
        if (Defender.type1 == "psychic") { bonus = -1; }
        if (Defender.type1 == "bug") { bonus = -1; }
        if (Defender.type1 == "rock") { bonus = 1; }
        if (Defender.type1 == "ghost") { bonus = -5; }
        if (Defender.type1 == "dark") { bonus = 1; }
        if (Defender.type1 == "steel") { bonus = 1; }
        if (Defender.type1 == "fairy") { bonus = -1; }
        break;
      case "poison":
        if (Defender.type1 == "grass") { bonus = 1; }
        if (Defender.type1 == "poison") { bonus = -1; }
        if (Defender.type1 == "ground") { bonus = -1; }
        if (Defender.type1 == "rock") { bonus = -1; }
        if (Defender.type1 == "ghost") { bonus = -1; }
        if (Defender.type1 == "steel") { bonus = -5; }
        if (Defender.type1 == "fairy") { bonus = 1; }
        break;
      case "ground":
        if (Defender.type1 == "fire") { bonus = 1; }
        if (Defender.type1 == "electric") { bonus = 1; }
        if (Defender.type1 == "grass") { bonus = -1; }
        if (Defender.type1 == "poison") { bonus = 1; }
        if (Defender.type1 == "flying") { bonus = -5; }
        if (Defender.type1 == "bug") { bonus = -1; }
        if (Defender.type1 == "rock") { bonus = 1; }
        if (Defender.type1 == "steel") { bonus = 1; }
        break;
      case "flying":
        if (Defender.type1 == "electric") { bonus = -1; }
        if (Defender.type1 == "grass") { bonus = 1; }
        if (Defender.type1 == "fighting") { bonus = 1; }
        if (Defender.type1 == "bug") { bonus = 1; }
        if (Defender.type1 == "rock") { bonus = -1; }
        if (Defender.type1 == "steel") { bonus = -1; }
        break;
      case "psychic":
        if (Defender.type1 == "fighting") { bonus = 1; }
        if (Defender.type1 == "poison") { bonus = 1; }
        if (Defender.type1 == "psychic") { bonus = -1; }
        if (Defender.type1 == "dark") { bonus = -5; }
        if (Defender.type1 == "steel") { bonus = -1; }
        break;
      case "bug":
        if (Defender.type1 == "fire") { bonus = -1; }
        if (Defender.type1 == "grass") { bonus = 1; }
        if (Defender.type1 == "fighting") { bonus = -1; }
        if (Defender.type1 == "poison") { bonus = -1; }
        if (Defender.type1 == "flying") { bonus = -1; }
        if (Defender.type1 == "psychic") { bonus = 1; }
        if (Defender.type1 == "ghost") { bonus = -1; }
        if (Defender.type1 == "dark") { bonus = 1; }
        if (Defender.type1 == "normal") { bonus = -1; }
        if (Defender.type1 == "steel") { bonus = -1; }
        break;
      case "rock":
        if (Defender.type1 == "fire") { bonus = 1; }
        if (Defender.type1 == "ice") { bonus = 1; }
        if (Defender.type1 == "fighting") { bonus = -1; }
        if (Defender.type1 == "ground") { bonus = -1; }
        if (Defender.type1 == "flying") { bonus = 1; }
        if (Defender.type1 == "bug") { bonus = 1; }
        if (Defender.type1 == "steel") { bonus = -1; }
        break;
      case "ghost":
        if (Defender.type1 == "normal") { bonus = -5; }
        if (Defender.type1 == "psychic") { bonus = 1; }
        if (Defender.type1 == "ghost") { bonus = 1; }
        if (Defender.type1 == "dark") { bonus = -1; }
        break;
      case "dragon":
        if (Defender.type1 == "dragon") { bonus = 1; }
        if (Defender.type1 == "steel") { bonus = -1; }
        if (Defender.type1 == "fairy") { bonus = -5; }
        break;
      case "dark":
        if (Defender.type1 == "fighting") { bonus = -1; }
        if (Defender.type1 == "psychic") { bonus = 1; }
        if (Defender.type1 == "ghost") { bonus = 1; }
        if (Defender.type1 == "dark") { bonus = -1; }
        if (Defender.type1 == "fairy") { bonus = -1; }
        break;
      case "steel":
        if (Defender.type1 == "fire") { bonus = -1; }
        if (Defender.type1 == "water") { bonus = -1; }
        if (Defender.type1 == "electric") { bonus = -1; }
        if (Defender.type1 == "ice") { bonus = 1; }
        if (Defender.type1 == "rock") { bonus = 1; }
        if (Defender.type1 == "steel") { bonus = -1; }
        if (Defender.type1 == "fairy") { bonus = 1; }
        break;
      case "fairy":
        if (Defender.type1 == "fire") { bonus = -1; }
        if (Defender.type1 == "fighting") { bonus = 1; }
        if (Defender.type1 == "poison") { bonus = -1; }
        if (Defender.type1 == "dragon") { bonus = 1; }
        if (Defender.type1 == "dark") { bonus = 1; }
        if (Defender.type1 == "steel") { bonus = -1; }
        break;
      default:
        break;
    }
    return bonus;
  }

  public damageCalc(attack: number, bonus: number, defense: number): number {
    let damage = 0;
    switch (bonus) {
      case -1:
        damage = attack * .5;
        break;
      case 0:
        damage = attack * 1;
        break;
      case 1:
        damage = attack * 2;
        break;
      default:
        damage = attack * 0;
        break;
    }
    return damage;
  }

  public getPokemon() {
    const btn = document.getElementById('ShufflePKM') as HTMLButtonElement | null; // to disable the shuffle button
    btn?.setAttribute('disabled', ''); //

    for (let i = 0; i < 5; i++) {
      this.httpService.getRandomPokemon().subscribe(res => { this.enemySelectPokemon[i] = res });
    }
    for (let i = 0; i < 5; i++) {
      if (i <= 3) {
        this.httpService.getRandomPokemon().subscribe(res => { this.selectPokemon[i] = res });

      }
      else if (i >= 4) {
        this.httpService.getRandomPokemon().subscribe(res => { this.selectPokemon[i] = res; btn?.removeAttribute('disabled') });
      }

    }
  }

  public addPokemon(pokemon: Pokemon) {
    this.playerPokemon.push(pokemon);
    this.enemyPokemon.push(this.enemySelectPokemon[Math.floor(Math.random() * 5)]);
    this.startRound(this.playerPokemon, this.enemyPokemon);


    //need too add ^^ and also make it so the selection option disappears til round ends

    // push to database under user id
    // push to db under id 1 for cpu
    // have cpu id be like either 0 or 100+
  }

  public shuffle(arrayToShuffle: Array<Pokemon>): any {
    //c
    let currentIndex = arrayToShuffle.length, randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arrayToShuffle[currentIndex], arrayToShuffle[randomIndex]] = [
        arrayToShuffle[randomIndex], arrayToShuffle[currentIndex]];
    }
    return arrayToShuffle;
  } // end shuffle method

  public clearDex() {
    this.playerPokemon = [];
    this.enemyPokemon = [];
  }

  ngOnInit() {
    this.getPokemon();
  }
}