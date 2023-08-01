# Operators

1. **Creation Operators:**

- Chức năng chính: Tạo ra các Observable mới từ các nguồn dữ liệu khác nhau như mảng, Promise, sự kiện DOM, luồng HTTP, v.v.
- Cách sử dụng: Gọi các hàm tạo của Creation Operators để tạo Observable từ các nguồn dữ liệu.
- Ví dụ: of, from, interval, ajax, fromEvent, create,...

2. **Pipeable Operators:**

- Chức năng chính: Xử lý dữ liệu trong chuỗi của Observable, trả về một Observable mới chứa dữ liệu đã được xử lý. Không làm thay đổi observerble gốc.
- Cách sử dụng: Gọi phương thức pipe() của Observable và chuyển các Pipeable Operators làm đối số.
- Ví dụ: map, filter, mergeMap, tap, take, combineLatest, switchMap,...

3. **Điểm tương đồng giữa hai loại Operator:**

- Cả hai đều hoạt động với các Observable trong RxJS và trả về Observable mới.
- **Cả hai không thay đổi Observable gốc**, mà tạo ra Observable mới dựa trên Observable ban đầu.
- Cả hai đều giúp bạn thực hiện các phép xử lý trên dữ liệu của Observable.

4. **Điểm khác biệt giữa hai loại Operator:**

- Creation Operators tập trung vào việc tạo ra Observable từ các nguồn dữ liệu khác nhau, trong khi Pipeable Operators tập trung vào việc xử lý dữ liệu trong Observable.
- Creation Operators thường được sử dụng để bắt đầu chuỗi Observable bằng cách tạo Observable từ một nguồn dữ liệu cụ thể. Pipeable Operators thường được sử dụng sau khi có một Observable và bạn muốn xử lý các giá trị của nó.
- Creation Operators thường không thể kết hợp chung trong một chuỗi (chaining) như Pipeable Operators. Khi sử dụng Creation Operators, bạn thường tạo ra một Observable độc lập và hoạt động trên nó. Trong khi đó, Pipeable Operators cho phép bạn xâu chuỗi nhiều phép xử lý trên một Observable.

Tóm lại, **Creation Operators là các hàm để tạo Observable từ các nguồn dữ liệu**, trong khi **Pipeable Operators là các hàm để xử lý dữ liệu trong Observable**. Hai loại Operator này có vai trò khác nhau trong quá trình làm việc với Observable trong RxJS.

# Higher-order Observables

Higher-order Observables là các Observables mà phát ra các Observables khác thay vì các giá trị đơn lẻ. Nói cách khác, đó là một loại Observable chứa các Observables bên trong nó.
Có thể làm phẳng (flatten) các Higher-order Observables thành các Observable thông thường bằng cách sử dụng các toán tử hợp nhất (flattening operators) như `concatAll, mergeAll, switchAll, exhaustAll`, hoặc `mergeMap` (alias của `flatMap`).

## concatAll

- Dùng để làm phẳng các Higher-order Observables bằng cách tuần tự nối các Observables con.
- Khi một Observable con hoàn thành (complete), toán tử sẽ di chuyển đến Observable con tiếp theo để nối tiếp phát ra các giá trị từ Observable đó.
- Giữ thứ tự tuần tự của các Observables con, nghĩa là giá trị từ Observable con trước phải hoàn thành trước khi nối tiếp đến Observable con tiếp theo.
  Ex:

```
import { of, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeAll, map, catchError } from 'rxjs/operators';

// Chuỗi URL
const urlObservable = of(
  'https://jsonplaceholder.typicode.com/users',
  "https://jsonplaceholder.typicode.com/posts"
);

// Hàm thực hiện yêu cầu HTTP cho mỗi URL
const fetchData = (url: string) => {
  return ajax.getJSON(url).pipe(
    catchError((error) => {
      console.error(`Error fetching data from ${url}:`, error);
      return of({ error: true, message: 'Error fetching data' });
    })
  );
};

// Phát ra các Observables con tương ứng với các yêu cầu HTTP
const outerObservable = urlObservable.pipe(
  map((url) => fetchData(url))
);

// Làm phẳng các Observables con thành một Observable duy nhất
const flattenedObservable = outerObservable.pipe(
  mergeAll()
);

// Đăng ký vào Observable đã làm phẳng để nhận các kết quả từ từng yêu cầu HTTP
flattenedObservable.subscribe((result) => {
  if (!result.error) {
    console.log('Data received:', result);
  }
});
```

