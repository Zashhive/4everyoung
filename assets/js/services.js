/**
 * 4Everyoung Skincare Website
 * Services Pages JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Before-After Slider functionality
    initializeBeforeAfterSliders();
    
    // FAQ Accordion
    initializeFAQAccordion();
    
    // Video Testimonial Play Button
    initializeVideoPlayer();
    
    // Product Add to Cart functionality
    initializeAddToCart();
    
});

/**
 * Initialize all before-after sliders on the page
 */
function initializeBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.before-after-slider');
    
    sliders.forEach(slider => {
        const sliderInput = slider.querySelector('.slider-input');
        const beforeImage = slider.querySelector('.before-image');
        const sliderLine = slider.querySelector('.slider-line');
        const sliderHandle = slider.querySelector('.slider-handle');
        
        if (sliderInput && beforeImage && sliderLine && sliderHandle) {
            // Set initial state based on input value
            const initialValue = sliderInput.value;
            beforeImage.style.width = `${initialValue}%`;
            sliderLine.style.left = `${initialValue}%`;
            sliderHandle.style.left = `${initialValue}%`;
            
            // Make the slider active
            slider.classList.add('js-slider-active');
            
            // Update slider when input changes
            sliderInput.addEventListener('input', function() {
                const value = this.value;
                beforeImage.classList.add('before-after-animate');
                sliderLine.classList.add('before-after-animate');
                sliderHandle.classList.add('before-after-animate');
                
                beforeImage.style.width = `${value}%`;
                sliderLine.style.left = `${value}%`;
                sliderHandle.style.left = `${value}%`;
                
                // Remove animation class after transition completes
                setTimeout(() => {
                    beforeImage.classList.remove('before-after-animate');
                    sliderLine.classList.remove('before-after-animate');
                    sliderHandle.classList.remove('before-after-animate');
                }, 300);
            });
        }
    });
}

/**
 * Initialize FAQ accordion functionality
 */
function initializeFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on the question
            this.classList.toggle('active');
            
            // Get the answer element
            const answer = this.nextElementSibling;
            
            // Toggle active class on the answer
            answer.classList.toggle('active');
            
            // Close other open FAQs
            faqQuestions.forEach(q => {
                if (q !== question && q.classList.contains('active')) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('active');
                }
            });
        });
    });
}

/**
 * Initialize video player functionality
 */
function initializeVideoPlayer() {
    const playButton = document.querySelector('.play-button');
    const videoContainer = document.querySelector('.video-container');
    
    if (playButton && videoContainer) {
        playButton.addEventListener('click', function() {
            // Get the video poster image and replace with actual video
            const posterImage = videoContainer.querySelector('.video-placeholder');
            
            if (posterImage) {
                const videoSrc = posterImage.getAttribute('data-video-src') || 'https://www.youtube.com/embed/VIDEO_ID?autoplay=1';
                
                // Create iframe for video
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', videoSrc);
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allowfullscreen', 'allowfullscreen');
                iframe.setAttribute('allow', 'autoplay; encrypted-media');
                iframe.style.position = 'absolute';
                iframe.style.top = '0';
                iframe.style.left = '0';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                
                // Replace poster image with iframe
                posterImage.remove();
                this.remove();
                videoContainer.appendChild(iframe);
            }
        });
    }
}

/**
 * Initialize product add to cart functionality
 */
function initializeAddToCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get product info
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h4').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            // In a real implementation, this would add the product to a cart
            // For demo purposes, we'll just show a notification
            
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-check-circle"></i>
                    <p><strong>${productName}</strong> added to cart.</p>
                </div>
                <div class="notification-close">×</div>
            `;
            
            // Add notification to page
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => {
                notification.classList.add('active');
            }, 100);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.classList.remove('active');
                
                // Remove from DOM after fade out
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
            
            // Close notification when clicking the close button
            const closeButton = notification.querySelector('.notification-close');
            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    notification.classList.remove('active');
                    
                    // Remove from DOM after fade out
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                });
            }
            
            // Update cart count (in a real implementation)
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const currentCount = parseInt(cartCount.textContent) || 0;
                cartCount.textContent = currentCount + 1;
            }
        });
    });
}

/**
 * Create and append cart notification styles to the document
 */
(function createCartNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .cart-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 1000;
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
        }
        
        .cart-notification.active {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
        }
        
        .notification-content i {
            color: #4CAF50;
            font-size: 20px;
            margin-right: 10px;
        }
        
        .notification-content p {
            margin: 0;
        }
        
        .notification-close {
            margin-left: 20px;
            font-size: 20px;
            cursor: pointer;
            color: #8A8D91;
        }
    `;
    document.head.appendChild(style);
})();
