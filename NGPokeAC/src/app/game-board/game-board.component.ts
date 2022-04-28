// import { Component, OnInit, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
// import { Pokemon } from '../Models/Pokemon';

// @Component({
//   selector: 'app-game-board',
//   templateUrl: './game-board.component.html',
//   styleUrls: ['./game-board.component.css']
// })

// export class GameBoardComponent implements OnInit {

//   public run()
//   {
//     var Pokedex = Array<Pokemon>();
//     var enemyDex = Array<Pokemon>();
//     var playerHP = Array<number>(10, 10);
//     var gameTicks = 1;
//     var round = 1;
//     var exitGame: boolean = false;
//     this.populateDex(Pokedex);

//     do
//     {
//       this.startGame();
//       round = 1;
//         do
//         {
//           this.startRound(playerDex, enemyDex);
//         } while(playerHP[0] > 0 && playerHP[1] > 0);
//     } while(!exitGame);

//   } // end run method

//   public startGame()
//   {
//     let playerHP = Array<number>(10, 10);
//     let playerDex = Array<Pokemon>();
//     let enemyDex = Array<Pokemon>();
//   } // end startGame method

//   public startRound(Attacker: Array<Pokemon>, Defender: Array<Pokemon>)
//   {
//     let w = 0;
//     let l = 0;
//     let t = 0;

//     let aDex = Attacker;
//     let dDex = Defender;
//     this.shuffle(aDex);
//     this.shuffle(dDex);

//     for(let x = 0; x < Attacker.length; x++)
//     {
//       let aPokemon = aDex[x];
//       let dPokemon = dDex[x];

//       // switch(startFight(aPokemon, dPokemon))
//       {

//       }
//     }
//   } // end startRound method

//   public startFight(Attacker: Pokemon, Defender: Pokemon): number
//   {
//     let turn = 1;
//     let result = 0;
//     let aDamageBonus = this.damageBonus(Attacker, Defender);
//     let dDamageBonus = this.damageBonus(Attacker, Defender);
//     // let aHP = parseFloat(Attacker.hp);
//     return 5;
//   }

//   public populateDex(Pokedex: Array<Pokemon>): any
//   {
//     Pokedex.push(new Pokemon("charmander", "fire"))
//     Pokedex.push(new Pokemon("squirtle", "water"))
//     Pokedex.push(new Pokemon("bulbasaur", "grass"))
//     Pokedex.push(new Pokemon("pikachu", "electric"))
//     Pokedex.push(new Pokemon("eevee", "normal"))
//     Pokedex.push(new Pokemon("ghastly", "ghost"))
//     Pokedex.push(new Pokemon("psyduck", "water"))
//     Pokedex.push(new Pokemon("mawile", "steel"))
//     Pokedex.push(new Pokemon("staryu", "water"))
//     Pokedex.push(new Pokemon("abra", "psychic"))
//     Pokedex.push(new Pokemon("murkrow", "dark"))
//     Pokedex.push(new Pokemon("pidgey", "flying"))
//     Pokedex.push(new Pokemon("diglet", "ground"))
//     Pokedex.push(new Pokemon("onix", "rock"))
//     Pokedex.push(new Pokemon("ekans", "poison"))

//     return Pokedex;
//   } // end populateDex method

