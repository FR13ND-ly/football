import { Component, inject } from '@angular/core';
import { CardsService } from '../../core/services/cards.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  cardsService = inject(CardsService)
}
