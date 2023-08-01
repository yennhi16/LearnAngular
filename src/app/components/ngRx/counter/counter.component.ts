import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GoogleBooksService } from 'src/app/service/books.service';
import { bookActions, bookListAction } from 'src/app/store/actions/books.actions';
import { decrement, increment, reset } from 'src/app/store/actions/counter.actions';
import { selectBookCollection, selectBooks } from 'src/app/store/selectors/book.selector';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  count$ = new Observable<number>();

  constructor(
    private store: Store,
    private bookServive: GoogleBooksService,
    private storeCount: Store<{ count: number }>
  ) {
    this.count$ = storeCount.select('count');
  }
  handleIncerment() {
    this.store.dispatch(increment());
  }
  handleDecrement() {
    this.store.dispatch(decrement());
  }
  handleReset() {
    this.store.dispatch(reset());
  }
  books$ = this.store.select(selectBooks);
  bookCollection$ = this.store.select(selectBookCollection);

  onAdd(bookId: string) {
    this.store.dispatch(bookActions.addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(bookActions.removeBook({ bookId }));
  }

  ngOnInit() {
    this.bookServive.getBooks().subscribe((books) => {
      console.log('books', books);
      this.store.dispatch(bookListAction.retrievedBookList({ books }));
    });
  }
}
