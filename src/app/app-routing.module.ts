import { UsersComponent } from './admin/users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MenuComponent } from './features/menu/menu.component';
import { ScheduleComponent } from './features/schedule/schedule.component';
import { AnnouncementsComponent } from './features/announcements/announcements.component';
import { AuthGuardService } from 'impactdisciplescommon/src/app/shared/services/auth.service';
import { CapturePasswordFormComponent } from 'impactdisciplescommon/src/app/shared/forms/capture-password-form/capture-password-form.component';
import { CaptureUsernameFormComponent } from 'impactdisciplescommon/src/app/shared/forms/capture-username-form/capture-username-form.component';
import { ChangePasswordFormComponent } from 'impactdisciplescommon/src/app/shared/forms/change-password-form/change-password-form.component';
import { CreateAuthFormComponent } from 'impactdisciplescommon/src/app/shared/forms/create-auth-form/create-auth-form.component';
import { ResetPasswordFormComponent } from 'impactdisciplescommon/src/app/shared/forms/reset-password-form/reset-password-form.component';
import { RootComponent } from 'impactdisciplescommon/src/app/shared/forms/root/root.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: 'announcements',
        component: AnnouncementsComponent,
        canActivate: [ AuthGuardService ]
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [ AuthGuardService ]
      },
      {
        path: 'menu',
        component: MenuComponent,
        canActivate: [ AuthGuardService ]
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
        canActivate: [ AuthGuardService ],
      },
    ]
  },
  {
    path: 'capture-username-form',
    component: CaptureUsernameFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'capture-password-form',
    component: CapturePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-auth-form',
    component: CreateAuthFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
