import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
<<<<<<< Updated upstream
import { LoginComponent } from './login/login.component';
=======
import { PKMBEINFOComponent } from './pkm-be-info/pkm-be-info.component';
>>>>>>> Stashed changes


@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
<<<<<<< Updated upstream
    LoginComponent,

=======
    PKMBEINFOComponent
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
