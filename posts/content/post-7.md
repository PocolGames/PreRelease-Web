# Code Feedback Session 2

## 신성현 프로그래머

* `Manager` 스크립트의 개수가 너무 많다.
* 2주 프로젝트라는 특성을 고려했을 때, 짧은 기간 내에 개발해야 하므로 `GameManager` 스크립트에 통합하여 관리하는 것도 좋은 방법이었을 것이다.
* 지나치게 미래 지향적인 코딩을 한 것이 아닌가 생각된다.
* 현재 `Manager` 스크립트들이 모두 싱글톤 패턴을 사용하며, 파괴되지 않는 오브젝트로 설정된 것인지 궁금하다.
* `Text` 컴포넌트는 현재 사용되지 않는 레거시 코드다. 유니티에서는 과거 버전과의 호환성을 위해 남겨둔 기능이므로, 사용을 권장하지 않는다.
* 현재는 `TextMeshPro`를 사용하는 것이 유니티 공식 문서에서도 권장된다.
* 대화 기능 구현 방식에서 `Text Asset`을 이용하여 `Split()` 함수를 사용했는데, 이는 레거시 방식이다.
* `Text Asset`을 이용한 `Split()` 방식은 다국어화를 진행할 경우 매우 복잡해지고 문제가 발생할 가능성이 크다.
* 대화 기능의 경우 다국어 지원이 필요하기 때문에, Unity의 `Localization Package Manager`를 사용하는 것이 더 적절하다.

``` csharp
GameObject.Find("QuestManager").GetComponent<QuestManager>().ReadQuestFile();
```
* 위 코드에서 `Find()` 함수는 성능이 매우 좋지 않다