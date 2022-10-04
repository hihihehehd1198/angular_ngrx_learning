import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserprofileComponent } from '../components/userprofile/userprofile.component';
import { RouterModule } from '@angular/router';
import { getUserProfileEffect } from '../store/getUserProfile.effect';
import { reducers } from '../store/reducer';
import { UserProfileService } from '../service/userProfile.service';
import { FeedModule } from 'src/app/shared/modules/feed/feed.module';

const routes = [{
  path: 'route-test-user-profile',
  component: UserprofileComponent
},
{
  path: 'profiles/:slug/favorites',
  component: UserprofileComponent
},
{
  path: 'profiles/:slug',
  component: UserprofileComponent
}
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([getUserProfileEffect]),
    StoreModule.forFeature('userProfile', reducers),
    FeedModule
  ],
  declarations: [UserprofileComponent],
  exports: [UserprofileComponent],
  providers: [UserProfileService]
})
export class UserProfileModule { }
