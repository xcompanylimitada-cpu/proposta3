document.addEventListener('DOMContentLoaded', function() {
    // Clear cache para Safari
    if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
        console.log('🔄 Safari detectado - aplicando técnicas de limpeza de cache');
        
        // Adicionar query string de cache busting para todos os links
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.includes('?')) {
                link.setAttribute('href', href + '?v=' + Date.now());
            }
        });
    }
    
    // Smooth scrolling para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.classList.contains('cta-button')) {
            return;
        }
        
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ Accordion - Desktop
    const faqItemsDesktop = document.querySelectorAll('.faq-item-desktop');
    if (faqItemsDesktop.length > 0) {
        faqItemsDesktop.forEach(item => {
            const question = item.querySelector('.faq-question-desktop');
            
            question.addEventListener('click', () => {
                // Fechar todos os outros itens
                faqItemsDesktop.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alternar item atual
                item.classList.toggle('active');
            });
        });
    }
    
    // FAQ Accordion - Mobile
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Fechar todos os outros itens
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alternar item atual
                item.classList.toggle('active');
            });
        });
    }
    
    console.log('✅ Site carregado com sucesso - Versão 3.6 ✅');
});