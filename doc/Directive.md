# Giới thiệu

Templates trong Angular là các mẫu HTML có tính động. Khi Angular hiển thị chúng, nó sẽ biến đổi DOM dựa trên các hướng dẫn được cung cấp bởi các directives. Một directive trong Angular là một class được đánh dấu bằng decorator `@Directive()`.

Một component trong Angular là một directive. Tuy nhiên, các component là một phần quan trọng và đặc trưng trong ứng dụng Angular, nên Angular định nghĩa decorator `@Component()` mở rộng từ decorator `@Directive()` và cung cấp các tính năng liên quan đến template.

Ngoài các component, còn hai loại directive khác là structural directive và attribute directive. Angular định nghĩa một số directive thuộc cả hai loại này, và cũng có thể tự định nghĩa directive của riêng mình bằng cách sử dụng decorator `@Directive()`.

- Structural directives: thay đổi layout bằng cách thêm, xóa và thay thế các phần tử trong DOM.
- Attribute directives: làm thay đổi diện mạo hoặc hành vi của một phần tử hiện có. Trong template, chúng trông giống như các thuộc tính HTML thông thường, do đó có tên Attribute directives.

# Built-in directives

Built-in directives trong Angular là các directives mặc định được cung cấp bởi Angular framework.
Các loại Angular directives:

- Components: Được sử dụng với một template. Loại chỉ thị này là loại chỉ thị phổ biến nhất. `@Component()` nó mở rộng từ `@Directive()` decorator và cung cấp các tính năng liên quan đến template.
- Attribute Directives: Thay đổi giao diện (appearance ) hoặc hành vi (behavior) của một element, component, hoặc một directive khác. (`NgClass`, `NgStyle`, `NgModel`)
- Structural directives: Thay đổi bố cục DOM bằng cách thêm và xóa các phần tử DOM. (`NgIf`, `NgForOf`, `NgSwitch`).

## Built-in attribute directives

Các build-in attribute directives được để trong cặp dấu ngoặc `[]`

### `NgClass`

Thêm và xóa một tập hợp các lớp CSS.

Lưu ý: Để thêm hoặc xóa một lớp, hãy sử dụng class binding thay vì NgClass.
`<div [ngClass]="isSpecial ? 'special' : ''">NgClass</div>`

`<p [class.special]="isSpecial">NgClass</p>`

**Sử dụng `NgClass` với một biểu thức**

Trong trường hợp này, isSpecial là một giá trị boolean được đặt thành true trong app.component.ts. Vì isSpecial là true nên ngClass áp dụng class special cho thẻ `<div>`.
Example:

```
<!-- toggle the "special" class on/off with a property -->
<div [ngClass]="isSpecial ? 'special' : ''">This div is special</div>
```

