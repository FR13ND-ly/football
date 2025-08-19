import { Component, inject } from '@angular/core';
import { DbService } from '../../core/services/db.service';
import { GoalsService } from '../../core/services/goals.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
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
  goals = this.goalsService.goals


  onAddGoal(team: string) {
    let d = this.dialog.open(AddGoalDialogComponent, { data: team })
  }

  onEditGoal(goal: any) {
    this.goalsService.editGoal(goal)
  }

  onDeleteGoal(goal: any) {
    this.goalsService.deleteGoal(goal.key)
  }
}