//   public damageBonus(Attacker: Pokemon, Defender: Pokemon): number
//   {
//     let bonus = 0;
//     switch(Attacker.type)
//     {
//       case "normal":
//         if (Defender.type == "rock") { bonus = -1; }
//         if (Defender.type == "ghost") { bonus = -5; }
//         if (Defender.type == "steel") { bonus = -1; }
//         break;
//       case "fire":
//         if (Defender.type == "fire") { bonus = -1; }
//         if (Defender.type == "water") { bonus = -1; }
//         if (Defender.type == "grass") { bonus = 1; }
//         if (Defender.type == "ice") { bonus = 1; }
//         if (Defender.type == "bug") { bonus = 1; }
//         if (Defender.type == "rock") { bonus = -1; }
//         if (Defender.type == "dragon") { bonus = -1; }
//         if (Defender.type == "steel") { bonus = 1; }
//         break;
//       case "water":
//         if (Defender.type == "fire") { bonus = 1; }
//         if (Defender.type == "water") { bonus = -1; }
//         if (Defender.type == "grass") { bonus = -1; }
//         if (Defender.type == "ground") { bonus = 1; }
//         if (Defender.type == "rock") { bonus = 1; }
//         if (Defender.type == "dragon") { bonus = -1; }
//         break;
//       case "electric":
//         if (Defender.type == "water") { bonus = 1; }
//         if (Defender.type == "electric") { bonus = -1; }
//         if (Defender.type == "grass") { bonus = -1; }
//         if (Defender.type == "ground") { bonus = -5; }
//         if (Defender.type == "flying") { bonus = 1; }
//         if (Defender.type == "dragon") { bonus = -1; }
//         break;
//       case "grass":
//         if (Defender.type == "fire") { bonus = -1; }
//         if (Defender.type == "water") { bonus = 1; }
//         if (Defender.type == "grass") { bonus = -1; }
//         if (Defender.type == "poison") { bonus = -1; }
//         if (Defender.type == "ground") { bonus = 1; }
//         if (Defender.type == "flying") { bonus = -1; }
//         if (Defender.type == "bug") { bonus = -1; }
//         if (Defender.type == "rock") { bonus = 1; }
//         if (Defender.type == "dragon") { bonus = -1; }
//         if (Defender.type == "steel") { bonus = -1; }
//         break;
//       case "ice":
//         if (Defender.type == "fire") { bonus = -1; }
//         if (Defender.type == "water") { bonus = -1; }
//         if (Defender.type == "grass") { bonus = 1; }
//         if (Defender.type == "ice") { bonus = -1; }
//         if (Defender.type == "ground") { bonus = 1; }
//         if (Defender.type == "flying") { bonus = 1; }
//         if (Defender.type == "dragon") { bonus = 1; }
//         if (Defender.type == "normal") { bonus = -1; }
//         break;
//       case "fighting":
//         if (Defender.type == "normal") { bonus = 1; }
//         if (Defender.type == "ice") { bonus = 1; }
//         if (Defender.type == "poison") { bonus = -1; }
//         if (Defender.type == "flying") { bonus = -1; }
//         if (Defender.type == "psychic") { bonus = -1; }
//         if (Defender.type == "bug") { bonus = -1; }
//         if (Defender.type == "rock") { bonus = 1; }
//         if (Defender.type == "ghost") { bonus = -5; }
//         if (Defender.type == "dark") { bonus = 1; }
//         if (Defender.type == "steel") { bonus = 1; }
//         if (Defender.type == "fairy") { bonus = -1; }
//         break;
//       case "poison":
//         if (Defender.type == "grass") { bonus = 1; }
//         if (Defender.type == "poison") { bonus = -1; }
//         if (Defender.type == "ground") { bonus = -1; }
//         if (Defender.type == "rock") { bonus = -1; }
//         if (Defender.type == "ghost") { bonus = -1; }
//         if (Defender.type == "steel") { bonus = -5; }
//         if (Defender.type == "fairy") { bonus = 1; }
//         break;
//       case "ground":
//         if (Defender.type == "fire") { bonus = 1; }
//         if (Defender.type == "electric") { bonus = 1; }
//         if (Defender.type == "grass") { bonus = -1; }
//         if (Defender.type == "poison") { bonus = 1; }
//         if (Defender.type == "flying") { bonus = -5; }
//         if (Defender.type == "bug") { bonus = -1; }
//         if (Defender.type == "rock") { bonus = 1; }
//         if (Defender.type == "steel") { bonus = 1; }
//         break;
//       case "flying":
//         if (Defender.type == "electric") { bonus = -1; }
//         if (Defender.type == "grass") { bonus = 1; }
//         if (Defender.type == "fighting") { bonus = 1; }
//         if (Defender.type == "bug") { bonus = 1; }
//         if (Defender.type == "rock") { bonus = -1; }
//         if (Defender.type == "steel") { bonus = -1; }
//         break;
//       case "psychic":
//         if (Defender.type == "fighting") { bonus = 1; }
//         if (Defender.type == "poison") { bonus = 1; }
//         if (Defender.type == "psychic") { bonus = -1; }
//         if (Defender.type == "dark") { bonus = -5; }
//         if (Defender.type == "steel") { bonus = -1; }
//         break;
//       case "bug":
//         if (Defender.type == "fire") { bonus = -1; }
//         if (Defender.type == "grass") { bonus = 1; }
//         if (Defender.type == "fighting") { bonus = -1; }
//         if (Defender.type == "poison") { bonus = -1; }
//         if (Defender.type == "flying") { bonus = -1; }
//         if (Defender.type == "psychic") { bonus = 1; }
//         if (Defender.type == "ghost") { bonus = -1; }
//         if (Defender.type == "dark") { bonus = 1; }
//         if (Defender.type == "normal") { bonus = -1; }
//         if (Defender.type == "steel") { bonus = -1; }
//         break;
//       case "rock":
//         if (Defender.type == "fire") { bonus = 1; }
//         if (Defender.type == "ice") { bonus = 1; }
//         if (Defender.type == "fighting") { bonus = -1; }
//         if (Defender.type == "ground") { bonus = -1; }
//         if (Defender.type == "flying") { bonus = 1; }
//         if (Defender.type == "bug") { bonus = 1; }
//         if (Defender.type == "steel") { bonus = -1; }
//         break;
//       case "ghost":
//         if (Defender.type == "normal") { bonus = -5; }
//         if (Defender.type == "psychic") { bonus = 1; }
//         if (Defender.type == "ghost") { bonus = 1; }
//         if (Defender.type == "dark") { bonus = -1; }
//         break;
//       case "dragon":
//         if (Defender.type == "dragon") { bonus = 1; }
//         if (Defender.type == "steel") { bonus = -1; }
//         if (Defender.type == "fairy") { bonus = -5; }
//         break;
//       case "dark":
//         if (Defender.type == "fighting") { bonus = -1; }
//         if (Defender.type == "psychic") { bonus = 1; }
//         if (Defender.type == "ghost") { bonus = 1; }
//         if (Defender.type == "dark") { bonus = -1; }
//         if (Defender.type == "fairy") { bonus = -1; }
//         break;
//       case "steel":
//         if (Defender.type == "fire") { bonus = -1; }
//         if (Defender.type == "water") { bonus = -1; }
//         if (Defender.type == "electric") { bonus = -1; }
//         if (Defender.type == "ice") { bonus = 1; }
//         if (Defender.type == "rock") { bonus = 1; }
//         if (Defender.type == "steel") { bonus = -1; }
//         if (Defender.type == "fairy") { bonus = 1; }
//         break;
//       case "fairy":
//         if (Defender.type == "fire") { bonus = -1; }
//         if (Defender.type == "fighting") { bonus = 1; }
//         if (Defender.type == "poison") { bonus = -1; }
//         if (Defender.type == "dragon") { bonus = 1; }
//         if (Defender.type == "dark") { bonus = 1; }
//         if (Defender.type == "steel") { bonus = -1; }
//         break;
//       default:
//         break;
//     }
//     return bonus;
//   }

//   public shuffle(arrayToShuffle: Array<Pokemon>): any
//   {
//     let currentIndex = arrayToShuffle.length, randomIndex;

//     while (currentIndex != 0)
//     {
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;

//       [arrayToShuffle[currentIndex], arrayToShuffle[randomIndex]] = [
//       arrayToShuffle[randomIndex], arrayToShuffle[currentIndex]];
//     }
//     return arrayToShuffle;
//   } // end shuffle method

  
//   ngOnInit(): void { }
// }
