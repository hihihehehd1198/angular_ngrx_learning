import { addToFavoritesAction } from './../store/addToFavorites.action';
import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

@Component({
  selector: 'mc-add-to-favorites',
  templateUrl: './addToFavorites.component.html',
  styleUrls: ['./addToFavorites.component.scss']
})
export class AddToFavoriteComponent implements OnInit {
  @Input('isFavorited') isFavoritedProps: boolean
  @Input('favoritesCount') favoritesCountProps: number
  @Input('articleSlug') articleSlugProps: string

  favoritesCount: number
  isFavorited: boolean

  ngOnInit(): void {
    this.favoritesCount = this.favoritesCountProps
    this.isFavorited = this.isFavoritedProps
  }

  handleLike(): void {
    // TODO: dispatch like or dislike
    this.store.dispatch(addToFavoritesAction({
      isFavorited: this.isFavorited,
      slug: this.articleSlugProps,
    }))

    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount - 1
    } else {
      this.favoritesCount = this.favoritesCount + 1
    }

    this.isFavorited = !this.isFavorited
  }
  constructor(private store: Store) {

  }
}
