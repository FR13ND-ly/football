import { Component, computed, inject } from '@angular/core';
import { CardsService } from '../../core/services/cards.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCardDialogComponent } from './add-card-dialog/add-card-dialog.component';
import { DbService } from '../../core/services/db.service';
import { ShirtComponent } from '../../core/ui/shirt/shirt.component';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { CdkAriaLive } from "../../../../node_modules/@angular/cdk/a11y/index";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [ShirtComponent, FormsModule, NgClass],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  cardsService = inject(CardsService)
  dbService = inject(DbService)
  dialog = inject(MatDialog)

  cards = this.cardsService.cards;
  game = this.dbService.game;

  leftTeamCards = computed(() => this.cards().filter((card: any) => card.team === 'left'));
  rightTeamCards = computed(() => this.cards().filter((card: any) => card.team === 'right'));


  onAddCard(team: string) {
    const dialogRef = this.dialog.open(AddCardDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      let data = {
        playerName: result?.playerName,
        playerNumber: result?.playerNumber,
        cardType: result?.cardType,
        team
      };  
      if (result) {
        this.cardsService.addCard(data);
      }
    });
  }

  onEditCard(card: any) {
    this.cardsService.editCard(card);
  }

  onDeleteCard(card: any) {
    this.cardsService.deleteCard(card.key);
  }
}