## mergeAll

- Dùng để làm phẳng các Higher-order Observables bằng cách song song đồng thời phát ra các giá trị từ các Observables con.
- Các giá trị từ các Observable con sẽ được phát ra mà không cần quan tâm đến thứ tự của các Observables con.
- Đồng thời thực hiện các yêu cầu không phụ thuộc vào thứ tự và hoàn thành khi tất cả các Observables con hoàn thành.

```
import { interval, mergeAll, Observable, of, take } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

// Mảng các phần tử cần phát ra
const arrayToEmit = [1, 2, 3, 4, 5];

// Tạo một Observable phát ra các phần tử từ mảng sau mỗi 2 giây
const observable = interval(2000).pipe(
  map((index) => arrayToEmit[index % arrayToEmit.length]),
  take(arrayToEmit.length), // Giới hạn số lượng phát ra bằng độ dài của mảng

);
const arrayToEmit2 = [6,7,8, 9];

// Tạo một Observable phát ra các phần tử từ mảng sau mỗi 1 giây
const observable2 = interval(1000).pipe(
  map((index) => arrayToEmit2[index % arrayToEmit2.length]),
  take(arrayToEmit2.length),

);
const totalObservable = of(observable, observable2)

const flattenedObservable = totalObservable.pipe(mergeAll());

flattenedObservable.subscribe((value) => {
  console.log(value);
});

<!-- kết quả
6
1
7
8
2
9
3
4
5 -->

```

## switchAll

- Dùng để làm phẳng các Higher-order Observables bằng cách chuyển đổi sang Observable con mới khi Observable con mới được phát ra từ Observable cha.
- Khi một Observable con mới xuất hiện, toán tử sẽ hủy đăng ký vào Observable con cũ và đăng ký vào Observable con mới, chỉ phát ra giá trị từ Observable con mới.
- Thường được sử dụng khi bạn chỉ quan tâm đến giá trị từ Observable con mới nhất và muốn hủy bỏ các yêu cầu trước đó.

```
import { fromEvent, tap, map, interval, switchAll } from 'rxjs';

const clicks = fromEvent(document, 'click').pipe(tap(() => console.log('click')));
const source = clicks.pipe(map(() => interval(1000)));

source
  .pipe(switchAll())
  .subscribe(x => console.log(x));

<!--
  Output
 click
 0
 1
 2
 3
 ...
 click
 0
 1
 2
 ...
 click
 ...
-->
```

## exhaustAll

- Dùng để làm phẳng các Higher-order Observables bằng cách bỏ qua các Observable con mới khi Observable con hiện tại đang phát ra giá trị.
- Khi Observable con đang phát ra giá trị, toán tử sẽ chờ cho đến khi Observable con hoàn thành trước khi xem xét các Observable con mới.
- Thường được sử dụng khi bạn muốn chờ cho đến khi một chuỗi yêu cầu hoàn thành trước khi bắt đầu một chuỗi yêu cầu mới.

# Create operators

## From

- `from` được sử dụng để chuyển đổi các loại dữ liệu khác nhau như mảng, chuỗi, Promise, đối tượng iterable (có thể lặp lại) thành Observable.
- Khi chuyển đổi một mảng hoặc đối tượng iterable,`from` sẽ phát ra các phần tử của mảng hoặc đối tượng iterable theo thứ tự
- Khi chuyển đổi một Promise, `from` sẽ phát ra giá trị hoặc lỗi từ Promise tùy thuộc vào kết quả của Promise.

## Of

- `of` được sử dụng để tạo Observable từ các giá trị cụ thể hoặc các tham số được truyền vào.
- Khi sử dụng `of`, bạn có thể truyền vào bất kỳ số lượng giá trị hoặc tham số nào, và Observable sẽ phát ra các giá trị đó theo đúng thứ tự bạn truyền vào.

