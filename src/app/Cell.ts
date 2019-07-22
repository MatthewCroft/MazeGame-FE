import { Player } from 'src/Player';

export class Cell {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    isLast: boolean;
    players: Player [];
}