**Using `NgClass` with a method**

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  isActive: boolean = true;

  getClass() {
    if (this.isActive) {
      return 'active';
    } else {
      return 'inactive';
    }
  }
}
```

`<div [ngClass]="getClass()">Styled div</div>`

**Cách thêm nhiều class với `ngClass`**

- `string`: Các lớp CSS được liệt kê trong chuỗi (cách nhau bằng khoảng trắng) sẽ được thêm vào.
  Examples: `<div [ngClass]="'first second'">...</div>`
- `Array`: Các lớp CSS được khai báo như các phần tử của mảng
  Examples: `<div [ngClass]="['first', 'second']">...</div>`
- `Object`: Các key của object sẽ là các class được thêm vào khi mà key đó có giá trị "truthy" (khác 0, null, undefined, false hoặc rỗng), ngược lại chúng sẽ bị loại bỏ.
  Example: `<div [ngClass]="{'class1 class2 class3' : true}">...</div>`

### `NgStyle`

`NgStyle` được sử dụng để cập nhật các styles cho phần tử HTML chứa nó. Directive này cho phép thiết lập một hoặc nhiều thuộc tính styles dưới dạng các cặp key-value.

Key là tên kiểu (style name), có thể có một đuôi `.<unit>` tùy chọn (ví dụ: `top.px`, `font-style.em`)
Value là một biểu thức. Giá trị kết quả (khác null) của biểu thức, được biểu thị trong đơn vị đã cho, sẽ được gán cho styles tương ứng.  
Examples: `<div [ngStyle]="{'font-style': styleExp}">...</div>`

### `NgModel`

Sử dụng chỉ thị `ngModel` để hiển thị thuộc tính dữ liệu và cập nhật thuộc tính đó khi người dùng thực hiện thay đổi.

1. Import FormsModule và thêm nó vào danh sách import của NgModule.

```
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule // <--- import into the NgModule
  ],
})
export class AppModule { }
```

2. Thêm một ràng buộc `[(ngModel)]` trên một phần tử HTML `<input>` và đặt nó bằng thuộc tính `currentItem.name`.

```
<label for="example-ngModel">[(ngModel)]:</label>
<input [(ngModel)]="currentItem.name" id="example-ngModel">
```

```
<input [ngModel]="currentItem.name" (ngModelChange)="setUppercaseName($event)" id="example-uppercase">
```

`[(ngModel)]="currentItem.name"`: Đây là một cách viết ngắn gọn cho việc gắn kết dữ liệu hai chiều. Nó kết hợp việc sử dụng cả thuộc tính gắn kết `[ngModel]` và sự kiện gắn kết `(ngModelChange)`. Khi giá trị của trường `currentItem.name` thay đổi, cả thuộc tính và sự kiện sẽ được tự động cập nhật để đồng bộ dữ liệu giữa trường `input` và biến `currentItem.name`.

Trong Angular, `(ngModelChange)` là một sự kiện được kích hoạt khi giá trị của một phần tử `<input>` liên kết dữ liệu bằng directive ngModel thay đổi. Sự kiện `(ngModelChange)` cho phép bắt và xử lý các thay đổi giá trị của phần tử và thực hiện các hành động cần thiết. Sử dụng biến $event để truy cập và sử dụng giá trị mới được nhập vào phần tử `<input>`.

## Built-in structural directives

Các chỉ thị cấu trúc chịu trách nhiệm về bố cục HTML. Chúng định hình hoặc định hình lại cấu trúc của DOM, thường bằng cách thêm, xóa và thao tác các thành phần máy chủ mà chúng được gắn vào.
Có 3 loại phổ biến nhất:

- `ngIf`: được sử dụng để điều khiển thêm hoặc xóa một phần tử DOM dựa trên một biểu thức điều kiện.
- `ngFor`: được sử dụng để lặp qua một mảng hoặc một collection và tạo ra các phần tử DOM tương ứng cho mỗi item trong mảng hoặc collection đó.
- `ngSwitch`: được sử dụng để tạo một cấu trúc điều kiện nhiều nhánh trong template. Nó cho phép kiểm tra một giá trị và dựa trên giá trị đó, chọn một template con để hiển thị.

Các build-in structural directives được bắt đầu bằng dấu `*`

### `ngIf`

Để thêm hoặc loại bỏ một phần tử bằng cách áp dụng nó lên một phần tử chủ (host element). Khi giá trị của NgIf là false, Angular sẽ loại bỏ phần tử đó cùng với các phần tử con của nó khỏi DOM. Angular sau đó sẽ giải phóng các component liên quan, giúp tiết kiệm bộ nhớ và tài nguyên.
NgIf ngăn hiển thị phần tử được liên kết với giá trị null.

`<div *ngIf="isActive">This is example for ngif</div>`

Để hiển thị một template khi biểu thức được đánh giá là sai, ta có thể sử dụng một liên kết template else như được thể hiện trong ví dụ sau. Liên kết else trỏ tới một phần tử `<ng-template>` có nhãn #elseBlock.

```
<div *ngIf="condition; else elseBlock">Content to render when condition is true.</div>
<ng-template #elseBlock>Content to render when condition is false.</ng-template>
```

```
<div *ngIf="condition; then thenBlock else elseBlock"></div>
<ng-template #thenBlock>Content to render when condition is true.</ng-template>
<ng-template #elseBlock>Content to render when condition is false.</ng-template>
```

### `ngFor`

Sử dụng chỉ thị NgFor để hiển thị danh sách các mục.
Để sử dụng NgFor, áp dụng nó vào một phần tử DOM và sử dụng cú pháp `*ngFor="let item of items"` trong đó items là mảng, collection hoặc đối tượng mà ta muốn lặp qua.
Khi áp dụng NgFor với cú pháp `"let item of items"`, Angular tự động tạo một `<ng-template>` xung quanh phần tử chủ (host element) trong template. `<ng-template>` đại diện cho khối template mà bạn muốn lặp lại cho mỗi phần tử trong mảng items.
**Getting the index of `*ngFor`**
Để lấy chỉ mục trong một vòng lặp NgFor, bạn có thể thêm dấu chấm phẩy và let i=index vào cú pháp rút gọn.

```
<div *ngFor="let item of items; let i=index">{{i + 1}} - {{item.name}}</div>
```

Các giá trị khác trong `*ngFor`

- `first`: Được đặt thành true nếu phần tử hiện tại là phần tử đầu tiên trong vòng lặp.
- `last`: Được đặt thành true nếu phần tử hiện tại là phần tử cuối cùng trong vòng lặp.
- `even`: Được đặt thành true nếu chỉ mục của phần tử hiện tại là một số chẵn.
- `odd`: Được đặt thành true nếu chỉ mục của phần tử hiện tại là một số lẻ.

**Repeating elements when a condition is true**
Để repeat the elements khi điều kiện là true chúng ta nên đặt *ngIf trên element container bao bọc phần tử *ngFor.

**Tracking items with `*ngFor` trackBy**
Khi sử dụng NgFor để lặp qua một danh sách các mục, Angular mặc định sẽ xác định sự thay đổi của mỗi mục bằng cách so sánh các đối tượng tham chiếu của chúng. Khi có sự thay đổi nào đó trong danh sách, Angular sẽ render lại toàn bộ vòng lặp NgFor, kể cả những mục không thay đổi.

Giảm số lượng lần render bằng cách sử dụng thuộc tính `trackBy` trong vòng lặp NgFor, Angular có thể thay đổi và render lại chỉ những mục đã thay đổi, thay vì tải lại toàn bộ danh sách mục.

Để sử dụng thuộc tính trackBy ta chỉ định một hàm để xác định sự thay đổi của mỗi mục trong danh sách. Hàm này sẽ xác định một giá trị duy nhất cho mỗi mục, và Angular sẽ sử dụng giá trị này để xác định sự thay đổi trong danh sách.
Ví dụ, giả sử ta có một danh sách các mục với thuộc tính id duy nhất cho mỗi mục. Ta có thể sử dụng `trackBy` để xác định sự thay đổi dựa trên thuộc tính `id`.

```
<div *ngFor="let item of items; trackBy: trackByFn">{{ item.name }}</div>

