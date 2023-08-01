import { createReducer, on } from '@ngrx/store';
import { decrement, increment, reset } from '../actions/counter.actions';
import { state } from '@angular/animations';

const initialState = 0;

export const couterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state)=> state = 0)
);