sự khác nhau chính giữa `from` và `of` là loại dữ liệu chúng xử lý. `from` được sử dụng để chuyển đổi các loại dữ liệu khác nhau thành Observable và phát ra các giá trị từng phần tử trong mảng hoặc Promise. Trong khi đó, `of` được sử dụng để tạo Observable từ các giá trị cụ thể hoặc các tham số và phát ra các giá trị này theo đúng thứ tự bạn truyền vào.

## timer

operator timer được sử dụng để tạo một Observable mà phát ra một giá trị sau một khoảng thời gian nhất định và sau đó hoàn thành. Operator này hữu ích khi bạn muốn tạo một đợt phát ra giá trị sau một khoảng thời gian chờ đợi hoặc thực hiện các tác vụ định kỳ.
`timer(initialDelay: number | Date = 0, period: number = 0, scheduler: SchedulerLike = async): Observable<number>
`

- `initialDelay`: (tùy chọn) Thời gian chờ đợi trước khi phát ra giá trị đầu tiên. Mặc định là 0.
- `period`: (tùy chọn) Khoảng thời gian giữa các giá trị phát ra sau giá trị đầu tiên. Nếu period được đặt thành 0, Observable chỉ phát ra giá trị đầu tiên và sau đó hoàn thành. Nếu period là số dương, Observable sẽ tiếp tục phát ra giá trị theo khoảng thời gian này cho đến khi bạn hủy đăng ký. Mặc định là 0.
- `scheduler`: (tùy chọn) Scheduler để sử dụng để quản lý việc phát ra giá trị. Mặc định là async Scheduler.

## fromEvent

Trong RxJS, operator `fromEvent` được sử dụng để tạo một Observable mà lắng nghe các sự kiện từ một event target cụ thể. Event target có thể là một phần tử DOM, một đối tượng `EventEmitter` trong Node.js hoặc bất kỳ đối tượng nào hỗ trợ các phương thức đăng ký và hủy đăng ký các hàm xử lý sự kiện.
`fromEvent<T>(target: EventTargetLike, eventName: string, options?: EventListenerOptionsOrCapture, resultSelector?: (...args: any[]) => T, ): Observable<T>
`

- `target`: Event target mà bạn muốn lắng nghe sự kiện từ, có thể là một phần tử DOM, đối tượng EventEmitter, hoặc bất kỳ đối tượng nào hỗ trợ các phương thức đăng ký và hủy đăng ký hàm xử lý sự kiện.
- `eventName`: Tên của sự kiện mà bạn muốn lắng nghe.
- `options`: (tùy chọn) Các tùy chọn bổ sung khi đăng ký hàm xử lý sự kiện. Đây là một đối tượng có thể chứa các thuộc tính như capture (boolean) hoặc once (boolean).
- `resultSelector`: (tùy chọn) Một hàm chọn kết quả tùy chỉnh để xử lý giá trị trả về từ hàm xử lý sự kiện. Nếu được cung cấp, Observable sẽ phát ra giá trị được trả về bởi hàm chọn này, thay vì giá trị mặc định của sự kiện.

# Join Creation Operators

Trong RxJS, "Join Creation Operators" là một nhóm các toán tử sử dụng để kết hợp nhiều Observables thành một Observable mới. Chúng giúp bạn làm việc với nhiều Observables đồng thời và thực hiện các phép kết hợp, ghép và lọc dữ liệu từ các Observables khác nhau.

## combineLatest

Tạo một Observable mới bằng cách kết hợp các giá trị từ tất cả các Observables thành một mảng khi một trong các Observables phát ra một giá trị mới.

Toán tử này kết hợp các giá trị từ tất cả các Observables thành một mảng khi một trong các Observables phát ra một giá trị mới. Điều này đảm bảo rằng bạn luôn có một bản sao mới nhất của tất cả các giá trị từ các Observables.

## merge

Kết hợp nhiều Observables lại thành một Observable đơn giản bằng cách phát ra các giá trị liên tiếp từ các Observables gốc.

