import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from './Board';
import { Boards } from './Boards';
import { Player } from 'src/Player';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  getBoards(): Observable<Boards> {
    return this.http.get<Boards>("http://localhost:8080/mazes");
  }

  getBoard(id: String): Observable<Board> {
    return this.http.get<Board>("http://localhost:8080/mazes/"+id);
  }

  createBoard(size: number, player: Player): Observable<Board> {
    return this.http.post<Board>("http://localhost:8080/mazes", { size: size, player: player });
  }
}
