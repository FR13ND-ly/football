import { Injectable, signal } from '@angular/core';
import { getDatabase, ref, onValue } from "firebase/database";


@Injectable({
  providedIn: 'root'
})
export class DbService {

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
  "time": "00:00",
  "timeRunning": false,
}
  )

  time = signal("00:00");

  fotbalRef = ref(this.db, 'fotbal');

  timeRef = ref(this.db, 'fotbal/time');

  constructor() {
    onValue(this.timeRef, (snapshot) => {
      const time = snapshot.val();
      this.time.set(time);
    });
    onValue(this.fotbalRef, (snapshot) => {
      const data = snapshot.val();
      this.game.set(data);
    });
  }
}