Toán tử này kết hợp nhiều Observables lại thành một Observable đơn giản bằng cách phát ra các giá trị liên tiếp từ các Observables gốc. Nó không kết hợp giá trị của các Observables lại thành một cách đồng thời như `combineLatest`.

# Transformation Operators

"Transformation Operators" là một nhóm các toán tử sử dụng để biến đổi và chuyển đổi dữ liệu của Observable từ một dạng sang dạng khác. Những toán tử này cho phép bạn thực hiện các phép biến đổi dữ liệu, lọc, sắp xếp, nhóm, hoặc kết hợp các giá trị từ các Observables thành dạng dữ liệu mới.

1. `map`: Biến đổi từng giá trị phát ra từ Observable thành giá trị mới thông qua một hàm chuyển đổi.

2. `mergeMap` (hay flatMap): Biến đổi mỗi giá trị phát ra từ Observable gốc thành một Observable khác, sau đó kết hợp tất cả các giá trị từ các Observable con lại thành một Observable duy nhất.

3. `concatMap`:

- Nhận vào một hàm  (function) dùng để chuyển đổi giá trị từ Observable gốc thành một Observable mới. Hàm này nhận vào value và index của value trong Observable gốc và trả về một Observable mới
- Khi gọi concatMap, nó chuyển đổi từng giá trị từ Observable gốc thành một Observable con, sau đó ghép nối các Observable con lại với nhau theo thứ tự chuỗi, chờ đến khi Observable con hiện tại hoàn thành trước khi chuyển đến Observable con tiếp theo.

4. `exhaustMap`:
Khi bạn sử dụng `exhaustMap`, nó sẽ thực hiện việc chuyển đổi của project trên giá trị đầu tiên từ Observable gốc. Trong quá trình chuyển đổi, nếu có thêm giá trị mới từ Observable gốc đến, `exhaustMap` sẽ bỏ qua chúng cho đến khi Observable mới chuyển đổi hoàn thành (complete).

5. `switchMap`: Khi có giá trị mới phát ra từ Observable, hủy đăng ký và chuyển đổi sang Observable mới tạo bởi giá trị đó.

6. `scan`: Áp dụng một hàm chức năng lên các giá trị phát ra từ Observable và tích lũy kết quả để tạo ra giá trị mới cho mỗi lần phát ra.

7. `groupBy`: Nhóm các giá trị phát ra từ Observable thành các nhóm dựa trên một thuộc tính cụ thể.

8. `buffer`: Gom nhóm các giá trị phát ra từ Observable thành các mảng (buffers) dựa trên một tín hiệu từ Observable khác.

9. `toArray`: Gom tất cả các giá trị phát ra từ Observable thành một mảng và phát ra mảng đó khi Observable hoàn thành.

# Filtering Operators

"Filtering Operators" là một nhóm các toán tử sử dụng để lọc dữ liệu của Observable dựa trên các điều kiện định sẵn. Những toán tử này cho phép bạn chọn lọc các giá trị phát ra từ Observable theo một số tiêu chí cụ thể, để chỉ phát ra những giá trị thỏa mãn điều kiện.

1. `filter`: Lọc các giá trị phát ra từ Observable dựa trên điều kiện định sẵn. Chỉ những giá trị thoả mãn điều kiện sẽ được phát ra.

2. `take`: Chỉ lấy một số lượng giá trị cụ thể đầu tiên phát ra từ Observable và sau đó tự động hoàn thành (complete) Observable.

3. `first`: Lấy giá trị đầu tiên phát ra từ Observable và sau đó tự động hoàn thành (complete) Observable.

4. `last`: Lấy giá trị cuối cùng phát ra từ Observable trước khi Observable hoàn thành.

5. `skip`: Bỏ qua một số lượng giá trị đầu tiên phát ra từ Observable, sau đó phát ra các giá trị tiếp theo.

6. `distinct`: Chỉ phát ra các giá trị duy nhất từ Observable, loại bỏ những giá trị trùng lặp.

7. `debounceTime`: Trì hoãn phát ra các giá trị từ Observable trong một khoảng thời gian nhất định, loại bỏ những giá trị không cần thiết.

8. `throttleTime`: Phát ra một giá trị từ Observable sau một khoảng thời gian nhất định và sau đó bỏ qua các giá trị trong khoảng thời gian đó.

