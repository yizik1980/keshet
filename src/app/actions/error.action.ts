import {  createAction, props } from '@ngrx/store';

export enum ErrorActionTypes {

  Failure = '[Error]  Failure',

}

export const failureAction = createAction(ErrorActionTypes.Failure, props< { error: string }>());

