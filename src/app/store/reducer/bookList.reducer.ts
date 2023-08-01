import { createReducer, on } from '@ngrx/store';
import { Book } from 'src/app/interface/book';
import { bookActions, bookListAction } from '../actions/books.actions';

const initialState: Book[] = [];

export const bookListReducer = createReducer(
  initialState,
  on(bookListAction.retrievedBookList, (state, { books }) => books)
);