9. `takeWhile`: Lấy các giá trị từ Observable cho đến khi một điều kiện không còn được thỏa mãn nữa.

10. `takeUntil`: Lấy các giá trị từ Observable cho đến khi một Observable khác phát ra giá trị hoặc hoàn thành.

# Error Handling Operators

"Error Handling Operators" là một nhóm các toán tử sử dụng để xử lý các lỗi (errors) phát sinh từ Observable. Những toán tử này cho phép bạn kiểm soát và xử lý các lỗi một cách linh hoạt trong quá trình xử lý các giá trị từ Observable.

1. `catchError` (hoặc catch): Xử lý các lỗi bằng cách thay thế chúng bằng một Observable khác hoặc phát ra một giá trị mặc định. Điều này cho phép Observable tiếp tục phát ra giá trị sau khi xử lý lỗi.

2. `retry`: Thử lại thực hiện một Observable khi xảy ra lỗi. Bạn có thể xác định số lần thử lại hoặc sử dụng một hàm điều kiện để quyết định khi nào dừng việc thử lại.

3. `retryWhen`: Tương tự như retry, nhưng cho phép bạn quyết định khi nào thử lại Observable dựa trên một Observable khác.

# Utility Operators

"Utility Operators" là một nhóm các toán tử sử dụng để thực hiện các tác vụ hữu ích liên quan đến việc quản lý Observable và dữ liệu từ Observable. Những toán tử này giúp bạn thực hiện các tác vụ như ghi log, chuyển đổi dữ liệu, tổng hợp các giá trị, hoặc kiểm tra các điều kiện trên Observable.

1. `tap`: Cho phép bạn thực hiện các tác vụ phụ (side effects) khi nhận được giá trị từ Observable, mà không ảnh hưởng đến giá trị chính của Observable.

2. `delay`: Trì hoãn việc phát ra các giá trị từ Observable trong một khoảng thời gian nhất định.

3. `delayWhen`: Trì hoãn việc phát ra các giá trị từ Observable dựa trên một Observable khác mà bạn cung cấp.

4. `dematerialize`: Chuyển đổi các thông báo Notification (Next, Error, Complete) trở lại thành giá trị ban đầu của chúng.

5. `materialize`: Chuyển đổi các giá trị của Observable thành các thông báo Notification (Next, Error, Complete).

6. `observeOn`: Thay đổi lịch trình trên đó các thông báo từ Observable được gửi đến các Observer.

7. `subscribeOn`: Thay đổi lịch trình trên đó các thuê bao đăng ký để nhận các thông báo từ Observable.

8. `timeInterval`: Chuyển đổi các giá trị của Observable thành các cặp giá trị thời gian, đo lường khoảng thời gian giữa các giá trị liên tiếp.

9. `timestamp`: Chuyển đổi các giá trị của Observable thành các cặp giá trị bao gồm giá trị ban đầu và thời gian khi giá trị đó được nhận.

10 `timeout`: Thêm một khoảng thời gian tối đa cho việc đợi các giá trị từ Observable. Nếu Observable không phát ra giá trị nào trong khoảng thời gian này, nó sẽ phát ra một lỗi.

11. `timeoutWith`: Tương tự như timeout, nhưng thay vì phát ra lỗi, nó sẽ chuyển đổi sang Observable khác mà bạn cung cấp.

12. `toArray`: Tập hợp tất cả các giá trị từ Observable vào một mảng và phát ra mảng đó khi Observable hoàn thành.

# Conditional and Boolean Operators

"Conditional and Boolean Operators" là một nhóm các toán tử sử dụng để thực hiện các tác vụ điều kiện và xử lý dữ liệu kiểu boolean từ Observable. Những toán tử này cho phép bạn kiểm tra và xử lý dữ liệu dựa trên các điều kiện và thuộc tính boolean của Observable.

1. `defaultIfEmpty`: Tạo một giá trị mặc định và phát ra nếu Observable không phát ra bất kỳ giá trị nào trước khi hoàn thành. Nếu Observable phát ra ít nhất một giá trị trước khi hoàn thành, toán tử này sẽ không làm gì cả và chỉ chuyển tiếp giá trị đó cho các thuê bao.

