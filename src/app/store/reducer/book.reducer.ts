import { state } from '@angular/animations';

import { createReducer, on } from '@ngrx/store';
import { Book } from 'src/app/interface/book';
import { bookActions } from '../actions/books.actions';

const initialState:string [] = [];

export const bookReducer = createReducer(
  initialState,
  on(bookActions.addBook, (state, {bookId})=> {
   
    if( state.indexOf(bookId) !== -1) return state;
    // state.push(bookId);
    console.log("Book add", state)
    return [...state];
  }),
  on(bookActions.removeBook, (state, {bookId})=> {
    return state.filter((book) => book !== bookId)
  })
);
