import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Book } from "../interface/book";
import { Observable, map, tap } from "rxjs";
import { ajax } from "rxjs/ajax";

@Injectable({ providedIn: 'root' })
export class GoogleBooksService {
  constructor(private http: HttpClient) {}

 getBooks(): Observable<Array<Book>> {
  console.log("getBooks Triggered");
  return ajax.getJSON<{ items: Book[] }>(
    'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks'
  ).pipe(
    map((response) => response.items || [])
  );
}
}
