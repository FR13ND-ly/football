import { Component, computed, inject } from '@angular/core';
import { DbService } from '../../core/services/db.service';
import { GoalsService } from '../../core/services/goals.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddGoalDialogComponent } from './add-goal-dialog/add-goal-dialog.component';
import { ShirtComponent } from '../../core/ui/shirt/shirt.component';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [FormsModule, ShirtComponent],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.scss'
})
export class GoalsComponent {
  db = inject(DbService)
  goalsService = inject(GoalsService)
  fb = new FormBuilder();

  dialog = inject(MatDialog);

  game = this.db.game
  goals: any = this.goalsService.goals

  goalsLeft = computed(() => this.goals().filter((goal: any) => goal.team === 'left'));
  goalsRight = computed(() => this.goals().filter((goal: any) => goal.team === 'right'));


  onAddGoal(team: string) {
    let d = this.dialog.open(AddGoalDialogComponent)
    d.afterClosed().subscribe(result => {
      let data = {
        playerName: result?.playerName,
        playerNumber: result?.playerNumber,
        team: team
      }
      if (result) {
        this.goalsService.addGoal(data)
        if (team === 'left') {
          let x = {
            ...this.game(),
            scoreLeft: this.game().scoreLeft + 1
          }
          this.db.updateGame({
            ...this.game(),
            scoreLeft: this.game().scoreLeft + 1
          })
        }
        else {
          this.db.updateGame({
            ...this.game(),
            scoreRight: this.game().scoreRight + 1
          })
        }
      }
    });
  }

  onEditGoal(goal: any) {
    this.goalsService.editGoal(goal)
  }

  onDeleteGoal(goal: any) {
    this.goalsService.deleteGoal(goal.key)
  }
}
