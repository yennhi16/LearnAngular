import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  catchError,
  concat,
  concatMap,
  exhaustMap,
  fromEvent,
  interval,
  map,
  merge,
  mergeMap,
  of,
  range,
  switchMap,
  take,
  timer,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-operator-map',
  templateUrl: './operator-map.component.html',
  styleUrls: ['./operator-map.component.scss'],
})
export class OperatorMapComponent implements AfterViewInit {
  @ViewChild('btnUsers', { static: true })
  btnUser!: ElementRef;
  @ViewChild('btnConcatMap', { static: true })
  btnConcatMap!: ElementRef;
  @ViewChild('btnMergeMap', { static: true })
  btnMergeMap!: ElementRef;
  @ViewChild('btnSwitchMap', { static: true })
  btnSwitchMap!: ElementRef;
  @ViewChild('btnExhaustMap', { static: true })
  btnExhaustMap!: ElementRef;
  // obs$ = ajax.getJSON('https://api.github.com/users?per_page=5').pipe(
  //   map((userResponse) => userResponse),
  //   catchError((error) => {
  //     console.log('error: ', error);
  //     return of(error);
  //   })
  // );
  listItem: any = [];
  userList: any = [];
  listNumber: any = [];

  timer = interval(1000).pipe(take(4));
  sequence = range(1, 10);
  result = concat(this.timer, this.sequence);

  resultMerge = merge(this.timer, this.sequence);

  clickConcat() {
    this.result.subscribe((num) => {
      this.listNumber.push(num);
    });
  }
  clickMerge() {
    this.resultMerge.subscribe((num) => {
      this.listNumber.push(num);
    });
  }

  ngAfterViewInit(): void {
    // handle exhaustMap
    const clicks = fromEvent(this.btnUser.nativeElement, 'click');
    const result = clicks.pipe(
      exhaustMap(() =>
        timer(2000).pipe(
          switchMap(() =>
            ajax.getJSON('https://api.github.com/users?per_page=5').pipe(
              map((user: any) => {
                this.userList.push(...user);
              })
            )
          )
        )
      )
    );
    result.subscribe();
    // ========================
    // handle concatMap
    const clicksConcat = fromEvent(this.btnConcatMap.nativeElement, 'click');
    const resultConcat = clicksConcat.pipe(
      concatMap(() => interval(1000).pipe(take(5)))
    );
    resultConcat.subscribe((x) => {
      this.listItem.push(x);
      console.log(this.listItem);
    });

    // ========================
    // handle MergeMap
    const clicksMerge = fromEvent(this.btnMergeMap.nativeElement, 'click');
    const resultMerge = clicksMerge.pipe(
      mergeMap(() => interval(1500).pipe(take(5)))
    );
    resultMerge.subscribe((x) => {
      this.listItem.push(x);
      console.log(this.listItem);
    });
    // ========================
    // handle exhaustMap
    const clicksExhaust = fromEvent(this.btnExhaustMap.nativeElement, 'click');
    const resultExhaust = clicksExhaust.pipe(
      exhaustMap(() => interval(1000).pipe(take(5)))
    );
    resultExhaust.subscribe((x) => {
      this.listItem.push(x);
      console.log(this.listItem);
    });
    // ========================
    // handle switchMap
    const clicksSwitch = fromEvent(this.btnSwitchMap.nativeElement, 'click');
    const resultSwitch = clicksSwitch.pipe(
      switchMap(() => interval(1000).pipe(take(5)))
    );
    resultSwitch.subscribe((x) => {
      this.listItem.push(x);
      console.log(this.listItem);
    });
  }
}
