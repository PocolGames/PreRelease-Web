// ===== 전역 변수 =====
let currentImageModal = null;
let currentPage = 0;
let isLoading = false;
let hasMorePosts = true;
let metadata = null;

// ===== DOM이 로드된 후 실행 =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== 앱 초기화 =====
async function initializeApp() {
    await loadMetadata();
    await loadPostsPage(1);
    setupImageModal();
    setupInfiniteScroll();
}

// ===== 메타데이터 로드 =====
async function loadMetadata() {
    try {
        const response = await fetch('posts/metadata.json');
        if (!response.ok) throw new Error('메타데이터를 불러올 수 없습니다.');
        metadata = await response.json();
        console.log('메타데이터 로드 완료:', metadata);
    } catch (error) {
        console.error('메타데이터 로드 실패:', error);
        metadata = {
            totalPosts: 0,
            totalPages: 0,
            postsPerPage: 20
        };
    }
}

// ===== 페이지별 포스팅 로드 =====
async function loadPostsPage(pageNum) {
    if (isLoading || !hasMorePosts) return;
    
    const container = document.getElementById('posts-container');
    const loading = document.getElementById('loading');
    const noPosts = document.getElementById('no-posts');
    
    isLoading = true;
    
    // 첫 번째 페이지가 아니면 로딩 표시를 하단에
    if (pageNum === 1) {
        loading.style.display = 'block';
        noPosts.style.display = 'none';
    } else {
        showBottomLoading();
    }
    
    try {
        const response = await fetch(`posts/page-${pageNum}.json`);
        
        if (!response.ok) {
            throw new Error(`페이지 ${pageNum}을 불러올 수 없습니다.`);
        }
        
        const pageData = await response.json();
        
        // 잠시 후 포스팅 로드 (로딩 효과를 위해)
        setTimeout(() => {
            if (pageNum === 1) {
                loading.style.display = 'none';
            } else {
                hideBottomLoading();
            }
            
            if (pageData.posts && pageData.posts.length > 0) {
                // 포스팅 렌더링
                pageData.posts.forEach(post => {
                    const postElement = createPostElement(post);
                    container.appendChild(postElement);
                });
                
                currentPage = pageNum;
                hasMorePosts = pageData.hasMore;
                
                console.log(`페이지 ${pageNum} 로드 완료. 더 있음: ${hasMorePosts}`);
            } else if (pageNum === 1) {
                noPosts.style.display = 'block';
            }
            
            isLoading = false;
        }, pageNum === 1 ? 500 : 200);
        
    } catch (error) {
        console.error(`페이지 ${pageNum} 로드 실패:`, error);
        
        if (pageNum === 1) {
            loading.style.display = 'none';
            noPosts.style.display = 'block';
        } else {
            hideBottomLoading();
        }
        
        hasMorePosts = false;
        isLoading = false;
    }
}

// ===== 하단 로딩 표시 =====
function showBottomLoading() {
    let bottomLoading = document.getElementById('bottom-loading');
    if (!bottomLoading) {
        bottomLoading = document.createElement('div');
        bottomLoading.id = 'bottom-loading';
        bottomLoading.className = 'bottom-loading';
        bottomLoading.innerHTML = `
            <div class="loading-content">
                <i class="fas fa-spinner fa-spin"></i>
                <span>더 많은 포스팅을 불러오는 중...</span>
            </div>
        `;
        document.querySelector('.main-content').appendChild(bottomLoading);
    }
    bottomLoading.style.display = 'block';
}

function hideBottomLoading() {
    const bottomLoading = document.getElementById('bottom-loading');
    if (bottomLoading) {
        bottomLoading.style.display = 'none';
    }
}

// ===== 무한 스크롤 설정 =====
function setupInfiniteScroll() {
    let throttleTimer = null;
    
    window.addEventListener('scroll', () => {
        if (throttleTimer) return;
        
        throttleTimer = setTimeout(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // 스크롤이 하단 근처에 도달했을 때
            if (scrollTop + windowHeight >= documentHeight - 200) {
                if (hasMorePosts && !isLoading) {
                    loadPostsPage(currentPage + 1);
                }
            }
            
            throttleTimer = null;
        }, 100);
    });
}

