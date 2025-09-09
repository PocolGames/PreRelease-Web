// ===== 포스팅 관리 도구 =====
// 이 파일은 새로운 포스팅을 추가할 때 사용하는 유틸리티입니다.

class PostManager {
    constructor() {
        this.postsPerPage = 3; // metadata.json의 postsPerPage와 일치
    }

    // 새 포스팅 추가 (새로운 페이지 파일 생성)
    async addNewPost(newPost) {
        try {
            // 1. metadata.json 읽기
            const metadata = await this.loadMetadata();
            
            // 2. 새 포스트 ID 생성
            const newPostId = metadata.totalPosts + 1;
            
            // 3. 가장 높은 페이지 번호 확인
            const currentMaxPage = metadata.totalPages;
            
            // 4. 현재 최신 페이지 로드
            const latestPage = await this.loadPage(currentMaxPage);
            
            // 5. 새 포스트 객체 생성
            const postObject = {
                id: newPostId,
                date: newPost.date,
                content: newPost.content,
                images: newPost.images || []
            };
            
            // 6. 현재 최신 페이지가 가득 찼는지 확인
            if (latestPage.posts.length >= this.postsPerPage) {
                // 새 페이지 생성
                const newPageNum = currentMaxPage + 1;
                await this.createNewPage(newPageNum, [postObject]);
                
                // 이전 페이지의 hasMore를 true로 업데이트
                latestPage.hasMore = true;
                await this.savePage(currentMaxPage, latestPage);
                
                // metadata 업데이트
                metadata.totalPages = newPageNum;
            } else {
                // 현재 페이지에 추가 (최신순 정렬을 위해 맨 앞에 추가)
                latestPage.posts.unshift(postObject);
                await this.savePage(currentMaxPage, latestPage);
            }
            
            // 7. metadata.json 업데이트
            metadata.totalPosts = newPostId;
            metadata.lastUpdated = new Date().toISOString();
            metadata.latestPostDate = newPost.date;
            await this.saveMetadata(metadata);
            
            console.log(`새 포스팅(ID: ${newPostId})이 성공적으로 추가되었습니다!`);
            return newPostId;
            
        } catch (error) {
            console.error('포스팅 추가 실패:', error);
            throw error;
        }
    }

    // 새 페이지 생성
    async createNewPage(pageNum, posts) {
        const pageData = {
            page: pageNum,
            hasMore: false, // 새로 생성된 페이지는 최신이므로 hasMore = false
            posts: posts
        };
        
        await this.savePage(pageNum, pageData);
        console.log(`새 페이지 ${pageNum} 생성 완료`);
    }

    // 메타데이터 로드
    async loadMetadata() {
        const response = await fetch('posts/metadata.json');
        if (!response.ok) {
            throw new Error('메타데이터를 불러올 수 없습니다.');
        }
        return await response.json();
    }

    // 특정 페이지 로드
    async loadPage(pageNum) {
        try {
            const response = await fetch(`posts/page-${pageNum}.json`);
            if (!response.ok) {
                throw new Error(`페이지 ${pageNum}을 찾을 수 없습니다.`);
            }
            return await response.json();
        } catch (error) {
            // 페이지가 없으면 빈 페이지 반환
            return {
                page: pageNum,
                hasMore: false,
                posts: []
            };
        }
    }

    // 메타데이터 저장 (실제로는 콘솔에 출력)
    async saveMetadata(metadata) {
        console.log('=== metadata.json 업데이트 내용 ===');
        console.log(JSON.stringify(metadata, null, 2));
        console.log('위 내용을 metadata.json 파일에 저장하세요.');
    }

    // 페이지 저장 (실제로는 콘솔에 출력)
    async savePage(pageNum, pageData) {
        console.log(`=== page-${pageNum}.json 업데이트 내용 ===`);
        console.log(JSON.stringify(pageData, null, 2));
        console.log(`위 내용을 page-${pageNum}.json 파일에 저장하세요.`);
    }

    // 다음 페이지 번호 계산 (새 포스트 추가용)
    calculateNextPageNumber(metadata) {
        return metadata.totalPages + 1;
    }

    // 페이지 용량 확인
    isPageFull(pageData) {
        return pageData.posts.length >= this.postsPerPage;
    }

    // 전체 포스트 재분배 (필요시 사용)
    async redistributeAllPosts() {
        try {
            const metadata = await this.loadMetadata();
            const allPosts = [];
            
            // 모든 페이지에서 포스트 수집
            for (let i = 1; i <= metadata.totalPages; i++) {
                const pageData = await this.loadPage(i);
                allPosts.push(...pageData.posts);
            }
            
            // 날짜순으로 정렬 (최신부터)
            allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // 페이지별로 재분배
            const newPages = [];
            for (let i = 0; i < allPosts.length; i += this.postsPerPage) {
                const pageNum = Math.floor(i / this.postsPerPage) + 1;
                const posts = allPosts.slice(i, i + this.postsPerPage);
                const hasMore = i + this.postsPerPage < allPosts.length;
                
                newPages.push({
                    page: pageNum,
                    hasMore: hasMore,
                    posts: posts
                });
            }
            
            // 각 페이지 저장
            for (const pageData of newPages) {
                await this.savePage(pageData.page, pageData);
            }
            
            // 메타데이터 업데이트
            metadata.totalPages = newPages.length;
            await this.saveMetadata(metadata);
            
            console.log('전체 포스트 재분배 완료!');
            
        } catch (error) {
            console.error('포스트 재분배 실패:', error);
        }
    }
}

// ===== 사용 예시 =====
/*
// 포스트 매니저 인스턴스 생성
const postManager = new PostManager();

// 새 포스팅 추가
const newPost = {
    date: "2025-09-13",
    content: `# 아홉 번째 포스팅 🎉

이것은 **새로운 포스팅**입니다!

## 특징
- 자동으로 최신 페이지에 추가됩니다
- 페이지가 가득 차면 새 페이지를 생성합니다
- 시간순 정렬이 유지됩니다

> 페이지네이션이 완벽하게 작동해요! ✨

### 코드 예시
\`\`\`javascript
// 새 포스트 추가
postManager.addNewPost(newPost);
\`\`\`

**앞으로도** *멋진* 포스팅들이 계속 추가될 예정입니다! 🚀`,
    images: [
        "https://picsum.photos/800/600?random=27",
        "https://picsum.photos/800/600?random=28"
    ]
};

// 포스팅 추가 실행
postManager.addNewPost(newPost).then(postId => {
    console.log(`포스트 ID ${postId} 추가 완료!`);
}).catch(error => {
    console.error('포스팅 추가 실패:', error);
});
*/

// 전역에서 사용할 수 있도록 설정
if (typeof window !== 'undefined') {
    window.PostManager = PostManager;
}