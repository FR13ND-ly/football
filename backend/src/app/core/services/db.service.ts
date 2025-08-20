import { inject, Injectable, signal } from '@angular/core';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { AppComponent } from '../../app.component';
import { FormBuilder, RequiredValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  fb = new FormBuilder();
  db = getDatabase();

  gameRef = ref(this.db, 'fotbal');
  game = signal({
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
  });

  gameForm = this.fb.group({
    championshipTitle: [''],
    leftTeamName: [''],
    leftTeamColor: this.fb.group({
      hands: [''],
      shirt: ['']
    }),
    rightTeamName: [''],
    rightTeamColor: this.fb.group({
      hands: [''],
      shirt: ['']
    }),
    extraTime: [0],
    scoreLeft: [0],
    scoreRight: [0],
    time: ['00:00'],
    timeRunning: [false]
  });


  constructor() {
    onValue(this.gameRef, (snapshot) => {
      this.gameForm.patchValue(snapshot.val());
      this.game.set(snapshot.val())
    });
  }

  updateGame(data: any) {
    set(ref(this.db, 'fotbal'), data);
  }
}