```

Trong component sẽ triển khai phương thức trackByFn để trả về giá trị duy nhất dựa trên thuộc tính `id`.

```
trackByFn(index: number, item: any): number {
  return item.id;
}
```

## Hosting a directive without a DOM element

Trong Angular, `<ng-container>` là một phần tử nhóm được sử dụng để gom nhóm các phần tử hoặc directive mà không ảnh hưởng đến styles hoặc layout của trang web vì nó không được đưa vào DOM.

Khi không có một phần tử duy nhất để chứa directive, ta có thể sử dụng `<ng-container>`. Sử dụng `<ng-container>` khi chúng ta muốn áp dụng một directive mà không muốn tạo thêm phần tử trong DOM.

```
<p>
  I turned the corner
  <ng-container *ngIf="hero">
    and saw {{hero.name}}. I waved
  </ng-container>
  and continued on my way.
</p>
```

## Switching cases with NgSwitch

Giống như câu lệnh `switch ` JavaScript, NgSwitch hiển thị một phần tử trong số một số phần tử có thể, dựa trên điều kiện chuyển đổi. Chỉ có phần tử được chọn sẽ được thêm vào DOM.

NgSwitch bao gồm ba directive:

- `NgSwitch`: Là một directive thuộc tính (attribute directive) thay đổi hành vi của các directive đồng nghiệp của nó.

- `NgSwitchCase`: Là một directive cấu trúc (structural directive) thêm phần tử của nó vào DOM khi giá trị được ràng buộc của nó bằng giá trị switch, và loại bỏ phần tử khi giá trị ràng buộc không bằng giá trị switch.

- `NgSwitchDefault`: Là một directive cấu trúc (structural directive) thêm phần tử của nó vào DOM khi không có NgSwitchCase nào được chọn.

# Attribute directives

## Building an attribute directive

1. Để tạo một attribute directive ta sử dụng lệnh:
   `ng generate directive <directive name>`

Chúng ta có thể sử dụng thuộc tính `selector` để chỉ định CSS attribute selector cho directive đó. CSS attribute selector cho phép chúng ta áp dụng directive cho các phần tử HTML dựa trên thuộc tính của chúng.

2. Nhập `ElementRef` từ `@angular/core`. `ElementRef` cấp quyền truy cập trực tiếp vào phần tử DOM máy chủ thông qua thuộc tính `nativeElement` của nó.
3. Thêm `ElementRef` vào constructor của directive để inject một tham chiếu đến phần tử DOM mà directive được áp dụng.
4. Trong logic của directive, thực hiện các thay đổi hoặc tương tác với phần tử DOM thông qua `nativeElement`

```
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
    constructor(private el: ElementRef) {
       this.el.nativeElement.style.backgroundColor = 'yellow';
    }
}

