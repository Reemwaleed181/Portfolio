// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        // تغيير الأيقونة عند النقر
        const icon = this.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Navigation click handler
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Update active nav item
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });
    
    // CV View functionality
    const viewCvBtn = document.getElementById('view-cv-btn');
    
    if (viewCvBtn) {
        viewCvBtn.addEventListener('click', function(e) {
            // تتبع عرض الـ CV
            console.log('CV view initiated - Opening in new tab');
            
            // إشعار نجاح الفتح
            setTimeout(() => {
                showViewSuccess();
            }, 500);
            
            // تتبع عرض الـ CV
            trackCVView();
        });
    }
    
    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // Update active nav item on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navHeight = document.querySelector('nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

    // Smooth scroll for navigation links
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        
        // Typewriter effect for hero title
        typewriterEffect();
    });

    // Social links smooth hover
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('btn-outline')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // CV download button tracking
    const downloadCvBtn = document.querySelector('a[download]');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', function() {
            console.log('CV download initiated');
            trackCVDownload();
            showDownloadSuccess();
        });
    }
});

// دالة إشعار نجاح الفتح
function showViewSuccess() {
    // التحقق إذا كان هناك إشعار موجود مسبقاً
    const existingNotification = document.querySelector('.download-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <i class="fas fa-external-link-alt" style="font-size: 1.2rem;"></i>
        <span>CV opened in new tab!</span>
    `;
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار بعد 3 ثواني
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// دالة إشعار نجاح التحميل
function showDownloadSuccess() {
    const existingNotification = document.querySelector('.download-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 1.2rem;"></i>
        <span>CV download started!</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// تتبع عرض الـ CV
function trackCVView() {
    console.log('CV viewed - File: CV-Reem waleed.pdf');
    
    // يمكنك إضافة Google Analytics هنا
    // gtag('event', 'view', {
    //     'event_category': 'CV',
    //     'event_label': 'PDF View'
    // });
    
    const viewTime = new Date().toLocaleString();
    console.log(`CV viewed at: ${viewTime}`);
}

// تتبع تحميل السيرة الذاتية
function trackCVDownload() {
    console.log('CV download tracked - File: CV-Reem waleed.pdf');
    
    // يمكنك إضافة Google Analytics هنا
    // gtag('event', 'download', {
    //     'event_category': 'CV',
    //     'event_label': 'PDF Download'
    // });
    
    const downloadTime = new Date().toLocaleString();
    console.log(`Download started at: ${downloadTime}`);
}

// تأثير الكتابة للعنوان الرئيسي
function typewriterEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // بدء التأثير بعد تحميل الصفحة
    setTimeout(typeWriter, 500);
}

// إضافة تأثير اهتزاز للأيقونات
function addHoverShake() {
    const icons = document.querySelectorAll('.card-icon, .download-icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'shake 0.5s ease-in-out';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
}

// تهيئة تأثير الاهتزاز عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    addHoverShake();
});

// إضافة أنيميشن الاهتزاز لـ CSS
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// تحسين أداء التمرير
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            scrollTimeout = null;
        }, 100);
    }
});

// إضافة تأثيرات للزر عند الضغط
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(0) scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-2px) scale(1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// تحسين تجربة المستخدم للهواتف
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // تحسين التفاعل مع اللمس
    document.querySelectorAll('.project-card, .about-card').forEach(card => {
        card.style.cursor = 'pointer';
    });
}

// إضافة تأثير تحميل للصور
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
        this.style.transition = 'opacity 0.3s ease';
    });
    
    // تعيين opacity مبدئي للصور
    img.style.opacity = '0';
});

// تحسين إمكانية الوصول
document.addEventListener('keydown', function(e) {
    // إضافة التنقل باستخدام لوحة المفاتيح
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// منع الإجراءات الافتراضية للروابط الخارجية
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // السماح للروابط بالعمل بشكل طبيعي
        console.log('External link clicked:', this.href);
    });
});