import { createActionGroup, props } from "@ngrx/store";
import { Book } from "src/app/interface/book";

export const bookActions = createActionGroup({
  source: '',
  events: {
    'Add Book': props<{ bookId: string }>(),
    'Remove Book': props<{ bookId: string }>(),
  },
});

export const bookListAction = createActionGroup({
  source: 'Books API',
  events: {
    'Retrieved Book List': props<{ books: Book[] }>(),
  },
});