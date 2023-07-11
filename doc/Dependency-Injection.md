# Dependency Injection

## Khái niệm

Dependency injection (DI) giúp tách một class độc lập với các biến phụ thuộc. Dependency là một loại quan hệ giữa 2 class mà trong đó một class hoạt động độc lập và class còn lại phụ thuộc bởi class kia.
Dependency Injection có thể được thực hiện dựa trên các quy tắc:

- Các class sẽ không phụ thuộc trực tiếp lẫn nhau mà thay vào đó chúng sẽ liên kết với nhau thông qua một Interface
- Việc khởi tạo các class sẽ do các Interface quản lí thay vì class phụ thuộc nó

Nhiệm vụ của Dependency Injection là:

- Tạo ra các object.
- Biết được class nào cần những object đấy.
- Cung cấp cho những class đó những object chúng cần

## DI trong Angular

DI được kết nối với Angular framework và cho phép các lớp có Angular decorators, như Components, Directives, Pipes, and Injectablesm định cấu hình các phụ thuộc mà chúng cần.
Hai vai trò chính tồn tại trong hệ thống DI: dependency consumer and dependency provider.

Angular tạo điều kiện cho sự tương tác giữa dependency consumer và dependency provider bằng cách sử dụng một abstraction có tên là Injector. Khi một dependency được yêu cầu, bộ tiêm sẽ kiểm tra xem liệu đã có một phiên bản nào ở đó chưa. Nếu không, một phiên bản mới sẽ được tạo và lưu trữ trong registry. Angular tạo một injector cho toàn ứng dụng (còn được gọi là injector "root") trong quá trình khởi động ứng dụng.

### Cách DI trong Angular hoạt động

- Đâu tiên thì depedency sẽ phải đăng ký với Provider trước và `@Injectable()` sẽ đánh dấu lớp dịch vụ đó để có thể inject. Điều này được thực hiện trong metadata Provider của Injector.
- Bộ injector sẽ chịu trách nhiệm tạo instance của lớp dịch vụ và đưa chúng vào các lớp lớp phụ thuộc
- Một Provider sẽ nói cho injector làm thế nào để tạo instance của lớp service. sẽ phải config injector trước với provider khi mà injector có thể tạo instance của lớp service (Hay trước khi cung câp bât ky một dịch vụ nào).
- Một Provider có thể là chính lớp dịch vụ do đó bộ injector có thể sử dụng new để tạo instance . Bạn cũng có thể tạo nhiều lớp để cung cấp cùng một dịch vụ theo nhưng với các config khác với với các Provider khác nhau.
- Injector được kế thừa thì nó có thể yêu cầu injector cha của nó để sử dụng. Một Component có thể sử dụng dịch vụ từ injector của nó , nhận từ injetor của component cha nó, từ injector của `NgModule` hoặc root injector.
- Injector đọc các dependencies từ Constructor(Component) của Consumer và tìm kiếm dependency trong provider. Provider sẽ cung cấp instance và injector, sau đó sẽ được inject vào Consumner (Component). Nếu instance của dependency đã tồn tại thì nó sẽ được sử dụng lại để tạo thành dependecy singleton.

### Providing dependency

Ở cấp độ Component, sử dụng `providers ` của decorator `@Component`. Trong trường hợp này, class serviece sẽ có sẵn cho tất cả các instancesn của Componentn này cũng như các Component và directives khác được sử dụng.

```
@Component({
  selector: 'hero-list',
  template: '...',
  providers: [HeroService]
})
class HeroListComponent {}
```

Ở cấp độ NgModule, sử dụng trường `providers` của trình trang trí `@NgModule`. Trong trường hợp này, class serviece có sẵn cho tất cả các Component, directives, and pipesn được khai báo trong NgModule này hoặc NgModule khác nằm trong cùng ModuleInjector áp dụng cho NgModule này. Khi đăng ký một nhà provider với một NgModule cụ thể, cùng một phiên bản của service sẽ có sẵn cho tất cả các components, directives and pipes.

```
@NgModule({
  declarations: [HeroListComponent]
  providers: [HeroService]
})
class HeroListModule {}
```

