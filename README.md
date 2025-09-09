# PreRelease - 사용 가이드 📚

## 🎯 개요
PreRelease는 Twitter 스타일의 블랙 테마 SNS 홈페이지입니다. 페이지네이션과 무한 스크롤을 지원하여 많은 포스팅도 효율적으로 관리할 수 있습니다.

## 📁 폴더 구조
```
PR_Web/
├── index.html              # 메인 페이지
├── css/
│   ├── style.css          # 메인 스타일
│   └── responsive.css     # 반응형 디자인
├── js/
│   ├── main.js           # 메인 JavaScript
│   ├── markdown.js       # Markdown 파서
│   └── post-manager.js   # 포스팅 관리 도구
├── images/               # 이미지 파일들
├── posts/
│   ├── metadata.json     # 전체 포스팅 정보
│   ├── page-1.json      # 최신 20개 포스팅
│   ├── page-2.json      # 그 다음 20개 포스팅
│   └── ...              # 추가 페이지들
└── README.md             # 이 파일
```

## ⚡ 새로운 성능 특징

### 📈 페이지네이션 시스템
- **빠른 초기 로딩**: 첫 20개 포스팅만 로드
- **무한 스크롤**: 스크롤 시 자동으로 다음 페이지 로드
- **메모리 효율성**: 필요한 만큼만 로드하여 메모리 절약
- **확장성**: 수천 개의 포스팅도 문제없이 처리

### 🗂️ 파일 구조 개선
- **작은 파일 크기**: 각 페이지 파일이 독립적으로 관리
- **빠른 편집**: 특정 포스팅 수정 시 해당 페이지만 편집
- **안정성**: 하나의 페이지 문제가 전체에 영향 주지 않음

## ✍️ 새 포스팅 추가하기

### 방법 1: 수동 추가 (간단한 방법)

#### 1단계: 이미지 준비 (선택사항)
- 사용할 이미지들을 `images/` 폴더에 복사
- 지원 형식: JPG, PNG, GIF, WebP
- 권장 크기: 800x600 이상

#### 2단계: 첫 번째 페이지에 포스팅 추가
`posts/page-1.json` 파일을 열고 `posts` 배열의 **맨 앞에** 새 포스팅을 추가:

```json
{
    "page": 1,
    "hasMore": false,
    "posts": [
        {
            "id": 6,
            "date": "2025-09-10",
            "content": "# 새로운 포스팅 🎉\n\n**내용을 여기에** 작성하세요!",
            "images": [
                "images/new-photo.jpg"
            ]
        },
        // ... 기존 포스팅들
    ]
}
```

#### 3단계: 메타데이터 업데이트
`posts/metadata.json` 파일에서 총 포스팅 수 증가:

```json
{
    "totalPosts": 6,
    "totalPages": 1,
    "postsPerPage": 20,
    "lastUpdated": "2025-09-10T12:00:00Z",
    "latestPostDate": "2025-09-10"
}
```

#### 4단계: 20개 초과 시 페이지 분할
한 페이지에 20개가 넘으면 `page-2.json` 생성하여 분할:

**page-1.json** (최신 20개):
```json
{
    "page": 1,
    "hasMore": true,
    "posts": [/* 최신 20개 */]
}
```

**page-2.json** (그 다음 포스팅들):
```json
{
    "page": 2,
    "hasMore": false,
    "posts": [/* 나머지 포스팅들 */]
}
```

### 방법 2: 자동 도구 사용 (개발자용)

브라우저 개발자 도구에서 다음 코드 실행:

```javascript
// 새 포스팅 데이터
const newPost = {
    date: "2025-09-10",
    content: `# 새로운 포스팅 🎉

이것은 **새로운 포스팅**입니다!

## 특징
- 자동으로 최상단에 배치됩니다
- 페이지네이션이 자동으로 처리됩니다

> 정말 간편하죠? ✨`,
    images: [
        "images/new-photo-1.jpg",
        "images/new-photo-2.jpg"
    ]
};

// 포스트 매니저로 추가 (콘솔에 업데이트된 JSON 출력)
const postManager = new PostManager();
postManager.addNewPost(newPost);
```

## 📝 Markdown 문법 가이드

### 제목
```markdown
# 큰 제목
## 중간 제목
### 작은 제목
```

### 텍스트 스타일
```markdown
**굵은 글씨**
*기울임*
`인라인 코드`
```

### 링크
```markdown
[링크 텍스트](https://example.com)
```

### 리스트
```markdown
- 순서없는 리스트
- 두 번째 항목

1. 순서있는 리스트
2. 두 번째 항목
```

### 인용구
```markdown
> 이것은 인용구입니다
```

### 코드 블록
```markdown
```javascript
console.log("Hello World!");
```
```

### 수평선
```markdown
---
```

## 🖼️ 이미지 기능

