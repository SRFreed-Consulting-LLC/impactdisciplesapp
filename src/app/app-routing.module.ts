import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapturePasswordFormComponent } from 'impactdisciplescommon/src/forms/capture-password-form/capture-password-form.component';
import { CaptureUsernameFormComponent } from 'impactdisciplescommon/src/forms/capture-username-form/capture-username-form.component';
import { ChangePasswordFormComponent } from 'impactdisciplescommon/src/forms/change-password-form/change-password-form.component';
import { CreateAuthFormComponent } from 'impactdisciplescommon/src/forms/create-auth-form/create-auth-form.component';
import { ResetPasswordFormComponent } from 'impactdisciplescommon/src/forms/reset-password-form/reset-password-form.component';
import { MainComponent } from './core/main/main.component';
import { AuthGuardService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { AppAuthGuardService } from './core/app-auth-guard.service';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { PrivatePolicyComponent } from './features/private-policy/private-policy.component';
import { InstallComponent } from './core/install/install.component';
import { PublishingManagerComponent } from './publisher/publishing-manager/publishing-manager.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [ AppAuthGuardService ],
    children: [
      {
        path: 'home',
        component: PublishingManagerComponent
      },
      {
        path: 'series-manager',
        component: PublishingManagerComponent
      },
      {
        path: 'user-profile',
        component: UserProfileComponent
      },
      {
        path: 'policy',
        component: PrivatePolicyComponent
      },
    ]
  },
  {
    path: 'install',
    component: InstallComponent
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
