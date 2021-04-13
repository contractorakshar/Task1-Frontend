import { DashboardComponent } from './dashboard/dashboard.component';
import { EscalateComponent } from './escalate/escalate.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewsComponent } from './views/views.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthguardService } from './login-page/authguard.service';

const arr: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'nav', canActivate: [AuthguardService], component: NavBarComponent, children: [
      { path: 'Stats', component: DashboardComponent },
      { path: 'Dashboard', component: ViewsComponent },
      { path: 'Escalate', component: EscalateComponent },
    ]
  },
  { path: 'pagenotfound', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/pagenotfound' }
];
export const routingArr = RouterModule.forRoot(arr);
