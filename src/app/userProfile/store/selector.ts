import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types/appState.interface";
import { UserProfileStateInterface } from "../types/userProfileState.interface";




export const userProfileFeatureSelector = createFeatureSelector<
    AppStateInterface,
    UserProfileStateInterface
>('userProfile')

export const userProfileSelector = createSelector(
    userProfileFeatureSelector,
    (userProfileState: UserProfileStateInterface) => userProfileState.data
)

export const userProfileLoading = createSelector(
    userProfileFeatureSelector,
    (userProfileState: UserProfileStateInterface) => userProfileState.isLoading
)

export const userProfileError = createSelector(
    userProfileFeatureSelector,
    (userProfileState: UserProfileStateInterface) => userProfileState.error
)