// ===== 포스팅 요소 생성 =====
function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post-card';
    
    const header = createPostHeader(post);
    const content = createPostContent(post);
    
    article.appendChild(header);
    article.appendChild(content);
    
    return article;
}

// ===== 포스팅 헤더 생성 =====
function createPostHeader(post) {
    const header = document.createElement('div');
    header.className = 'post-header';
    
    const avatar = document.createElement('div');
    avatar.className = 'post-avatar';
    avatar.innerHTML = '<i class="fas fa-rocket"></i>';
    
    const info = document.createElement('div');
    info.className = 'post-info';
    
    const title = document.createElement('h3');
    title.textContent = 'PreRelease';
    
    const date = document.createElement('div');
    date.className = 'post-date';
    date.textContent = formatDate(post.date);
    
    info.appendChild(title);
    info.appendChild(date);
    
    header.appendChild(avatar);
    header.appendChild(info);
    
    return header;
}

// ===== 포스팅 콘텐츠 생성 =====
function createPostContent(post) {
    const content = document.createElement('div');
    content.className = 'post-content';
    
    // 텍스트 콘텐츠
    if (post.content && post.content.trim()) {
        const textDiv = document.createElement('div');
        textDiv.className = 'post-text';
        textDiv.innerHTML = window.markdownParser.parse(post.content);
        content.appendChild(textDiv);
    }
    
    // 이미지 갤러리
    if (post.images && post.images.length > 0) {
        const imagesDiv = createImageGallery(post.images);
        content.appendChild(imagesDiv);
    }
    
    return content;
}

// ===== 이미지 갤러리 생성 =====
function createImageGallery(images) {
    const imagesDiv = document.createElement('div');
    imagesDiv.className = 'post-images';
    
    const grid = document.createElement('div');
    grid.className = 'images-grid';
    
    // 이미지 개수에 따른 그리드 클래스
    if (images.length === 1) {
        grid.classList.add('grid-1');
    } else if (images.length === 2) {
        grid.classList.add('grid-2');
    } else if (images.length === 3) {
        grid.classList.add('grid-3');
    } else if (images.length === 4) {
        grid.classList.add('grid-4');
    } else {
        grid.classList.add('grid-many');
    }
    
    // 최대 4개까지만 표시
    const displayImages = images.slice(0, 4);
    
    displayImages.forEach((imageSrc, index) => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `포스팅 이미지 ${index + 1}`;
        img.className = 'post-image';
        img.addEventListener('click', () => openImageModal(imageSrc));
        
        // 4번째 이미지이고 더 많은 이미지가 있을 때
        if (index === 3 && images.length > 4) {
            const wrapper = document.createElement('div');
            wrapper.className = 'more-images';
            wrapper.setAttribute('data-count', images.length - 4);
            wrapper.appendChild(img);
            grid.appendChild(wrapper);
        } else {
            grid.appendChild(img);
        }
    });
    
    imagesDiv.appendChild(grid);
    return imagesDiv;
}

// ===== 날짜 포맷팅 =====
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return '어제';
    } else if (diffDays < 7) {
        return `${diffDays}일 전`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks}주 전`;
    } else {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('ko-KR', options);
    }
}

// ===== 이미지 모달 설정 =====
function setupImageModal() {
    // 모달 요소 생성
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.id = 'image-modal';
    
    const closeBtn = document.createElement('div');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', closeImageModal);
    
    const img = document.createElement('img');
    img.className = 'modal-image';
    img.id = 'modal-image';
    
    modal.appendChild(closeBtn);
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    // 모달 배경 클릭시 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
}

// ===== 이미지 모달 열기 =====
function openImageModal(imageSrc) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    
    modalImage.src = imageSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== 이미지 모달 닫기 =====
function closeImageModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}