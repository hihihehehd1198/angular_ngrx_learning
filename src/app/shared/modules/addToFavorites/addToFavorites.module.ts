import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AddToFavoriteComponent } from 'src/app/shared/modules/addToFavorites/components/addToFavorites/addToFavorites.component'
import { AddToFavoritesService } from './services/add-to-favourites.service'
import { AddToFavoritesEffect } from './components/effects/addToFavorites.effect'
import { EffectsModule } from '@ngrx/effects'

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([AddToFavoritesEffect])],
  declarations: [AddToFavoriteComponent],
  exports: [AddToFavoriteComponent],
  providers: [AddToFavoritesService],
})
export class AddToFavoriteModule { }
