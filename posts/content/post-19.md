# Code Feedback Session 3

## 강우성

* `NullReferenceException`오류가 발생하고 있습니다. 해당 오류는 객체가 `null`인 상태에서 접근하려고 할 때 발생합니다. 이 오류를 해결하기 위해서는 해당 객체가 `null`인지 확인하고, `null`이 아닐 경우에만 접근하도록 코드를 수정해야 합니다.
* UI에서 `Text Component`는 현재는 절대 사용하지 않는 레거시 코드입니다. `TextMeshPro`를 사용하는 것이 좋습니다.
            