import { Injectable, signal } from '@angular/core';
import { getDatabase, onValue, push, ref, remove, set, update } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  db = getDatabase();
  
  goalsRef = ref(this.db, 'goals');
  goals: any = signal([])

  constructor() {
    onValue(this.goalsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        this.goals.set([]);
        return;
      }
      this.goals.set(
        Object.entries(data).map(([key, el]: [string, any]) => {
          el.key = key;
          return el;
        })
      );
      console.log(this.goals())
    });
  }

  addGoal(goal: any) {
    const newGoalRef = push(this.goalsRef);
    return set(newGoalRef, goal);
  }

  editGoal(goal: any) {
    const goalRef = ref(this.db, `goals/${goal.key}`);
    return update(goalRef, goal);
  }

  deleteGoal(goalKey: string) {
    const goalRef = ref(this.db, `goals/${goalKey}`);
    return remove(goalRef);
  }
}