### 이미지 개수별 레이아웃
- **1장**: 전체 너비
- **2장**: 2x1 그리드
- **3장**: 좌측 큰 이미지 + 우측 2개 작은 이미지
- **4장**: 2x2 그리드
- **5장 이상**: 2x2 그리드 + "+숫자" 표시

### 이미지 클릭
- 이미지를 클릭하면 큰 모달창에서 볼 수 있습니다
- ESC 키 또는 배경 클릭으로 닫을 수 있습니다

## 🛠️ 고급 관리

### 포스팅 편집
1. 해당 포스팅이 있는 페이지 파일 찾기
2. JSON에서 해당 포스팅 객체 수정
3. 파일 저장 후 브라우저 새로고침

### 포스팅 삭제
1. 해당 페이지에서 포스팅 객체 제거
2. 페이지가 비어있으면 파일 삭제
3. `metadata.json`에서 `totalPosts` 감소

### 백업 전략
```bash
# 정기적으로 posts 폴더 백업
cp -r posts posts_backup_$(date +%Y%m%d)
```

## 🎨 커스터마이징

### 색상 변경
`css/style.css` 파일에서 다음 색상들을 수정:
- `#000000`: 배경색
- `#ffffff`: 텍스트 색
- `#1d9bf0`: 포인트 색상 (로고, 링크 등)
- `#71767b`: 보조 텍스트 색
- `#2f2f2f`: 경계선 색

### 페이지 크기 조정
`posts/metadata.json`에서 `postsPerPage` 값 변경 (기본값: 20)

### 폰트 변경
`css/style.css`의 `font-family` 속성을 수정

## 🚀 성능 최적화 팁

### 이미지 최적화
- 이미지 압축 사용 (TinyPNG, ImageOptim 등)
- WebP 포맷 사용 권장
- 적절한 해상도 유지 (800-1200px 폭)

### 페이지 로딩 최적화
- 페이지당 포스팅 수를 15-25개로 유지
- 불필요한 이미지 제거
- 텍스트 압축 사용

### 캐싱 전략
```html
<!-- 서버에서 캐시 헤더 설정 -->
Cache-Control: public, max-age=3600
```

## 🌐 배포하기

### GitHub Pages
1. GitHub 저장소에 업로드
2. Settings > Pages에서 배포 설정
3. `index.html`이 루트에 있는지 확인

### Netlify
1. 폴더를 zip으로 압축
2. Netlify에 드래그 앤 드롭
3. 자동으로 배포됩니다

### 일반 웹 호스팅
- 모든 파일을 웹 서버의 public 폴더에 업로드

## 📊 모니터링

### 성능 확인
- 브라우저 개발자 도구 > Network 탭에서 로딩 시간 확인
- Lighthouse로 성능 점수 측정

### 사용자 경험
- 다양한 기기에서 테스트
- 네트워크 속도별 테스트

## 🆘 문제 해결

### 포스팅이 보이지 않을 때
1. `posts/metadata.json`과 `page-1.json` 문법 확인
2. 브라우저 개발자 도구(F12)에서 Network 탭 확인
3. JSON 파일이 올바르게 로드되는지 확인

### 무한 스크롤이 작동하지 않을 때
1. `hasMore` 값이 올바른지 확인
2. 페이지 파일들이 순서대로 있는지 확인
3. 콘솔에서 JavaScript 오류 확인

### 이미지가 로드되지 않을 때
1. 파일 경로와 이름 확인 (대소문자 구분)
2. 이미지 파일이 `images/` 폴더에 있는지 확인
3. 네트워크 탭에서 404 오류 확인

## 💡 고급 팁

### SEO 개선
- 포스팅에 제목 추가 시 메타 태그 업데이트
- 사이트맵 생성 고려

### 성능 모니터링
```javascript
// 로딩 시간 측정
console.time('Page Load');
// ... 포스팅 로드 후
console.timeEnd('Page Load');
```

### 자동화 스크립트
포스팅 추가를 자동화하는 Node.js 스크립트 작성 가능:

```javascript
// add-post.js 예시
const fs = require('fs');
const path = require('path');

function addPost(newPost) {
    // JSON 파일 읽기/쓰기 로직
    // 자동 페이지네이션 처리
}
```

## 📞 지원

### 문제 진단 체크리스트
1. ✅ JSON 파일 문법이 올바른가?
2. ✅ 이미지 파일이 올바른 위치에 있는가?
3. ✅ 브라우저 콘솔에 오류가 있는가?
4. ✅ 네트워크 요청이 성공하는가?

### 디버깅 도구
- JSON 유효성 검사: [JSONLint](https://jsonlint.com/)
- 이미지 최적화: [TinyPNG](https://tinypng.com/)
- 성능 테스트: Chrome Lighthouse

---

**PreRelease**로 수천 개의 포스팅도 빠르고 효율적으로 관리해보세요! 🚀✨