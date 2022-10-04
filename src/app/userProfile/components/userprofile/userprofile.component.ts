import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Observable, Subscription, combineLatest } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { currentUserSelector } from 'src/app/auth/store/selectors'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { getUserProfileAction } from '../../store/getUserProfile.action'
import {
  userProfileError,
  userProfileLoading,
  userProfileSelector,
} from '../../store/selector'
import { UserProfileInterface } from '../../types/userProfile.interface'

@Component({
  selector: 'mc-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
})
export class UserprofileComponent implements OnInit {
  userProfile: UserProfileInterface
  isLoading$: Observable<boolean>
  errors$: Observable<string | null>
  userProfileSubscription: Subscription
  apiUrl: string
  slug: string
  isCurrentUserProfile$: Observable<boolean>

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('render profile .... ', this.route.url)
    this.initializeValue()
    this.initializeListeners()
    this.fetchData()
  }
  initializeValue(): void {
    const isFavorites = this.router.url.includes('favorites')
    this.slug = this.route.snapshot.paramMap.get('slug')
    this.isLoading$ = this.store.pipe(select(userProfileLoading))
    this.errors$ = this.store.pipe(select(userProfileError))
    this.apiUrl = isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`
    this.isCurrentUserProfile$ = combineLatest(
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store
        .pipe(select(userProfileSelector), filter(Boolean))

    ).pipe(map(([currentUser, userProfile]: [CurrentUserInterface, UserProfileInterface]) => {
      return currentUser.username === userProfile.username
    }))
  }
  initializeListeners(): void {
    this.userProfileSubscription = this.store
      .pipe(select(userProfileSelector))
      .subscribe((userProfile: UserProfileInterface | null) => {
        // console.log('userProfile', userProfile)
        this.userProfile = userProfile
      })

    this.route.params.subscribe((params: Params) => {
      this.slug = params.slug
      this.fetchData()
    })
  }

  fetchData(): void {
    this.store.dispatch(getUserProfileAction({ slug: this.slug }))
  }
  getApiUrl(): void {

  }
}
