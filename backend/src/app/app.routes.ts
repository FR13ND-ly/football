import { Routes } from '@angular/router';
import { InfoComponent } from './pages/info/info.component';
import { CardsComponent } from './pages/cards/cards.component';
import { GoalsComponent } from './pages/goals/goals.component';
import { SubstitutionsComponent } from './pages/substitutions/substitutions.component';
import { TeamsComponent } from './pages/teams/teams.component';

export const routes: Routes = [
    { path: '', component: InfoComponent },
    { path: 'cards', component: CardsComponent },
    { path: 'goals', component: GoalsComponent },
    { path: 'substitutions', component: SubstitutionsComponent },
    { path: 'teams', component: TeamsComponent }
];
