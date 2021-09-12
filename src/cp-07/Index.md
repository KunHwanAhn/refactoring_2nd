# 챕터7. 캡슐화
- 챕터7 코드 추가(PR [#13](https://github.com/KunHwanAhn/refactoring_2nd/pull/13))

## 7.1 레코드 캡슐화하기


### 절차
1. 레코드를 담은 변수를 캡슐화한다.
2. 레코드를 감싼 단순한 클래스로 해당 변수의 내용을 교체한다. 이 클래스에 원본 레코드를 반환하는 접근자도 정의하고, 변수를 캡슐화하는 함수들이 이 접근자를 사용하도록 수정한다.
3. 테스트한다.
4. 원본 레코드 대신 새로 정의한 클래스 타입의 객체를 반환하는 함수들을 새로 만든다.
5. 레코드를 반환하는 예전 함수를 사용하는 코드를 `4`에서 만든 새 함수를 사용하도록 바꾼다. 필드에 접근할 때는 객체의 접근자를 사용한다. 적절한 접근자가 없다면 추가한다. 한 부분을 바꿀 때마다 테스트한다.
6. 클래스에서 원본 데이터를 반환하는 접근자와 (`1`에서 검색하기 쉬운 이름을 붙여둔) 원본 레코드를 반환하는 함수들을 제거한다.
7. 테스트한다.
8. 레코드의 필드도 데이터 구조인 중첩 구조라면 레코드 캡슐화하기와 컬렉션 캡슐화하기를 재귀적으로 적용한다.

### 예시1 - 간단한 레코드 캡슐화하기

```diff
- const organization = { name: '애크미 구스배리', country: 'GB' };
+ class Organization {
+   constructor(data) {
+     this.name = data.name;
+     this.country = data.country;
+   }
+
+   get name() { return this.name; }
+
+   set name(aString) { this.name = aString; }
+
+   get country() { return this.country; }
+
+   set country(aCountryCode) { this.country = aCountryCode; }
+ }
```

## 7.2 컬렉션 캡슐화하기
- 컬렉션에 대해서는 어느 정도 강박증을 갖고 불필요한 복제본을 만드는 편이, 예상치 못한 수정이 촉발한 오률를 디버깅하는 것보다 낫다.

### 절차
1. 아직 컬렉션을 캡슐화하지 않았다면 변수 캡슐화하기부터 한다.
2. 컬렉션에 원소를 추가/제거하는 함수를 추가한다.
3. 정적 검사를 수행한다.
4. 컬렉션을 참조하는 부분을 모두 찾는다. 컬렉션의 변경자를 호출하는 코드가 모두 앞에서 추가한 추가/제거 함수를 호출하도록 수정한다. 하나씩 수정할 때마다 테스트한다.
5. 컬렉션 게터를 수정해서 원본 내용을 수정할 수 없는 읽기전용 프락시나 복제본을 반환하게 한다.
6. 테스트한다.

### 예시1
```diff
class Person {
  constructor(name) {
    this.name = name;
    this.courses = [];
  }

  get courses() { return this.courses; }

-   set courses(aList) { this.courses = aList; }
+   set courses(aList) { this.courses = aList.slice(); }

+   addCourse(aCourse) { this.courses.push(aCourse); }
+
+   removeCourse(aCourse, fnIfAbsent = () => { throw new RangeError(); }) {
+     const index = this.courses.indexOf(aCourse);
+
+     if (index === -1) {
+       fnIfAbsent();
+     } else {
+       this.courses.splice(index, 1);
+     }
+   }
}
```

## 7.3 기본형을 객체로 바꾸기

### 절차
1. 아직 변수를 캡슐화하지 않았다면 캡슐화한다.
2. 단순한 값 클래스를 만든다. 생성자는 기존 값을 인수로 받아서 저장하고, 이 값을 반환하는 게터를 추가한다.
3. 정적 검사를 수행한다.
4. 값 클래스의 인스턴스를 새로 만들어서 필드에 저장하도록 세터를 수정한다. 이미 있다면 필드의 타입을 적절히 변경한다.
5. 새로 만든 클래스의 게터를 호출한 결과를 반환하도록 게터를 수정한다.
6. 테스트한다.
7. 함수 이름을 바꾸면 원본 접근자의 동작을 더 잘 드러낼 수 있는지 검토한다.

### 예시1
```diff
- orders.filter((o) => o.priority === 'high' || o.priority === 'rush');
+ orders.filter((o) => o.priority.higherThan(new Priority('normal')));
```

## 7.4 임시 변수를 질의 함수로 바꾸기

### 절차
1. 변수가 사용되기 전에 값이 확실히 결정되는지, 변수를 사용할 때마다 계산 로직이 매번 다른 결과를 내지는 않는지 확인한다.
2. 읽기전용으로 만들 수 있는 변수는 읽기전용으로 만든다.
3. 테스트한다.
4. 변수 대입문을 함수로 추출한다.
5. 테스트한다.
6. 변수 인라인하기로 임시 변수를 제거한다.

```diff
class Order {
  constructor(quantity, item) {
    this.quantity = quantity;
    this.item = item;
  }

-   get price() {
-     const basePrice = this.quantity * this.item.price;
-     let discountFactor = 0.98;
-
-     if (basePrice > 1000) {
-       discountFactor -= 0.03;
-     }
-
-     return basePrice * discountFactor;
-   }
+   get basePrice() { return this.quantity * this.item.price; }
+
+   get discountFactor() {
+     let discountFactor = 0.98;
+
+     if (this.basePrice > 1000) {
+       discountFactor -= 0.03;
+     }
+
+     return discountFactor;
+   }
+
+   get price() {
+     return this.basePrice * this.discountFactor;
+   }
}
```

## 7.5 클래스 추출하기

### 절차
1. 클래스의 역할을 분리할 방법을 정한다.
2. 분리될 역할을 담당할 클래스를 새로 만든다.
3. 원래 클래스의 생성자에서 새로운 클래스의 인스턴스를 생성하여 필드에 저장해둔다.
4. 분리될 역할에 필요한 필드드을 새 클래스로 옮긴다(`필드 옮기기`). 하나씩 옮길 때마다 테스트한다.
5. 메서드들도 새 클래스로 옮긴다(`함수 옮기기`). 이때 저수준 메서드, 즉 다른 메서드를 호출하기보다는 호출을 당하는 일이 많은 메서드부터 옮긴다. 하나씩 옮길 때마다 테스트한다.
6. 양쪽 클래스의 인터페이스를 살펴보면서 불필요한 메서드를 제거하고, 이름도 새로운 환경에 맞게 바꾼다.
7. 새 클래스를 외부로 노출할지 정한다. 노출하려거든 새 클래스에 `참조를 값으로 바꾸기`를 적용할지 고민해본다.

### 예시1

```diff
class Person {
-   get officeAreaCode() { return this.officeAreaCode; }
+   get officeAreaCode() { return this.telephoneNumber.areaCode; }

-   get officeNubmer() { return this.officeNubmer; }
+   get officeNubmer() { return this.telephoneNumber.nubmer; }
+
+   get telephoneNumber() { return this.telephoneNumber.toString() }
}

+ class TelephoneNumber {
+   get areaCode() { return this.areaCode; }
+
+   get number() { return this.number; }
+
+   toString() { return `(${this.areaCode}) ${this.number}`; }
+ }
```

## 7.6 클래스 인라인하기

### 절차
1. 소스 클래스의 각 public 메서드에 대응하는 메서드들을 타깃 클래스에 생성한다. 이 메서드들은 단순히 작업을 소스 클래스로 위임해야 한다.
2. 소스 클래스의 메서드를 사용하는 코드를 모두 타깃 클래스의 위임 메서드를 사용하도록 바꾼다. 하나씩 바꿀 때마다 테스트한다.
3. 소스 클래스의 메서드와 필드를 모두 타깃 클래스로 옮긴다. 하나씩 옮길 때마다 테스트한다.
4. 소스 클래스를 삭제하고 조의를 표한다.

### 예시1
```diff
class Person {
-   get officeAreaCode() { return this.telephoneNumber.areaCode; }
+   get officeAreaCode() { return this.officeAreaCode; }

-   get officeNubmer() { return this.telephoneNumber.nubmer; }
+   get officeNubmer() { return this.officeNubmer; }
}

- class TelephoneNumber {
-   get areaCode() { return this.areaCode; }
-
-   get number() { return this.number; }
- }
```
