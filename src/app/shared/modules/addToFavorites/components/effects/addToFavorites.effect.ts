import { AddToFavoritesService } from './../../services/add-to-favourites.service';
import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'


import { addToFavoritesAction, addToFavoritesFailureAction, addToFavoritesSucessAction } from '../store/addToFavorites.action';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

@Injectable()
export class AddToFavoritesEffect {
    addToFavorites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addToFavoritesAction),
            switchMap(({ isFavorited, slug }) => {
                const article = isFavorited ? this.AddToFavoritesService.removeFromFavorites(slug) :
                    this.AddToFavoritesService.addToFavorites(slug)
                return article.pipe(map((article: ArticleInterface) => {
                    return addToFavoritesSucessAction({ article })
                }), catchError(() => {
                    return of(addToFavoritesFailureAction())
                }))
            })
        )
    )

    constructor(private actions$: Actions, private AddToFavoritesService: AddToFavoritesService) { }
}
