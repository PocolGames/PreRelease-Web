// ===== 포스팅 관리 도구 =====
// 이 파일은 새로운 포스팅을 추가할 때 사용하는 유틸리티입니다.

class PostManager {
    constructor() {
        this.postsPerPage = 20;
    }

    // 새 포스팅 추가 (최신 포스팅이 맨 앞에)
    async addNewPost(newPost) {
        try {
            // 1. metadata.json 읽기
            const metadata = await this.loadMetadata();
            
            // 2. page-1.json 읽기
            const page1 = await this.loadPage(1);
            
            // 3. 새 포스팅을 맨 앞에 추가
            page1.posts.unshift({
                id: metadata.totalPosts + 1,
                date: newPost.date,
                content: newPost.content,
                images: newPost.images || []
            });
            
            // 4. 페이지 크기 초과 시 다음 페이지로 이동
            if (page1.posts.length > this.postsPerPage) {
                await this.redistributePosts(page1.posts);
            } else {
                // 5. page-1.json 업데이트
                await this.savePage(1, page1);
            }
            
            // 6. metadata.json 업데이트
            metadata.totalPosts += 1;
            metadata.lastUpdated = new Date().toISOString();
            metadata.latestPostDate = newPost.date;
            await this.saveMetadata(metadata);
            
            console.log('새 포스팅이 성공적으로 추가되었습니다!');
            
        } catch (error) {
            console.error('포스팅 추가 실패:', error);
        }
    }

    // 메타데이터 로드
    async loadMetadata() {
        const response = await fetch('posts/metadata.json');
        return await response.json();
    }

    // 특정 페이지 로드
    async loadPage(pageNum) {
        try {
            const response = await fetch(`posts/page-${pageNum}.json`);
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

    // 포스팅 재분배 (페이지 크기 초과 시)
    async redistributePosts(allPosts) {
        const pages = [];
        
        // 포스팅을 페이지별로 나누기
        for (let i = 0; i < allPosts.length; i += this.postsPerPage) {
            const pageNum = Math.floor(i / this.postsPerPage) + 1;
            const posts = allPosts.slice(i, i + this.postsPerPage);
            const hasMore = i + this.postsPerPage < allPosts.length;
            
            pages.push({
                page: pageNum,
                hasMore: hasMore,
                posts: posts
            });
        }
        
        // 각 페이지 저장
        for (const pageData of pages) {
            await this.savePage(pageData.page, pageData);
        }
    }

    // 메타데이터 저장 (실제로는 콘솔에 출력)
    async saveMetadata(metadata) {
        console.log('metadata.json 업데이트 내용:');
        console.log(JSON.stringify(metadata, null, 2));
    }

    // 페이지 저장 (실제로는 콘솔에 출력)
    async savePage(pageNum, pageData) {
        console.log(`page-${pageNum}.json 업데이트 내용:`);
        console.log(JSON.stringify(pageData, null, 2));
    }
}

// ===== 사용 예시 =====
/*
// 포스트 매니저 인스턴스 생성
const postManager = new PostManager();

// 새 포스팅 추가
const newPost = {
    date: "2025-09-10",
    content: `# 새로운 포스팅 🎉

이것은 **새로운 포스팅**입니다!

## 특징
- 자동으로 최상단에 배치됩니다
- 페이지네이션이 자동으로 처리됩니다
- 메타데이터가 업데이트됩니다

> 정말 간편하죠? ✨`,
    images: [
        "images/new-photo-1.jpg",
        "images/new-photo-2.jpg"
    ]
};

// 포스팅 추가 실행
postManager.addNewPost(newPost);
*/

// 전역에서 사용할 수 있도록 설정
if (typeof window !== 'undefined') {
    window.PostManager = PostManager;
}