```

## Applying an attribute directive

`<p appHighlight >Highlight me!</p>`

Angular tạo một instance của lớp HighlightDirective và thêm một tham chiếu đến phần tử `<p>` vào hàm tạo, đặt background của phần tử `<p>` thành màu vàng.

## Handling user events

1. Import HostListener from '@angular/core'.
   `import { Directive, ElementRef, HostListener } from '@angular/core';`
2. Sử dụng `@HostListener` để xử lý sự kiện.

`@HostListener` là một decorator được cung cấp bởi Angular để liên kết các handlers với các sự kiện trên phần tử DOM chủ (host DOM element) mà directive được áp dụng.

Khi chúng ta sử dụng `@HostListener`, chúng ta có thể xác định sự kiện mà chúng ta muốn lắng nghe và chỉ định phương thức trong directive để được gọi khi sự kiện đó xảy ra trên phần tử DOM chủ.

```
@HostListener('mouseenter') onMouseEnter() {
  this.highlight('yellow');
}

@HostListener('mouseleave') onMouseLeave() {
  this.highlight('');
}

private highlight(color: string) {
  this.el.nativeElement.style.backgroundColor = color;
}
```

## Passing values into an attribute directive

1. Add an appHighlight `@Input()` property.

` @Input() appHighlight = '';`

```
@HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight || 'yellow');
}
```

2. Truyền giá trị vào như các attribute directive khác

`<p [appHighlight]="color">Highlight me!</p>`

## Binding to a second property

`@Input() defaultColor = '';`

```
@HostListener('mouseenter') onMouseEnter() {
  this.highlight(this.appHighlight || this.defaultColor || 'red');
}
```

```
<p [appHighlight]="color" defaultColor="violet">
  Highlight me too!
</p>
```

## Deactivating Angular processing with NgNonBindable

NgNonBindable trong Angular được sử dụng để bỏ qua việc xử lý các directives, expressions, và ràng buộc dữ liệu bên trong một element.

```
<h3>ngNonBindable with a directive</h3>
<div ngNonBindable [appHighlight]="'yellow'">This should not evaluate: {{ 1 +1 }}, but will highlight yellow.
</div>
```

# Structural directives

## Structural directive shorthand

Khi các structural directive được áp dụng, thông thường chúng được đặt tiền tố bởi một dấu sao, * như `*ngIf`. Quy ước này là một cách viết tắt mà Angular hiểu và chuyển đổi thành một dạng dài hơn. Angular chuyển đổi dấu sao phía trước một structural directive thành một thẻ `<ng-template>` bao quanh phần tử chủ và các phần tử con của nó.

`<div *ngIf="condition">Content</div>`

```
<ng-template [ngIf]="condition">
  <div>Content</div>
</ng-template>

```

Lưu ý: Nếu bạn chỉ bọc các phần tử trong một `<ng-template>` mà không áp dụng một structural directive, những phần tử đó sẽ không được hiển thị.

## One structural directive per element

Khi bạn muốn lặp lại một khối mã HTML nhưng chỉ khi một điều kiện cụ thể được thỏa mãn. Một cách tự nhiên để làm điều đó là đặt cả *ngFor và *ngIf trên cùng một phần tử. Tuy nhiên, vì cả *ngFor và *ngIf đều là các structural directive, điều này sẽ bị coi là lỗi bởi trình biên dịch. Chỉ có thể áp dụng một structural directive duy nhất cho một phần tử.

## Creating a structural directive

`ng generate directive unless`

```
constructor(
  private templateRef: TemplateRef<any>,
  private viewContainer: ViewContainerRef) { }
