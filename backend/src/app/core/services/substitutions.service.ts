import { Injectable, signal } from '@angular/core';
import { getDatabase, onValue, push, ref, remove, set, update } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class SubstitutionsService {
  db = getDatabase();

  substitutionsRef = ref(this.db, 'substitutions');
  substitutions: any = signal([])

  constructor() {
    onValue(this.substitutionsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        this.substitutions.set([]);
        return;
      }
      this.substitutions.set(
        Object.entries(data).map(([key, el]: [string, any]) => {
          el.key = key;
          return el;
        })
      );
    });
  }

  addSubstitution(substitution: any) {
    const newSubstitutionRef = push(this.substitutionsRef);
    return set(newSubstitutionRef, substitution);
  }

  editSubstitution(substitution: any) {
    const substitutionRef = ref(this.db, `substitutions/${substitution.key}`);
    return update(substitutionRef, substitution);
  }

  deleteSubstitution(substitutionKey: string) {
    const substitutionRef = ref(this.db, `substitutions/${substitutionKey}`);
    return remove(substitutionRef);
  }
}
