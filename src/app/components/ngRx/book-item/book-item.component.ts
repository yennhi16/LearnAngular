import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/interface/book';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent {
  @Input() books: Book[] = [];
  @Output() remove = new EventEmitter<string>();
}