2. `every`: Kiểm tra xem tất cả các giá trị từ Observable có thỏa mãn một điều kiện hay không. Toán tử này sẽ phát ra true nếu tất cả các giá trị thỏa mãn điều kiện, ngược lại, nó sẽ phát ra false. Toán tử này chỉ phát ra giá trị cuối cùng sau khi Observable hoàn thành.

3. `find`: Tìm kiếm và phát ra giá trị đầu tiên trong Observable mà thỏa mãn một điều kiện cho trước. Nếu không có giá trị nào thỏa mãn điều kiện, nó sẽ hoàn thành mà không phát ra bất kỳ giá trị nào.

4. `findIndex`: Tìm kiếm và phát ra chỉ số đầu tiên của giá trị trong Observable mà thỏa mãn một điều kiện cho trước. Nếu không có giá trị nào thỏa mãn điều kiện, nó sẽ phát ra -1.

5. `isEmpty`: Kiểm tra xem Observable có phát ra bất kỳ giá trị nào hay không. Nếu không, nó sẽ phát ra true; ngược lại, nó sẽ phát ra false. Toán tử này chỉ phát ra giá trị cuối cùng sau khi Observable hoàn thành.

# Mathematical and Aggregate Operators

"Mathematical and Aggregate Operators" là một nhóm các toán tử dùng để thực hiện các phép tính toán học hoặc tổng hợp dữ liệu từ Observable.

1. `count`: Đếm số lượng giá trị phát ra từ Observable và phát ra kết quả là số lượng đó khi Observable hoàn thành.

2. `max`: Tìm giá trị lớn nhất trong các giá trị của Observable và phát ra giá trị lớn nhất đó khi Observable hoàn thành.

3. `min`: Tìm giá trị nhỏ nhất trong các giá trị của Observable và phát ra giá trị nhỏ nhất đó khi Observable hoàn thành.

4. `reduce`: Tích lũy các giá trị của Observable và phát ra kết quả cuối cùng khi Observable hoàn thành. Toán tử này sử dụng một hàm tổng hợp (accumulator) để tích lũy các giá trị.

# Multicasted Observables

Multicasted Observables là một loại Observable đặc biệt trong RxJS, được sử dụng để chia sẻ và đồng bộ hóa dữ liệu giữa nhiều thuê bao (subscribers). Khi bạn tạo một Observable thông thường và có nhiều thuê bao đăng ký để lắng nghe dữ liệu từ Observable đó, mỗi thuê bao sẽ nhận được một luồng dữ liệu riêng biệt và độc lập. Điều này có thể gây ra việc tạo ra nhiều luồng dữ liệu, đẩy tăng công việc thực thi và tài nguyên sử dụng.

Để giải quyết vấn đề này và chia sẻ cùng một luồng dữ liệu cho nhiều thuê bao, ta có thể sử dụng các toán tử multicast. Cụ thể, một Multicasted Observable là một Observable đa thuê bao, có thể chia sẻ cùng một luồng dữ liệu giữa nhiều thuê bao. Nó sử dụng một subject (Subject hoặc BehaviorSubject) để chia sẻ dữ liệu giữa các thuê bao, giúp tránh việc tạo nhiều luồng dữ liệu.

# Multicasting Operators

Multicasting Operators được sử dụng để biến một Cold Observable (Observable mà thực thi lại từ đầu cho mỗi thuê bao) thành một Hot Observable (Observable mà thực thi một lần và chia sẻ kết quả cho các thuê bao sau đó). Chúng là các toán tử multicast, giúp chia sẻ cùng một luồng dữ liệu giữa nhiều thuê bao, tránh việc tạo nhiều luồng dữ liệu và tối ưu hóa hiệu suất.

1. `multicast`: Biến một Cold Observable thành một Multicasted Observable bằng cách sử dụng một Subject hoặc một factory function để tạo ra một Subject. Ta có thể sử dụng các toán tử chuyển đổi khác nhau trên Multicasted Observable trước khi kết nối (connect) nó.

