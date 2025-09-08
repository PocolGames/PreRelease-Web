// ===== 포스팅 데이터 =====
// 새로운 포스팅을 추가하려면 이 배열에 객체를 추가하세요

const postsData = [
    {
        id: 1,
        date: "2025-09-09",
        content: `# 첫 번째 포스팅 🚀

**PreRelease**에 오신 것을 환영합니다!

이곳은 특별한 순간들을 미리 공개하는 공간입니다.

## 주요 기능
- **Markdown 지원**: 텍스트 포맷팅이 가능합니다
- **이미지 갤러리**: 여러 장의 사진을 한 번에 업로드
- **반응형 디자인**: 모든 기기에서 완벽하게 작동

> 이것은 인용구입니다. Twitter 스타일의 블랙 테마로 제작되었어요!

\`\`\`javascript
// 코드 블록도 지원합니다
console.log("Hello, PreRelease!");
\`\`\`

- 순서없는 리스트
- 두 번째 항목
- 세 번째 항목

1. 순서있는 리스트
2. 두 번째 항목
3. 세 번째 항목

[링크 텍스트](https://example.com)도 사용할 수 있습니다!`,
        images: [
            "https://picsum.photos/800/600?random=1",
            "https://picsum.photos/800/600?random=2"
        ]
    },
    {
        id: 2,
        date: "2025-09-08",
        content: `## 두 번째 포스팅 📸

오늘은 정말 *멋진* 하루였습니다!

**굵은 글씨**와 *기울임* 텍스트를 사용할 수 있어요.

\`인라인 코드\`도 가능하고, 

> 이런 식으로 인용구도 만들 수 있습니다.

---

수평선도 그을 수 있어요!`,
        images: [
            "https://picsum.photos/800/600?random=3",
            "https://picsum.photos/800/600?random=4",
            "https://picsum.photos/800/600?random=5"
        ]
    },
    {
        id: 3,
        date: "2025-09-07",
        content: `### 세 번째 포스팅

단순한 텍스트만으로도 충분히 멋진 포스팅이 가능합니다.

이미지 없이도 괜찮아요! 😊`,
        images: []
    },
    {
        id: 4,
        date: "2025-09-06",
        content: `## 네 번째 포스팅 🎨

이번에는 **4장의 이미지**를 올려봤어요!

그리드 레이아웃이 자동으로 적용됩니다.`,
        images: [
            "https://picsum.photos/800/600?random=6",
            "https://picsum.photos/800/600?random=7",
            "https://picsum.photos/800/600?random=8",
            "https://picsum.photos/800/600?random=9"
        ]
    },
    {
        id: 5,
        date: "2025-09-05",
        content: `# 다섯 번째 포스팅 🖼️

**5장 이상의 이미지**를 업로드하면 
마지막 이미지에 "+숫자" 표시가 나타납니다!

정말 깔끔하죠? ✨`,
        images: [
            "https://picsum.photos/800/600?random=10",
            "https://picsum.photos/800/600?random=11",
            "https://picsum.photos/800/600?random=12",
            "https://picsum.photos/800/600?random=13",
            "https://picsum.photos/800/600?random=14",
            "https://picsum.photos/800/600?random=15"
        ]
    }
];

// ===== 새 포스팅 추가 예시 =====
/*
새로운 포스팅을 추가하려면 아래와 같은 형식으로 위 배열에 추가하세요:

{
    id: 6,                    // 고유 번호 (증가시켜 주세요)
    date: "2025-09-10",       // 날짜 (YYYY-MM-DD 형식)
    content: `여기에 내용을 작성하세요.
    
Markdown 문법을 사용할 수 있습니다:
- **굵은 글씨**
- *기울임*
- \`코드\`
- [링크](URL)
- > 인용구

## 제목도 가능해요!`,
    images: [                 // 이미지 배열 (없으면 빈 배열 [])
        "images/your-image-1.jpg",
        "images/your-image-2.jpg"
    ]
}

주의사항:
1. 이미지 파일은 images/ 폴더에 넣어주세요
2. 날짜 형식을 정확히 지켜주세요 (YYYY-MM-DD)
3. content에서 백틱(`)을 사용할 때는 \를 앞에 붙여주세요
4. 마지막 객체 뒤에는 콤마(,)를 붙이지 마세요
*/