Ở croot level, cho phép đưa nó vào các lớp khác trong ứng dụng. Điều này có thể được thực hiện bằng cách thêm trường`poweredIn: 'root'`vào decorator `@Injectable`.

```
@Injectable({
  providedIn: 'root'
})
class HeroService {}
```

Đăng ký provider trong `@Injectable` metadata cũng cho phép Angular tối ưu hóa ứng dụng bằng cách xóa service ra ứng dụng đã biên dịch nếu dịch vụ đó không được sử dụng, một quá trình được gọi là tree-shaking.

### Injecting a dependency

Cách phổ biến nhất để đưa vào một dependency là khai báo nó trong constructoo của lớp. Khi Angular tạo một instance mới của một lớp component, directive, or pipe classg, nó sẽ xác định services nào hoặc các phụ thuộc khác mà lớp đó cần bằng cách xem các loại tham số của constructor.

```
@Component({ … })
class HeroListComponent {
  constructor(private service: HeroService) {}
}
```

### Creating an injectable service

Chạy lệnh: `ng generate service heroes/hero`

- Services can depend on other services

```
export class HeroService {
  private heroes: Hero[] = [];
  constructor(
    private backend: BackendService,
    private logger: Logger) { }
}
```

### Quản lý vòng đời (lifetime) Service

Bất cứ khi nào chúng ta yêu cầu service, DI Container sẽ quyết định xem có tạo mới một instance hay sử dụng lại instance đã tạo từ trước đó.
Có 3 mức độ vòng đời

- Transient: Một instance luôn được tạo, mỗi khi được yêu cầu.
- Scoped: Tạo một instance mới cho tất cả các scope (Mỗi request là một scope). Trong scope thì service được dùng lại
- Singleton: Service được tạo chỉ một lần duy nhất

**Một số sự kiện quan trọng trong lifecycle của DI trong Angular**

1. Tạo một instance của service: Khi một thành phần hoặc service khác yêu cầu một instance của một service, DI sẽ kiểm tra xem có một instance đã tồn tại hay không. Nếu không, DI sẽ tạo một instance mới của service đó.

2. Cung cấp dependencies: Sau khi tạo instance của service, DI sẽ tiếp tục quá trình cung cấp các dependencies cho service đó. Điều này đảm bảo rằng các dependencies đã được tạo và cung cấp cho service trước khi nó được sử dụng.

3. Hierarchy (cấp bậc): DI trong Angular hoạt động theo nguyên tắc cấp bậc (hierarchy). Nghĩa là nếu không tìm thấy một dependency trong scope hiện tại, DI sẽ tiếp tục tìm kiếm trong scope cha, và tiếp tục cho đến khi tìm thấy hoặc đạt đến scope root.

**Destroyed Dependency Injection**

Dependency Injection (DI) sẽ bị hủy (destroyed) khi một scope hoặc thành phần liên quan đến nó bị hủy.

1. Hủy thành phần: Khi một thành phần được tạo và sử dụng DI, khi thành phần đó bị hủy, DI cũng sẽ bị hủy. Ví dụ, khi bạn đóng một trang hoặc xóa một thành phần khỏi ứng dụng, DI sẽ bị hủy theo đó.

2. Hủy scope: DI trong Angular hoạt động dựa trên cấp bậc (hierarchy). Khi một scope bị hủy, tất cả các DI bên trong scope đó sẽ bị hủy theo. Ví dụ, khi bạn hủy một component hoặc module, DI trong scope đó sẽ bị hủy.

3. Cập nhật DI container: Nếu DI container của Angular bị cập nhật hoặc tái tạo (recreated), DI cũng sẽ bị hủy và được tạo lại theo cấu hình mới. Điều này có thể xảy ra khi bạn thay đổi cấu hình ứng dụng hoặc cập nhật phiên bản của Angular.

4. Hủy dependencies: Nếu một dependency bị hủy, DI cũng có thể bị ảnh hưởng. Ví dụ, nếu một service bị hủy, các thành phần sử dụng service đó thông qua DI cũng có thể không còn sử dụng được.
