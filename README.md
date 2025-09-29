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
│   └── markdown.js       # Markdown 파서
├── images/               # 이미지 파일들
│   ├── post-1/          # 포스트별 이미지 폴더
│   ├── post-2/
│   └── ...
├── posts/
│   ├── metadata.json     # 전체 페이지 정보
│   ├── page-1.json      # 1페이지 포스팅
│   ├── page-2.json      # 2페이지 포스팅
│   ├── content/         # 마크다운 컨텐츠 파일
│   │   ├── post-1.md
│   │   ├── post-2.md
│   │   └── ...
│   └── ...
└── README.md             # 이 파일
```

## ⚡ 주요 특징

### 📈 페이지네이션 시스템
- **빠른 초기 로딩**: 첫 페이지만 로드
- **무한 스크롤**: 스크롤 시 자동으로 다음 페이지 로드
- **메모리 효율성**: 필요한 만큼만 로드하여 메모리 절약
- **확장성**: 수천 개의 포스팅도 문제없이 처리

### 🗂️ 파일 구조 개선
- **작은 파일 크기**: 각 페이지 파일이 독립적으로 관리
- **빠른 편집**: 특정 포스팅 수정 시 해당 페이지만 편집
- **안정성**: 하나의 페이지 문제가 전체에 영향 주지 않음

## ✍️ 새 포스팅 추가하기

### 1단계: 마크다운 파일 생성
`posts/content/` 폴더에 새로운 마크다운 파일 생성:

**예시: `posts/content/post-28.md`**
```markdown
# 새로운 포스팅 제목 🎉

이것은 **새로운 포스팅**입니다!

## 특징
- 마크다운으로 작성
- 자동으로 HTML로 변환
- 이미지 갤러리 지원

> 정말 간편하죠? ✨
```

### 2단계: 이미지 준비 (선택사항)
- 사용할 이미지들을 `images/` 폴더에 복사
- 지원 형식: JPG, PNG, GIF, WebP
- 권장 크기: 800x600 이상

### 3단계: 페이지 JSON에 포스팅 추가
가장 최근 페이지 파일(예: `posts/page-2.json`)을 열고 `posts` 배열의 **맨 앞에** 새 포스팅을 추가:

```json
{
    "page": 2,
    "hasMore": false,
    "posts": [
        {
            "id": 28,
            "date": "2025-09-30",
            "contentFile": "post-28.md",
            "images": [
                "images/post-28/00.png",
                "images/post-28/01.png"
            ]
        }
        // ... 기존 포스팅들
    ]
}
```

### 4단계: 페이지 분할이 필요한 경우
한 페이지에 15개가 넘으면 새로운 페이지 파일을 생성:

**예시: page-3.json 생성**
```json
{
    "page": 3,
    "hasMore": true,
    "posts": [
        {
            "id": 28,
            "date": "2025-09-30",
            "contentFile": "post-28.md",
            "images": ["images/post-28/00.png"]
        }
    ]
}
```

**이전 페이지의 hasMore를 true로 변경**
```json
{
    "page": 2,
    "hasMore": true,
    "posts": [/* 기존 포스팅들 */]
}
```

### 5단계: 메타데이터 업데이트
새 페이지를 생성했다면 `posts/metadata.json` 파일에서 `totalPages` 증가:

```json
{
    "totalPages": 3
}
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
````markdown
```javascript
console.log("Hello World!");
```
````

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
1. `posts/content/` 폴더에서 해당 마크다운 파일 수정
2. 이미지 변경이 필요하면 페이지 JSON 파일에서 `images` 배열 수정
3. 파일 저장 후 브라우저 새로고침

### 포스팅 삭제
1. 해당 페이지 JSON에서 포스팅 객체 제거
2. `posts/content/`에서 마크다운 파일 삭제 (선택)
3. `images/` 폴더에서 이미지 삭제 (선택)
4. 페이지가 비어있으면 JSON 파일 삭제 후 `metadata.json`의 `totalPages` 감소

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

### 폰트 변경
`css/style.css`의 `font-family` 속성을 수정

## 🚀 성능 최적화 팁

### 이미지 최적화
- 이미지 압축 사용 (TinyPNG, ImageOptim 등)
- WebP 포맷 사용 권장
- 적절한 해상도 유지 (800-1200px 폭)

### 페이지 로딩 최적화
- 페이지당 포스팅 수를 15-20개로 유지
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
1. `posts/metadata.json`과 `page-X.json` 문법 확인
2. 브라우저 개발자 도구(F12)에서 Network 탭 확인
3. JSON 파일이 올바르게 로드되는지 확인
4. 마크다운 파일 경로가 올바른지 확인

### 무한 스크롤이 작동하지 않을 때
1. `hasMore` 값이 올바른지 확인
2. 페이지 파일들이 순서대로 있는지 확인
3. `metadata.json`의 `totalPages` 값이 정확한지 확인
4. 콘솔에서 JavaScript 오류 확인

### 이미지가 로드되지 않을 때
1. 파일 경로와 이름 확인 (대소문자 구분)
2. 이미지 파일이 `images/` 폴더에 있는지 확인
3. 네트워크 탭에서 404 오류 확인

### 마크다운이 제대로 렌더링되지 않을 때
1. 마크다운 파일이 UTF-8로 저장되었는지 확인
2. `contentFile` 경로가 정확한지 확인
3. 마크다운 문법이 올바른지 확인

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

## 📞 지원

### 문제 진단 체크리스트
1. ✅ JSON 파일 문법이 올바른가?
2. ✅ 마크다운 파일이 올바른 위치에 있는가?
3. ✅ 이미지 파일이 올바른 위치에 있는가?
4. ✅ 브라우저 콘솔에 오류가 있는가?
5. ✅ 네트워크 요청이 성공하는가?

### 디버깅 도구
- JSON 유효성 검사: [JSONLint](https://jsonlint.com/)
- 이미지 최적화: [TinyPNG](https://tinypng.com/)
- 성능 테스트: Chrome Lighthouse

---

**PreRelease**로 수천 개의 포스팅도 빠르고 효율적으로 관리해보세요! 🚀✨
