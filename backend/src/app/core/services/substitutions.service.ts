import { Injectable, signal } from '@angular/core';
import { getDatabase, onValue, ref } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class SubstitutionsService {
  db = getDatabase();

  substitutionsRef = ref(this.db, 'substitutions');
  substitutions = signal([])

  constructor() {
    onValue(this.substitutionsRef, (snapshot) => {
      this.substitutions.set(
        snapshot.val().map((el: any, index: number) => {
          el.index = index;
          return el;
        })
      )
    });
  }
}
