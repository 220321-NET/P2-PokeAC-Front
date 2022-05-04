import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../Models/Pokemon';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  http: HttpClient;

  constructor(http: HttpClient)
  {
    this.http = http;
  }
  getUserByUsername(usernameToTry: string): Observable<User>{
    return this.http.get<User>(`https://pokemonautochess.azurewebsites.net/api/Pokemon/GetUserByUsername/${usernameToTry}`);
  }
  createUser(p: Partial<User>): Observable<any> {
    return this.http.post('https://pokemonautochess.azurewebsites.net/api/Pokemon/CreateUser', p);
  }
  /*
  createUser(user: User): Observable<User> {
    let stringifiedUser: string = JSON.stringify(user);
    return this.http.post('https://pokemonautochess.azurewebsites.net/api/Pokemon/CreateUser/{stringifiedUser}', user);
  }
  */
  getRandomPokemon(): Observable<Pokemon> {
    return this.http.get<Pokemon>('https://pokemonautochess.azurewebsites.net/api/Pokemon/GetRandomPokemon');
  } 
}
