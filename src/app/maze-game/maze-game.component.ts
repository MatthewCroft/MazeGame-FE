import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Boards } from '../Boards';
import { BoardService } from '../board.service';
import { Sides } from '../Sides';
import { Board } from '../Board';
import { Player } from 'src/Player';
import { Cell } from '../Cell';

@Component({
  selector: 'app-maze-game',
  templateUrl: './maze-game.component.html',
  styleUrls: ['./maze-game.component.css']
})
export class MazeGameComponent implements OnInit {

  uuid: number;
  boards: Boards;
  board: Board;
  player: Player;

  constructor(private playerService: PlayerService,
    private boardService: BoardService) { }

  getUserId() {
    this.uuid = Math.random() * 1000;
    this.startGame(this.uuid);
  }

  //Stole this from the internet
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  startGame(uuid: number) {
    var color = this.getRandomColor();
    this.playerService.createPlayer(uuid, color)
    .subscribe(player => {
      this.player = player;
      this.getBoards();
    });
  }

  firstGame(boards: Boards) {
    this.board = boards.boardList[0];
  }

  getBoards() {
    this.boardService.getBoards()
      .subscribe(boards =>  {
        this.boards = boards;
        this.firstGame(this.boards);
      });
  }

  move(player: Player, board: Board, side: Sides) {
    console.log(player);
    console.log(board);
    console.log(side);
    this.playerService.move(player, board, side)
    .subscribe(board => this.board = board);
  }

  //make call to server for next game
  nextGame(id: number) {
     var index = this.boards.boardList.findIndex(board => board.id == id);
  
     this.playerService.nextGame(this.player, index)
     .subscribe(board => this.board = board);
  }

  createNewBoard(size: number, player: Player) {
    this.boardService.createBoard(size, player)
    .subscribe(board => this.board = board);
  }

  //send request to the server moving this player to the next game
  getNextBoard(index: number) {
    this.board = this.boards.boardList[index];
  }

  ngOnInit() {
    this.getUserId();
  }

}
