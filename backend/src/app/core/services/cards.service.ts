import { Injectable, signal } from '@angular/core';
import { getDatabase, onValue, push, ref, remove, set, update } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  db = getDatabase();

  cardsRef = ref(this.db, 'cards');
  cards: any = signal([])

  constructor() {
    onValue(this.cardsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        this.cards.set([]);
        return;
      }
      this.cards.set(
        Object.entries(data).map(([key, el]: [string, any]) => {
          el.key = key;
          return el;
        })
      );
    });
  }

  addCard(card: any) {
    const newCardRef = push(this.cardsRef);
    return set(newCardRef, card);
  }

  editCard(card: any) {
    const cardRef = ref(this.db, `cards/${card.key}`);
    return update(cardRef, card);
  }

  deleteCard(cardKey: string) {
    const cardRef = ref(this.db, `cards/${cardKey}`);
    return remove(cardRef);
  }
}
