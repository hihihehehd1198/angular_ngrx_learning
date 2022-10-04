import { createAction, props } from '@ngrx/store'
import { ArticleInterface } from 'src/app/shared/types/article.interface'
import { Actiontypes } from './actionTypes'

export const addToFavoritesAction = createAction(
    Actiontypes.ADD_TO_FAVORITES,
    props<{ isFavorited: boolean; slug: string }>()
)

export const addToFavoritesSucessAction = createAction(
    Actiontypes.ADD_TO_FAVORITES_SUCESS,
    props<{ article: ArticleInterface }>()
)
export const addToFavoritesFailureAction = createAction(
    Actiontypes.ADD_TO_FAVORITES_FAILURE,

)
