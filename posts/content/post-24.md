# Code Feedback Session 3

## 강우성

``` c#
if (UnityEngine.EventSystems.EventSystem.current.IsPointerOverGameObject() == false)
```

* 위와 같은 코드의 경우 using 선언문을 사용하는 것을 추천.
* `GameObject.Find(\"Background\").transform.position`에서 `Find( )`는 최적화 문제로 사용하지 말 것.
* 유니티 singleton 패턴을 알아보고 이렇게 생성된 컴포넌트에 접근하는 방법을 공부할 것.
* Update 구문에서 실시간으로 현재 상태를 업데이트하는 흐름을 확인된다. 코드를 살펴보면, 중복되거나 유사한 역할을 하는 부분들이 있어 일부 함수는 통합이 가능해 보인다.
* 가독성을 높이기 위해 한 단계 더 캡슐화하는 것도 좋은 방법이다