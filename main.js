// Preloader Logic
window.addEventListener('load', () => {
    // Ensure the logo animation plays for at least 1.5 seconds before fading out
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1500);
});

document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Appearance Animations using Intersection Observer
    const appearElements = document.querySelectorAll('.scroll-appear');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    appearElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // Form submission via FormSubmit
    const form = document.getElementById('booking-form');
    
    // Send inquiries directly to the company email
    const COMPANY_EMAIL = "thekaliyanaakompany@gmail.com"; 

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn-submit');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        fetch(`https://formsubmit.co/ajax/${COMPANY_EMAIL}`, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _subject: "New Website Booking Inquiry!",
                Name: data.name,
                Email: data.email,
                Phone: data.phone,
                Date: data.date,
                Location: data.location
            })
        })
        .then(response => response.json())
        .then(data => {
            btn.textContent = 'Request Received';
            btn.style.backgroundColor = 'var(--accent-navy)';
            btn.style.color = 'var(--bg-dark)';
            form.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = 'transparent';
                btn.style.color = 'var(--accent-navy)';
            }, 4000);
        })
        .catch(error => {
            console.log(error);
            btn.textContent = 'Error. Try Again.';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 3000);
        });
    });

    // Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    if (window.matchMedia("(pointer: fine)").matches && cursor && follower) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Move inner dot instantly
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth follow for the outer ring
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover effects on links and buttons
        const interactiveElements = document.querySelectorAll('a, button, input');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                follower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                follower.classList.remove('hover');
            });
        });

        // Special "VIEW" hover effect on portfolio items
        const portfolioItems = document.querySelectorAll('.masonry-item');
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                follower.classList.add('hover-portfolio');
            });
            item.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                follower.classList.remove('hover-portfolio');
            });
        });
    } else {
        if(cursor) cursor.remove();
        if(follower) follower.remove();
    }

    // Magnetic Logic
    const magnetics = document.querySelectorAll('.magnetic');
    magnetics.forEach(magnetic => {
        magnetic.addEventListener('mousemove', function(e) {
            const boundingRect = magnetic.getBoundingClientRect();
            const relX = e.clientX - boundingRect.left;
            const relY = e.clientY - boundingRect.top;
            
            const x = (relX - boundingRect.width / 2) * 0.4;
            const y = (relY - boundingRect.height / 2) * 0.4;
            
            magnetic.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        magnetic.addEventListener('mouseleave', function() {
            magnetic.style.transform = `translate(0px, 0px)`;
        });
    });

    // Parallax Logic
    const parallaxItems = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        parallaxItems.forEach(item => {
            const speed = parseFloat(item.getAttribute('data-speed'));
            // Calculate a more smooth parallax offset relative to window
            const yPos = -(scrolled * speed);
            item.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Mobile Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            // Hamburger animation
            hamburger.classList.toggle('toggle');
            if (hamburger.classList.contains('toggle')) {
                hamburger.children[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                hamburger.children[1].style.opacity = '0';
                hamburger.children[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                hamburger.children[0].style.transform = 'none';
                hamburger.children[1].style.opacity = '1';
                hamburger.children[2].style.transform = 'none';
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('toggle');
                hamburger.children[0].style.transform = 'none';
                hamburger.children[1].style.opacity = '1';
                hamburger.children[2].style.transform = 'none';
            });
        });
    }

    // Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Crossfade every 5 seconds
    }
});
