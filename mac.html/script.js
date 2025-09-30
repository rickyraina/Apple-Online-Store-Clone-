document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
    });

    // Carousel Navigation
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const carouselItems = document.querySelectorAll('.carousel-item');

    let currentIndex = 0;
    const itemWidth = carouselItems[0].offsetWidth + 20; // Including gap

    nextBtn.addEventListener('click', function() {
        if (currentIndex < carouselItems.length - 3) {
            currentIndex++;
            carousel.scrollTo({
                left: currentIndex * itemWidth,
                behavior: 'smooth'
            });
        }
    });

    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            carousel.scrollTo({
                left: currentIndex * itemWidth,
                behavior: 'smooth'
            });
        }
    });

    // Update carousel navigation buttons based on scroll position
    carousel.addEventListener('scroll', function() {
        const scrollPosition = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        // Hide/show next button
        if (scrollPosition >= maxScroll - 10) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'flex';
        }

        // Hide/show prev button
        if (scrollPosition <= 10) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
        }
    });

    // Initialize button visibility
    prevBtn.style.display = 'none';
    if (carousel.scrollWidth <= carousel.clientWidth) {
        nextBtn.style.display = 'none';
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Video Control
    const video = document.querySelector('.hero-video');
    const videoControl = document.querySelector('.video-control');
    const videoIcon = videoControl.querySelector('i');

    videoControl.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            videoIcon.classList.remove('fa-play');
            videoIcon.classList.add('fa-pause');
        } else {
            video.pause();
            videoIcon.classList.remove('fa-pause');
            videoIcon.classList.add('fa-play');
        }
    });

    // Ensure video is playing when page loads (autoplay with mute)
    video.muted = true;
    video.play().catch(error => {
        console.log('Autoplay prevented:', error);
        videoControl.style.display = 'flex'; // Show control if autoplay fails
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
        });
    });

    // Promo Scroll Navigation
    const promoScroll = document.querySelector('.promo-scroll');
    const promoNavBtns = document.querySelectorAll('.promo-nav-btn');
    
    // Update navigation dots based on scroll position
    promoScroll.addEventListener('scroll', function() {
        const scrollPosition = promoScroll.scrollLeft;
        const itemWidth = promoScroll.querySelector('.promo-item').offsetWidth + 20;
        const currentItem = Math.round(scrollPosition / itemWidth);
        
        // Update active state of navigation dots
        promoNavBtns.forEach((btn, index) => {
            if (index === currentItem) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    });
    
    // Add click handlers for navigation dots
    promoNavBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const itemWidth = promoScroll.querySelector('.promo-item').offsetWidth + 20;
            promoScroll.scrollTo({
                left: index * itemWidth,
                behavior: 'smooth'
            });
            
            // Update active state
            promoNavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});