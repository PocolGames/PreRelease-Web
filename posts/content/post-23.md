# Code Feedback Session 3

## 조현성

* 커밋 메시지를 더 상세하게 적을 것.
* `public Vector3 moveOffset = new Vector3(0f, 3f, 0f);`의 경우 `public`으로 선언하고 초기화한 것을 볼 수가 있는데, 이 경우 유니티 Inspector에서 변경을 하게 되면 코딩으로 초기화하는 구문이 적용이 안되니까 주의해야 한다.