// ===== 간단한 Markdown 파서 =====
class MarkdownParser {
    constructor() {
        this.rules = [
            // 헤딩
            { pattern: /^### (.*$)/gim, replacement: '<h3>$1</h3>' },
            { pattern: /^## (.*$)/gim, replacement: '<h2>$1</h2>' },
            { pattern: /^# (.*$)/gim, replacement: '<h1>$1</h1>' },
            
            // 코드 블록
            { pattern: /```([\s\S]*?)```/gim, replacement: '<pre><code>$1</code></pre>' },
            
            // 인라인 코드
            { pattern: /`([^`]+)`/gim, replacement: '<code>$1</code>' },
            
            // 볼드
            { pattern: /\*\*(.*?)\*\*/gim, replacement: '<strong>$1</strong>' },
            { pattern: /__(.*?)__/gim, replacement: '<strong>$1</strong>' },
            
            // 이탤릭
            { pattern: /\*(.*?)\*/gim, replacement: '<em>$1</em>' },
            { pattern: /_(.*?)_/gim, replacement: '<em>$1</em>' },
            
            // 링크
            { pattern: /\[([^\]]+)\]\(([^)]+)\)/gim, replacement: '<a href="$2" target="_blank">$1</a>' },
            
            // 인용구
            { pattern: /^> (.*$)/gim, replacement: '<blockquote>$1</blockquote>' },
            
            // 순서없는 리스트
            { pattern: /^\* (.*$)/gim, replacement: '<li>$1</li>' },
            { pattern: /^- (.*$)/gim, replacement: '<li>$1</li>' },
            
            // 순서있는 리스트
            { pattern: /^\d+\. (.*$)/gim, replacement: '<li>$1</li>' },
            
            // 수평선
            { pattern: /^---$/gim, replacement: '<hr>' },
            { pattern: /^\*\*\*$/gim, replacement: '<hr>' },
            
            // 줄바꿈 (두 번의 엔터)
            { pattern: /\n\n/gim, replacement: '</p><p>' },
        ];
    }

    parse(markdown) {
        if (!markdown) return '';
        
        let html = markdown.trim();
        
        // 각 규칙을 적용
        this.rules.forEach(rule => {
            html = html.replace(rule.pattern, rule.replacement);
        });
        
        // 연속된 li 태그들을 ul로 감싸기
        html = html.replace(/(<li>.*?<\/li>)/gims, (match) => {
            return match.replace(/(<li>.*?<\/li>)(?=\s*<li>|$)/gims, '$1');
        });
        
        // li 태그들을 ul로 감싸기
        html = html.replace(/(<li>.*?<\/li>(?:\s*<li>.*?<\/li>)*)/gims, '<ul>$1</ul>');
        
        // 연속된 blockquote 처리
        html = html.replace(/(<blockquote>.*?<\/blockquote>)(?=\s*<blockquote>)/gims, '$1');
        
        // p 태그로 감싸기 (이미 다른 태그로 감싸진 것 제외)
        if (!html.startsWith('<')) {
            html = '<p>' + html + '</p>';
        }
        
        // 빈 p 태그 제거
        html = html.replace(/<p><\/p>/gim, '');
        
        // 중복된 태그 정리
        html = html.replace(/<\/p><p>/gim, '</p><p>');
        
        return html;
    }
}

// 전역에서 사용할 수 있도록 인스턴스 생성
window.markdownParser = new MarkdownParser();