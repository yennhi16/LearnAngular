# Introduction
- Template-driven Forms: Cơ chế hoạt động của dạng forms này sẽ chủ yếu dựa vào các directives trên template như `NgForm`, `NgModel`, `required`, etc; để làm việc. Form dạng này sử dụng Two-way binding để update data model giữa template và component.
- Reactive Forms: Chúng ta sẽ xây dựng form từ các model, là các object có một số chức năng đặc biệt để quản lý được các form input. Nó cũng sử dụng một số (nhưng rất ít) các directives.

# Validation status

Validation status cho một control sẽ bao gồm các status sau:

- touched: `true` nếu người dùng đã focus vào control (như là input, textarea, etc) rồi sau đó blur khỏi control đó. Hoặc khi gọi markAsTouched.
- untouched: `true` nếu người dùng chưa đụng chạm gì đến control hoặc lần đầu tiên focus và chưa bị mất focus (ngược lại với touched)
- dirty: `true` nếu người dùng đã thay đổi value của control – nhập một ký tự vào input text chẳng hạn, kể cả việc nhập vào rồi xóa đi thì cũng tính là đã thay đổi.
- pristine: `true` nếu người dùng chưa thay đổi value của control, mặc dù có thể đã touched, nhưng chưa sửa đổi gì.

Tự động sao chép nhiều thuộc tính của control vào phần tử form control thông qua các class CSS. Có thể sử dụng các class này để tùy chỉnh giao diện của các phần tử form control dựa trên trạng thái của biểu mẫu.
`.ng-valid`
`.ng-invalid`
`.ng-pending`
`.ng-pristine`
`.ng-dirty`
`.ng-untouched`
`.ng-touched`
`.ng-submitted`
# Validate Forms with Reactive Forms

Có 2 loại validator function

## Sync validators 
Đây là các function để validate thường gặp, sẽ nhận đầu vào là một form control và trả về ngay lập tức:
- Một danh sách các validation errors.
- Hoặc null tức là control này ko có lỗi gì.

## Async validators 
Đây là các validate function sẽ trả về Promise hoặc Observable mà kết quả sẽ được emit trong tương lai. Ví dụ như bạn muốn validate xem username nhập vào đã có trong hệ thống hay chưa. Thì bắt buộc bạn phải gửi một yêu cầu lên server để làm việc này, HTTP request thường sẽ trả về Promise/Observable.

Khi khởi tạo `FormControl` thì async validators sẽ được truyển vào ở argument số 3.