2. `publish`: Biến một Cold Observable thành một Multicasted Observable và sử dụng một Subject để chia sẻ dữ liệu giữa các thuê bao. Toán tử này tương đương với multicast nhưng sử dụng một Subject đã được cung cấp sẵn (không cần phải tạo mới).

3. `publishBehavior`: Biến một Cold Observable thành một Multicasted Observable và sử dụng một BehaviorSubject để chia sẻ dữ liệu giữa các thuê bao. BehaviorSubject giữ giá trị hiện tại và phát tất cả giá trị mới cho các thuê bao sau khi đăng ký.

4. `publishLast`: Biến một Cold Observable thành một Multicasted Observable và sử dụng một AsyncSubject để chia sẻ dữ liệu giữa các thuê bao. AsyncSubject chỉ phát ra giá trị cuối cùng khi Observable hoàn thành.

5. `publishReplay`: Biến một Cold Observable thành một Multicasted Observable và sử dụng một ReplaySubject để chia sẻ dữ liệu giữa các thuê bao. ReplaySubject giữ một số lượng cố định các giá trị gần nhất và phát lại chúng cho các thuê bao mới đăng ký.

6. `share`: Biến một Cold Observable thành một Multicasted Observable và sử dụng một Subject để chia sẻ dữ liệu giữa các thuê bao. Tuy nhiên, toán tử share tự động chọn loại Subject phù hợp (BehaviorSubject hoặc ReplaySubject) dựa trên sự kiện hoàn thành và lỗi của Observable.

# Subject

Subject là một đối tượng đặc biệt có thể hoạt động như một Observable và một Observer đồng thời. Nó cho phép bạn phát ra giá trị và sự kiện (next, error, complete) và cũng có thể đăng ký nhận giá trị và sự kiện từ các Observable khác.

Mỗi Subject cũng là một Observable. Khi bạn có một Subject, bạn có thể đăng ký vào nó bằng cách cung cấp một Observer, và Observer này sẽ bắt đầu nhận giá trị như một Observable thông thường.

Bên trong Subject, việc đăng ký bằng phương thức subscribe không gây ra việc thực thi mới để gửi giá trị. Nó chỉ đơn giản là đăng ký Observer được cung cấp vào một danh sách các Observers, tương tự như cách addListener thường hoạt động trong các thư viện và ngôn ngữ khác.

Mỗi Subject cũng là một Observer. Nó là một đối tượng với các phương thức next(v), error(e), và complete(). Để đưa giá trị mới vào Subject, bạn chỉ cần gọi next(theValue), và giá trị này sẽ được multicast đến các Observers đã đăng ký lắng nghe Subject.

## BehaviorSubject

- Lưu giữ giá trị hiện tại và phát tất cả các giá trị mới cho tất cả các thuê bao đã đăng ký sau đó.
- Yêu cầu một giá trị ban đầu khi tạo mới.
- Phát tất cả các giá trị được phát ra cho mỗi thuê bao mới đăng ký.
- Giá trị cuối cùng của BehaviorSubject sẽ được gửi đến mỗi thuê bao sau khi họ đăng ký.
  `const behaviorSubject = new BehaviorSubject(0);`

## ReplaySubject

- Giữ lại một số lượng cố định các giá trị gần nhất và phát lại chúng cho tất cả các thuê bao đã đăng ký sau đó.
- Bạn có thể chỉ định số lượng giá trị gần nhất mà ReplaySubject sẽ giữ lại khi tạo mới.
- Phát lại lịch sử các giá trị gần nhất cho mỗi thuê bao mới đăng ký.
  Ví dụ: `const replaySubject = new ReplaySubject(3);`
  (lưu trữ 3 giá trị gần nhất).

## AsyncSubject

- Chỉ phát ra giá trị cuối cùng của Observable khi nó hoàn thành.
- Nếu Observable gặp lỗi hoặc chưa hoàn thành, AsyncSubject sẽ không phát ra bất kỳ giá trị nào.
- Đảm bảo chỉ phát ra giá trị cuối cùng cho tất cả các thuê bao sau khi Observable hoàn thành.
  Ví dụ: `const asyncSubject = new AsyncSubject();`
