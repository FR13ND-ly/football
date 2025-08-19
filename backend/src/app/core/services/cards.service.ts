import { Injectable, signal } from '@angular/core';
import { getDatabase, onValue, ref } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  db = getDatabase();

  cardsRef = ref(this.db, 'cards');
  cards = signal([])

  constructor() {
    onValue(this.cardsRef, (snapshot) => {
      this.cards.set(
        snapshot.val().map((el: any, index: number) => {
          el.index = index;
          return el;
        })
      )
    });
  }

}
