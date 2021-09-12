# 챕터7. 캡슐화
-

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

