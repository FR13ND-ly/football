import { Injectable, signal } from '@angular/core';
import { get, getDatabase, onValue, push, ref, set } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  db = getDatabase();

  teamsRef = ref(this.db, 'teams');
  teams: any = signal([])
  players: any = signal([]);

  constructor() {
    onValue(this.teamsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        this.teams.set([]);
        return;
      }
      this.teams.set(
        Object.entries(data).map(([key, el]: [string, any]) => {
          el.key = key;
          return el;
        })
      );
    });
  }


  getPlayers(teamKey: string) {
    get(ref(this.db, `teams/${teamKey}/players`)).then((snapshot) => {
      const data = snapshot.val();
      if (!data) {
        this.players.set([]);
        return;
      }

      this.players.set(
        Object.entries(data).map(([key, el]: [string, any]) => {
          el.key = key;
          return el;
        }).sort((a: any, b: any) => a.matchNumber - b.matchNumber)
      );
    });
    return this.players;
  }


  addTeam(team: any) {
    const newTeamRef = push(this.teamsRef);
    set(newTeamRef, team);
  }

  editTeam(team: any) {
    const teamRef = ref(this.db, `teams/${team.key}`);
    set(teamRef, team);
  }

  deleteTeam(teamKey: string) {
    const teamRef = ref(this.db, `teams/${teamKey}`);
    set(teamRef, null);
  }

  addPlayer(teamKey: string, player: any) {
    const playersRef = ref(this.db, `teams/${teamKey}/players`);
    const newPlayerRef = push(playersRef);
    set(newPlayerRef, player);
  }

  editPlayer(teamKey: string, player: any) {
    const playerRef = ref(this.db, `teams/${teamKey}/players/${player.key}`);
    set(playerRef, player);
  }

  deletePlayer(teamKey: string, playerKey: string) {
    const playerRef = ref(this.db, `teams/${teamKey}/players/${playerKey}`);
    set(playerRef, null);
  }

  getTeamKeyByName(name: string): string | undefined {
    this.teams().forEach((element: any) => {
      console.log(element.name, name);
    });
    const team = this.teams().find((t: any) => t.name == name);
    return team ? team.key : undefined;
  }
}
