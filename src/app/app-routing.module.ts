import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/:roomId', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard/1', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard/1', pathMatch: 'full' },
];

const options: ExtraOptions = {
  initialNavigation: 'enabledBlocking',
};
@NgModule({
  imports: [RouterModule.forRoot(routes, options)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
