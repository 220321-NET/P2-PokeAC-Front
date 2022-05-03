import { Component, OnInit } from '@angular/core';
import { IPokemon } from '../Models/Ipkm';

@Component({
  selector: 'app-pkm-be-info',
  templateUrl: './pkm-be-info.component.html',
  styleUrls: ['./pkm-be-info.component.css']
})
export class PKMBEINFOComponent implements OnInit {
  //example : string = "";
  //example2 : IPokemon = {};
  myJSON : string = "";
  pkm : IPokemon = {name: "Crabby",id: 123,type: "Water",attack: 12,defense: 12,hp: 100};
  
  constructor() { }

  ngOnInit(): void {
    // this.example = "Bulbasaur";
    // this.example2.name = "Crabby";
    // this.example2.type = "Water";
    // this.example2.attack = 999;
    // this.example2.defense = 1;
    // this.example2.hp = 1;
    // this.example2.id = 123;
    
    /*this.myJSON = JSON.stringify(this.pkm.name); THIS IS ONE OPTION IF YOU WANT TO HAVE IT PAINFULLY DONE
    this.myJSON = this.myJSON.slice(1, this.myJSON.length-1); OTHER OPTION IS TO SIMPLY OUTPUT THE PROPERTY TO THE HTML*/

  }
  
}