```

`templateRef` là một đối tượng `TemplateRef<any>` được sử dụng để truy cập nội dung của `<ng-template>`. Đối tượng này cho phép chúng ta truy cập các thành phần bên trong `<ng-template>` như các phần tử HTML và các directives có trong template.

`viewContainer` là một đối tượng `ViewContainerRef` được sử dụng để truy cập view container. View container là một vùng trong DOM nơi chúng ta có thể chèn các view (các thành phần Angular đã được biên dịch) vào.

```
@Input() set appUnless(condition: boolean) {
  if (!condition && !this.hasView) {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.hasView = true;
  } else if (condition && this.hasView) {
    this.viewContainer.clear();
    this.hasView = false;
  }
}
```

Nếu `condition` là falsy và Angular chưa tạo view trước đó thì sẽ yêu cầu tạo ra view container và nhúng từ template view container. Đặt lại hasView = true and

Nếu `condition` là truthy và view đang hiển thị thì sẽ xóa view khỏi container, và đặt lại hasView = false

## Improving template type checking for custom directives

- Thuộc tính `ngTemplateGuard_(someInputProperty)`: Cho phép bạn xác định một kiểu chính xác hơn cho một biểu thức đầu vào trong template.
- Thuộc tính tĩnh `ngTemplateContextGuard`: một tính năng có thể sử dụng để xác định kiểu dữ liệu chính xác của ngữ cảnh (context) trong một template.

Các thuộc tính này giúp bộ kiểm tra kiểu dữ liệu của template trong Angular tìm ra các lỗi trong template ngay trong quá trình biên dịch, từ đó tránh được các runtime errors.

# Directive composition API

Directive composition API là một tính năng trong Angular cho phép chúng ta kết hợp và sử dụng các directive trong một component thay vì sử dụng chỉ thị trong template.

## Adding directives to a component

```
@Component({
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [MenuBehavior],
})
export class AdminMenu { }
```

Directives được sử dụng trong hostDirectives phải `standalone: true`

## Including inputs and outputs

```
@Component({
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [{
    directive: MenuBehavior,
    inputs: ['menuId'],
    outputs: ['menuClosed'],
  }],
})
export class AdminMenu { }
```

Ngoài ra ta có thể đặt lại tên cho input của directive

```
    inputs: ['menuId: id'],
    outputs: ['menuClosed: closed'],
```

## Adding directives to another directive

```
@Directive({...})
export class Menu { }

@Directive({...})
export class Tooltip { }

// MenuWithTooltip can compose behaviors from multiple other directives
@Directive({
  hostDirectives: [Tooltip, Menu],
})
export class MenuWithTooltip { }

// CustomWidget can apply the already-composed behaviors from MenuWithTooltip
@Directive({
  hostDirectives: [MenuWithTooltip],
})
export class SpecializedMenuWithTooltip { }

```

## Host directive semantics

### Directive execution order

Host directives trải qua vòng đời giống như các components và directives được sử dụng trực tiếp trong template. Tuy nhiên, host directive thực thi các constructor, lifecycle hooks, và bindings trước component or directive mà chúng được áp dụng.

```
@Component({
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [MenuBehavior],
})
export class AdminMenu { }
```

Vì vậy Host directive có thể ghi đè các bindings hoặc thay đổi hành vi của component hoặc directive mà nó áp dụng.
Điều này cho phép tái sử dụng và mở rộng chức năng của các component và directive một cách linh hoạt.

### Dependency injection

Tất cả các components và directives trong Angular có thể định nghĩa các dependencies thông qua providers. Khi một component hoặc directive áp dụng host directives thông qua thuộc tính hostDirectives, các host directives cũng có thể định nghĩa các providers riêng của chúng.

Trong trường hợp một component hoặc directive cùng với host directives cung cấp cùng một injection token, Angular sẽ ưu tiên sử dụng providers được định nghĩa bởi class chứa hostDirectives. Điều này có nghĩa là các dependencies được cung cấp bởi class chứa hostDirectives sẽ được sử dụng thay vì các dependencies được cung cấp bởi host directives.

```
@Injectable()
class MyService {
  getData(): string {
    return 'Data from MyService';
  }
}

@Directive({
  selector: '[myDirective]',
  providers: [
    { provide: MyService, useClass: MyService }
  ]
})
class MyDirective {
  constructor(private myService: MyService) {}
}

@Component({
  selector: 'my-component',
  template: '<div myDirective></div>',
  hostDirectives: [MyDirective],
  providers: [
    { provide: MyService, useClass: AnotherService }
  ]
})
class MyComponent {
  constructor(private myService: MyService) {
    console.log(myService.getData()); // Output: "Data from MyService"
  }
}

```

Trong ví dụ trên, cả MyDirective và MyComponent đều cung cấp MyService thông qua providers. Tuy nhiên, MyComponent định nghĩa providers riêng với MyService được thay thế bởi AnotherService. Khi MyComponent được khởi tạo, MyService sẽ được cung cấp bởi AnotherService do providers được định nghĩa trong class MyComponent có ưu tiên hơn so với providers trong MyDirective.
