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

  public choosePokemon!: Pokemon;
  public choosePokemon1!: Pokemon;
  public choosePokemon2!: Pokemon;
  public choosePokemon3!: Pokemon;
  public choosePokemon4!: Pokemon;
  http: HttpClient;
  httpService: HttpService;
  selectPokemon: Pokemon[] = [];
  playerPokemon: Pokemon[] = [];
  @Output()
  success: EventEmitter<Array<Pokemon>> = new EventEmitter<Array<Pokemon>>();

  constructor(http: HttpClient, httpService: HttpService) {
    this.http = http;
    this.httpService = httpService;
  }

  public async run() {
    // these three aren't *needed* for the following reason
    var Pokedex = Array<Pokemon>(); // this is used in the populate dex method, (line 76 at the time of writing) which won't be used in the future because this pokedex is only used for the addpokemon method. 
    // in there we should pull a list from our database. when we add it should add to the pokedex table
    var enemyDex = Array<Pokemon>(); //this and player dex can be stored/pulled from the database. and we should pull it every time a fight starts
    var playerDex = Array<Pokemon>();

    var playerHP = Array<number>(10, 10); //this one im unsure if we just make it a part of the user or not
    var gameTicks = 1;
    var round = 1;
    var exitGame: boolean = false; //not needed anymore, we call this method whenever we want to start a game
    // this.populateDex(Pokedex);

    do {
      this.startGame();
      round = 1;
      do {
        this.startRound(playerDex, enemyDex);
      } while (playerHP[0] > 0 && playerHP[1] > 0); //figure out if we add an hp to the user or not maybe have to chagne start round to return a value and make a switch here
    } while (!exitGame); //this do while see exit game on line 22

  } // end run method

  public startGame() {
    let playerHP = Array<number>(10, 10); //resets hp to 10, again, do we add hp t user and have it be set here
    let playerDex = Array<Pokemon>(); //see 16
    let enemyDex = Array<Pokemon>(); //see 16
  } // end startGame method

  public startRound(Attacker: Array<Pokemon>, Defender: Array<Pokemon>) {
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

      // switch(startFight(aPokemon, dPokemon))
      {

      }
    }
  } // end startRound method

  public startFight(Attacker: Pokemon, Defender: Pokemon): number {
    let turn = 1;
    let result = 0;
    let aDamageBonus = this.damageBonus(Attacker, Defender);
    let dDamageBonus = this.damageBonus(Attacker, Defender);
    // let aHP = parseFloat(Attacker.hp);
    return 5;
  }


  public damageBonus(Attacker: Pokemon, Defender: Pokemon): number {
    let bonus = 0;
    switch (Attacker.type) {
      case "normal":
        if (Defender.type == "rock") { bonus = -1; }
        if (Defender.type == "ghost") { bonus = -5; }
        if (Defender.type == "steel") { bonus = -1; }
        break;
      case "fire":
        if (Defender.type == "fire") { bonus = -1; }
        if (Defender.type == "water") { bonus = -1; }
        if (Defender.type == "grass") { bonus = 1; }
        if (Defender.type == "ice") { bonus = 1; }
        if (Defender.type == "bug") { bonus = 1; }
        if (Defender.type == "rock") { bonus = -1; }
        if (Defender.type == "dragon") { bonus = -1; }
        if (Defender.type == "steel") { bonus = 1; }
        break;
      case "water":
        if (Defender.type == "fire") { bonus = 1; }
        if (Defender.type == "water") { bonus = -1; }
        if (Defender.type == "grass") { bonus = -1; }
        if (Defender.type == "ground") { bonus = 1; }
        if (Defender.type == "rock") { bonus = 1; }
        if (Defender.type == "dragon") { bonus = -1; }
        break;
      case "electric":
        if (Defender.type == "water") { bonus = 1; }
        if (Defender.type == "electric") { bonus = -1; }
        if (Defender.type == "grass") { bonus = -1; }
        if (Defender.type == "ground") { bonus = -5; }
        if (Defender.type == "flying") { bonus = 1; }
        if (Defender.type == "dragon") { bonus = -1; }
        break;
      case "grass":
        if (Defender.type == "fire") { bonus = -1; }
        if (Defender.type == "water") { bonus = 1; }
        if (Defender.type == "grass") { bonus = -1; }
        if (Defender.type == "poison") { bonus = -1; }
        if (Defender.type == "ground") { bonus = 1; }
        if (Defender.type == "flying") { bonus = -1; }
        if (Defender.type == "bug") { bonus = -1; }
        if (Defender.type == "rock") { bonus = 1; }
        if (Defender.type == "dragon") { bonus = -1; }
        if (Defender.type == "steel") { bonus = -1; }
        break;
      case "ice":
        if (Defender.type == "fire") { bonus = -1; }
        if (Defender.type == "water") { bonus = -1; }
        if (Defender.type == "grass") { bonus = 1; }
        if (Defender.type == "ice") { bonus = -1; }
        if (Defender.type == "ground") { bonus = 1; }
        if (Defender.type == "flying") { bonus = 1; }
        if (Defender.type == "dragon") { bonus = 1; }
        if (Defender.type == "normal") { bonus = -1; }
        break;
      case "fighting":
        if (Defender.type == "normal") { bonus = 1; }
        if (Defender.type == "ice") { bonus = 1; }
        if (Defender.type == "poison") { bonus = -1; }
        if (Defender.type == "flying") { bonus = -1; }
        if (Defender.type == "psychic") { bonus = -1; }
        if (Defender.type == "bug") { bonus = -1; }
        if (Defender.type == "rock") { bonus = 1; }
        if (Defender.type == "ghost") { bonus = -5; }
        if (Defender.type == "dark") { bonus = 1; }
        if (Defender.type == "steel") { bonus = 1; }
        if (Defender.type == "fairy") { bonus = -1; }
        break;
      case "poison":
        if (Defender.type == "grass") { bonus = 1; }
        if (Defender.type == "poison") { bonus = -1; }
        if (Defender.type == "ground") { bonus = -1; }
        if (Defender.type == "rock") { bonus = -1; }
        if (Defender.type == "ghost") { bonus = -1; }
        if (Defender.type == "steel") { bonus = -5; }
        if (Defender.type == "fairy") { bonus = 1; }
        break;
      case "ground":
        if (Defender.type == "fire") { bonus = 1; }
        if (Defender.type == "electric") { bonus = 1; }
        if (Defender.type == "grass") { bonus = -1; }
        if (Defender.type == "poison") { bonus = 1; }
        if (Defender.type == "flying") { bonus = -5; }
        if (Defender.type == "bug") { bonus = -1; }
        if (Defender.type == "rock") { bonus = 1; }
        if (Defender.type == "steel") { bonus = 1; }
        break;
      case "flying":
        if (Defender.type == "electric") { bonus = -1; }
        if (Defender.type == "grass") { bonus = 1; }
        if (Defender.type == "fighting") { bonus = 1; }
        if (Defender.type == "bug") { bonus = 1; }
        if (Defender.type == "rock") { bonus = -1; }
        if (Defender.type == "steel") { bonus = -1; }
        break;
      case "psychic":
        if (Defender.type == "fighting") { bonus = 1; }
        if (Defender.type == "poison") { bonus = 1; }
        if (Defender.type == "psychic") { bonus = -1; }
        if (Defender.type == "dark") { bonus = -5; }
        if (Defender.type == "steel") { bonus = -1; }
        break;
      case "bug":
        if (Defender.type == "fire") { bonus = -1; }
        if (Defender.type == "grass") { bonus = 1; }
        if (Defender.type == "fighting") { bonus = -1; }
        if (Defender.type == "poison") { bonus = -1; }
        if (Defender.type == "flying") { bonus = -1; }
        if (Defender.type == "psychic") { bonus = 1; }
        if (Defender.type == "ghost") { bonus = -1; }
        if (Defender.type == "dark") { bonus = 1; }
        if (Defender.type == "normal") { bonus = -1; }
        if (Defender.type == "steel") { bonus = -1; }
        break;
      case "rock":
        if (Defender.type == "fire") { bonus = 1; }
        if (Defender.type == "ice") { bonus = 1; }
        if (Defender.type == "fighting") { bonus = -1; }
        if (Defender.type == "ground") { bonus = -1; }
        if (Defender.type == "flying") { bonus = 1; }
        if (Defender.type == "bug") { bonus = 1; }
        if (Defender.type == "steel") { bonus = -1; }
        break;
      case "ghost":
        if (Defender.type == "normal") { bonus = -5; }
        if (Defender.type == "psychic") { bonus = 1; }
        if (Defender.type == "ghost") { bonus = 1; }
        if (Defender.type == "dark") { bonus = -1; }
        break;
      case "dragon":
        if (Defender.type == "dragon") { bonus = 1; }
        if (Defender.type == "steel") { bonus = -1; }
        if (Defender.type == "fairy") { bonus = -5; }
        break;
      case "dark":
        if (Defender.type == "fighting") { bonus = -1; }
        if (Defender.type == "psychic") { bonus = 1; }
        if (Defender.type == "ghost") { bonus = 1; }
        if (Defender.type == "dark") { bonus = -1; }
        if (Defender.type == "fairy") { bonus = -1; }
        break;
      case "steel":
        if (Defender.type == "fire") { bonus = -1; }
        if (Defender.type == "water") { bonus = -1; }
        if (Defender.type == "electric") { bonus = -1; }
        if (Defender.type == "ice") { bonus = 1; }
        if (Defender.type == "rock") { bonus = 1; }
        if (Defender.type == "steel") { bonus = -1; }
        if (Defender.type == "fairy") { bonus = 1; }
        break;
      case "fairy":
        if (Defender.type == "fire") { bonus = -1; }
        if (Defender.type == "fighting") { bonus = 1; }
        if (Defender.type == "poison") { bonus = -1; }
        if (Defender.type == "dragon") { bonus = 1; }
        if (Defender.type == "dark") { bonus = 1; }
        if (Defender.type == "steel") { bonus = -1; }
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
      this.httpService.getRandomPokemon().subscribe(res => { this.choosePokemon = res });
      this.httpService.getRandomPokemon().subscribe(res => { this.choosePokemon1 = res });
      this.httpService.getRandomPokemon().subscribe(res => { this.choosePokemon2 = res });
      this.httpService.getRandomPokemon().subscribe(res => { this.choosePokemon3 = res });
      this.httpService.getRandomPokemon().subscribe(res => { this.choosePokemon4 = res });
  }

  public addPokemon(pokemon: Pokemon) {
    console.log(pokemon);
    this.playerPokemon.push(pokemon);
    
    //make it pull random pokemon and put in enemydex too


    // this.httpService.getRandomPokemon().subscribe(res => { this.choosePokemon = res });
    
    


    // yo what if we made a different method that pulls just pulls a random pokemon from the list and then for adding it we can just push that pokemon by it's id
    //since we're gonna have 5 buttons tied to each one
    //we make a new method in the the back end that pulls all pokemon from db and returns a random one. mkay imma make that and give it a shot

    // go ahead and try that, i'm a bit too far into what i'm doing at the moment to switch before i figure this out at least.

    // ^^^ WIP brandon lookin through for it

    //this ones fucked
    // pull all pokemon from database and store as list
    // select 5 at random
    // display in the boxes on the webpage, take user input

    // let max = allPokemon.length; //set this to the list's length
    // Math.floor(Math.random() * max) + 1; //returns number between 0 and max
    // var pokeSelection = new []{
    //   new option1: <Pokemon> = allPokemon[Math.floor(Math.random() * max) + 1],
    //   new Pokemon = allPokemon[Math.floor(Math.random() * max) + 1],
    //   new Pokemon = allPokemon[Math.floor(Math.random() * max) + 1],
    //   new Pokemon = allPokemon[Math.floor(Math.random() * max) + 1],
    //   new Pokemon = allPokemon[Math.floor(Math.random() * max) + 1]
    // }
    //parse input here
    // push to database under user id
    // push one to cpu id at random froom list rather than 5 choices
    // have cpu id be like either 0 or 100+
  }

  public shuffle(arrayToShuffle: Array<Pokemon>): any {
    let currentIndex = arrayToShuffle.length, randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arrayToShuffle[currentIndex], arrayToShuffle[randomIndex]] = [
        arrayToShuffle[randomIndex], arrayToShuffle[currentIndex]];
    }
    return arrayToShuffle;
  } // end shuffle method


  ngOnInit()
  { 
    this.getPokemon();
  }
}
