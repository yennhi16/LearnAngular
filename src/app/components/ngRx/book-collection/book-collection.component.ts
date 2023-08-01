import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Book } from 'src/app/interface/book';

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.scss'],
})
export class BookCollectionComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log('app-book-collection', changes);
  }
  @Input() books: Book[] = [];
  @Output() add = new EventEmitter<string>();
  
}
