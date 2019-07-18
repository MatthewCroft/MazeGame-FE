import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http' 
import { Player } from 'src/Player';
import { Board } from './Board';
import { Sides } from './Sides';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  createPlayer(id: number, color: String): Observable<Player> {
    var player =  { id: id, color: color };

    return this.http.post<Player>("http://localhost:8080/players", player);
  }

  move(player: Player, board: Board, sides: Sides): Observable<Board> {
    return this.http.put<Board>("http://localhost:8080/players", {player: player, board: board, sides: sides});
  }

  nextGame(player: Player, boardIndex: number): Observable<Board> {
    return this.http.put<Board>("http://localhost:8080/players/nextgame", { player: player, boardIndex: boardIndex });
  }

}
