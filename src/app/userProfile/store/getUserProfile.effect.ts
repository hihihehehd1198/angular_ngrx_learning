import { UserProfileService } from './../service/userProfile.service';
import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { getUserProfileAction, getUserProfileFailureAction, getUserProfileSucessAction } from './getUserProfile.action';
import { UserProfileInterface } from '../types/userProfile.interface';



@Injectable()
export class getUserProfileEffect {
    getUserProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getUserProfileAction),
            switchMap(({ slug }) => {
                return this.UserProfileService.getUserProfile(slug).pipe(
                    map((userProfile: UserProfileInterface) => {
                        return getUserProfileSucessAction({ userProfile })
                    }),

                    catchError(() => {
                        return of(getUserProfileFailureAction())
                    })
                )
            })
        )
    )

    constructor(private actions$: Actions, private UserProfileService: UserProfileService) { }
}
