# Pass data from parent to child with input binding

Sử dụng `@input` để nhận dữ liệu từ component cha.

```
@Component({
  selector: 'app-hero-child',
  template: `
    <h3>{{hero.name}} says:</h3>
    <p>I, {{hero.name}}, am at your service, {{masterName}}.</p>
  `
})
export class HeroChildComponent {
  @Input() hero!: Hero;
  @Input('master') masterName = '';
}
```

Trong ví dụ trên, @Input() cho biết rằng thuộc tính hero có thể nhận dữ liệu từ Component cha.
Dấu chấm than ! sau hero cho biết rằng thuộc tính này sẽ được gán giá trị trước khi sử dụng và không được phép null hoặc undefined. Component đó sẽ nhận dữ liệu từ Component cha thông qua thuộc tính hero, và thuộc tính này sẽ không được phép null hoặc undefined.
@Input('master') cho biết rằng thuộc tính masterName trong Component con được gọi bằng tên master từ Component cha.

# Intercept input property changes with a setter

Sử dụng input property sette để chặn và handle theo một giá trị từ parent
Example:

```
@Component({
  selector: 'app-name-child',
  template: '<h3>"{{name}}"</h3>'
})
export class NameChildComponent {
  @Input()
  get name(): string { return this._name; } // _name vs name ???
  set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';
  }
  private _name = '';
}
```

Khi truy cập vào name property của NameChildComponent, getter này sẽ được gọi và trả về giá trị hiện tại của biến \_name. Trong trường hợp này, getter trả về giá trị của biến \_name dưới dạng một chuỗi.

# Intercept input property changes with ngOnChanges()

Example:

```
@Component({
  selector: 'app-child',
  template: `
    <h2>Previous Name: {{ previousName }}</h2>
    <h2>Current Name: {{ currentName }}</h2>
  `,
})
export class ChildComponent implements OnChanges {
  @Input() name: string = '';

  previousName: string = '';
  currentName: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name) {
      const { previousValue, currentValue } = changes.name;
      this.previousName = previousValue;
      this.currentName = currentValue;
    }
  }
}

```

# Parent listens for child event

Các bước để truyền dữ liệu từ Component con lên Component cha

1. Trong Component con, khai báo một biến và tạo một EventEmitter để phát ra sự kiện khi giá trị của biến thay đổi.

```
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <button (click)="onButtonClick()">Click me</button>
  `,
})
export class ChildComponent {
  @Output() dataChange: EventEmitter<string> = new EventEmitter<string>();

  onButtonClick(): void {
    const newData: string = 'Hello from Child';
    this.dataChange.emit(newData);
  }
}
```

`dataChange` là một `EventEmitter` kiểu string để phát ra sự kiện khi giá trị `newData` thay đổi. Khi người dùng nhấp vào nút, phương thức `onButtonClick()` được gọi và giá trị `newData` được phát ra thông qua `this.dataChange.emit(newData)`. 2. Trong Component cha, sử dụng cú pháp `(dataChange)="handleDataChange($event)"` để lắng nghe sự kiện từ Component con và xử lý dữ liệu.

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <app-child (dataChange)="handleDataChange($event)"></app-child>
  `,
})
export class ParentComponent {
  handleDataChange(data: string): void {
    console.log('Data changed in ChildComponent:', data);
    // Xử lý logic sau khi nhận được dữ liệu từ Component con
  }
}

```

ParentComponent sử dụng cú pháp `(dataChange)="handleDataChange($event)"` để lắng nghe sự kiện dataChange từ Component con (ChildComponent). Khi sự kiện dataChange được phát ra từ Component con và dữ liệu được truyền lên, phương thức `handleDataChange()` trong Component cha được gọi với giá trị dữ liệu nhận được.

# Parent interacts with child using local variable

Component cha tương tác với Component con bằng cách sử dụng một biến cục bộ (local variable) trong template của Component cha.
Khi Component cha tương tác với Component con bằng cách sử dụng local variable, nó có thể truy cập và gọi các phương thức hoặc thuộc tính của Component con từ template của Component cha.
Example:

```
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <button (click)="onButtonClick()">Click me</button>
  `,
})
export class ChildComponent {
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  onButtonClick(): void {
    this.buttonClick.emit();
  }

  doSomething(): void {
    console.log('Doing something in ChildComponent');
  }
}

```

Component con (ChildComponent) có một phương thức `doSomething()` và một sự kiện `buttonClick` được phát ra thông qua `EventEmitter`. Khi người dùng nhấp vào nút, phương thức `onButtonClick()` trong Component con được gọi và phát ra sự kiện `buttonClick`.

```
import { Component, ViewChild } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
 selector: 'app-parent',
 template: `
   <app-child #childRef></app-child>
   <button (click)="callChildMethod()">Call Child Method</button>
 `,
})
export class ParentComponent {
 @ViewChild('childRef') childComponent: ChildComponent;

 callChildMethod(): void {
   this.childComponent.doSomething();
 }
}
```

Component cha (ParentComponent) sử dụng ViewChild decorator để truy cập vào Component con (ChildComponent) từ template của nó. #childRef là một local variable được gắn với Component con để có thể truy cập vào nó từ template của Component cha.

# Parent calls an @ViewChild()

Phương pháp sử dụng local variable (biến cục bộ) có giới hạn vì việc liên kết giữa Component cha và Component con phải được thực hiện hoàn toàn trong template của Component cha. Component cha không có quyền truy cập vào Component con.

Nếu lớp của Component cha phụ thuộc vào lớp của Component con, thì không thể sử dụng phương pháp local variable để truy cập vào lớp của Component con. Mối quan hệ cha-con của các thành phần không được thiết lập trong từng lớp thành phần tương ứng với phương pháp local variable. Vì các instance của lớp không được kết nối với nhau, lớp của Component cha không thể truy cập vào các thuộc tính và phương thức của lớp của Component con.

Example:

```
import { AfterViewInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { CountdownTimerComponent } from './countdown-timer.component';

@Component({
  selector: 'app-countdown-parent-vc',
  template: `
    <h3>Countdown to Liftoff (via ViewChild)</h3>
    <button type="button" (click)="start()">Start</button>
    <button type="button" (click)="stop()">Stop</button>
    <div class="seconds">{{ seconds() }}</div>
    <app-countdown-timer></app-countdown-timer>
  `,
  styleUrls: ['../assets/demo.css']
})
export class CountdownViewChildParentComponent implements AfterViewInit {

  @ViewChild(CountdownTimerComponent)
  private timerComponent!: CountdownTimerComponent;

  seconds() { return 0; }

  ngAfterViewInit() {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    setTimeout(() => this.seconds = () => this.timerComponent.seconds, 0);
  }

  start() { this.timerComponent.start(); }
  stop() { this.timerComponent.stop(); }
}
```

### Sự khác nhau của `@ViewChild` và `@ViewChildren`

`@ViewChild`

- Được sử dụng để truy cập vào một thành phần con duy nhất hoặc một directive trong component cha.
- Kết quả trả về của @ViewChild là một tham chiếu trực tiếp đến thành phần con hoặc directive được chọn, không phải là một danh sách.
  `@ViewChildren`
- Được sử dụng để truy cập vào danh sách các thành phần con hoặc directives trong component cha.
- Kết quả trả về của @ViewChildren là một `QueryList`, một lớp trong Angular, chứa tất cả các tham chiếu đến thành phần con hoặc directive được chọn.

# Parent and children communicate using a service
