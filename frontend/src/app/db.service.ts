import { inject, Injectable, signal } from '@angular/core';
import { getDatabase, ref, onValue, update } from "firebase/database";
import { BufferService } from './buffer.service';


@Injectable({
  providedIn: 'root'
})
export class DbService {
  bufferService = inject(BufferService);

  db = getDatabase();

  game = signal(
    {
  "championshipTitle": "Campionatul Raional Criuleni de Fotbal",
  "leftTeamColor": {
    "hands": "#000",
    "shirt": "#fff"
  },
  "leftTeamName": "„Tiraspol” Criuleni",
  "rightTeamColor": {
    "hands": "#fff",
    "shirt": "#fff"
  },
  "rightTeamName": "„Lupii” Cimișeni",
  "scoreLeft": 0,
  "scoreRight": 0,
  "extraTime": 0,
  "time": "00:00",
  "timeRunning": false,
}
  )

  time = signal("00:00");

  fotbalRef = ref(this.db, 'fotbal');

  timeRef = ref(this.db, 'fotbal/time');
  
  cardsRef = ref(this.db, 'cards');
  goalsRef = ref(this.db, 'goals');
  substitutionsRef = ref(this.db, 'substitutions');

  setCardPublished(card: any) {
    card.published = true;
    update(ref(this.db, `cards/${card.key}`), card);
  }

  setGoalPublished(goal: any) {
    goal.published = true;
    update(ref(this.db, `goals/${goal.key}`), goal);
  }

  setSubstitutionPublished(substitution: any) {
    substitution.published = true;
    update(ref(this.db, `substitutions/${substitution.key}`), substitution);
  }


  constructor() {
    onValue(this.timeRef, (snapshot) => {
      const time = snapshot.val();
      this.time.set(time);
    });
    onValue(this.fotbalRef, (snapshot) => {
      const data = snapshot.val();
      this.game.set(data);
    });

    onValue(this.cardsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      Object.keys(data).forEach((key: any) => {
        if (!data[key].published) {
          data[key].key = key;
          data[key].type = 'card';
          this.bufferService.addItem(data[key]);
        }
      });
    });

    onValue(this.goalsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      Object.keys(data).forEach((key: any) => {
        if (!data[key].published) {
          data[key].key = key;
          data[key].type = 'goal';
          this.bufferService.addItem(data[key]);
        }
      });
    });

    onValue(this.substitutionsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      Object.keys(data).forEach((key: any) => {
        if (!data[key].published) {
          data[key].key = key;
          data[key].type = 'substitution';
          this.bufferService.addItem(data[key]);
        }
      });
    });
  }
}
