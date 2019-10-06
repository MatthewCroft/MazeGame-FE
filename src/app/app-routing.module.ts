import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MazeGameComponent } from './maze-game/maze-game.component';

const routes: Routes = [
  { path: '', component: MazeGameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
