import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PersonalComponent} from './personal/personal.component';
import {NotfoundComponent} from './notfound/notfound.component';
import { AuthGuard } from './personal/services/auth.guard'

const routes: Routes = [
  {path: 'personal', component: PersonalComponent},
  {path: '', redirectTo: '/personal', pathMatch: 'full'},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivateChild: [AuthGuard] },
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
