import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AsyncSubject,
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  catchError,
  concatMap,
  fromEvent,
  interval,
  map,
  merge,
  mergeMap,
  of,
  scan,
  switchMap,
  tap,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {
  accumulateSum: number = 0;

  valueInterval: number = 0;

  // private subject = new BehaviorSubject<number>(0);

  private subject = new Subject<number>();

  // private source = new ReplaySubject<number>(2);

  // private source = new BehaviorSubject<number>(0);

  private source = new AsyncSubject<number>();

  time = new Observable<string>((observer) => {
    let times = setInterval(() => {
      observer.next(new Date().toString());
    }, 1000);
    return () => {
      clearInterval(times);
    };
  });
  listUser: any[] = [];

  obs$ = ajax.getJSON('https://api.github.com/users?per_page=5').pipe(
    map((userResponse) => userResponse),
    catchError((error) => {
      console.log('error: ', error);
      return of(error);
    })
  );

  @ViewChild('intervalValue', { static: true })
  intervalValue!: ElementRef;

  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;

  constructor(private activeParam: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeParam.url.subscribe((url) => {
      console.log('The URL changed to: ' + url);
    });
    this.obs$.subscribe({
      next: (value) => {
        console.log(value);
        this.listUser = value;
      },
      error: (err) => console.log(err),
    });

    // ==============
    // handel Subject
    this.source.next(1);
    this.source.next(2);
    this.source.subscribe((n) => console.log('subscriber 1', n));
    this.source.next(3);
    this.source.next(4);
    this.source.subscribe((n) => console.log('subscriber 2', n));
    this.source.next(5);
    this.source.complete();
  }

  addHtmlElement(coords: { x: number; y: number; id: number }): void {
    console.log('addHtmlElement', coords);
    const newElement = document.createElement('div');
    newElement.id = coords.id.toString();
    newElement.style.position = 'absolute';
    newElement.style.height = '30px';
    newElement.style.width = '30px';
    newElement.style.textAlign = 'center';
    newElement.style.top = coords.y + 'px';
    newElement.style.left = coords.x + 'px';
    newElement.style.background = 'silver';
    newElement.style.borderRadius = '80%';
    this.containerRef.nativeElement.appendChild(newElement);
  }

  setElementText(elemId: number, text: number): void {
    const element = document.getElementById(elemId.toString())!;
    if (element) {
      element.innerText = text.toString();
    }
  }

  ngAfterViewInit(): void {
    const container = this.containerRef.nativeElement;

    const click$ = fromEvent(container, 'click').pipe(
      map((e: any) => {
        console.log('event', e);
        return {
          x: e.offsetX,
          y: e.offsetY,
          id: Math.random(),
        };
      }),
      tap(this.addHtmlElement.bind(this)),
      mergeMap((coords) =>
        this.subject.pipe(
          tap((v) => {
            this.setElementText(coords.id, v);
          })
        )
      )
    );

    const interval$ = interval(2000).pipe(
      tap((v) => this.subject.next(v)),
      tap((v) => (this.valueInterval = v))
    );

    // merge(click$, interval$).subscribe();
    interval$.subscribe()
    click$.subscribe()
  }
}
