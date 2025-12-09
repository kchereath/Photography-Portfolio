/**
 * Carousel Module
 * Handles image navigation with next/prev buttons and keyboard support
 * Each carousel instance manages one film roll independently
 */

class Carousel {
    constructor(carouselElement) {
        this.carousel = carouselElement;
        this.images = Array.from(this.carousel.querySelectorAll('.carousel-img'));
        this.currentIndex = 0;
        this.prevBtn = this.carousel.querySelector('.carousel-prev');
        this.nextBtn = this.carousel.querySelector('.carousel-next');
        this.indicators = Array.from(this.carousel.querySelectorAll('.indicator'));
        
        this.init();
    }
    
    init() {
        // Attach event listeners
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        
        // Add keyboard support (arrow keys)
        this.carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Add indicator click support
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Display first image
        this.updateCarousel();
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateCarousel();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.images.length) {
            this.currentIndex = index;
            this.updateCarousel();
        }
    }
    
    updateCarousel() {
        // Hide all images
        this.images.forEach((img, index) => {
            img.classList.remove('active');
            if (index === this.currentIndex) {
                img.classList.add('active');
            }
        });
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === this.currentIndex) {
                indicator.classList.add('active');
            }
        });
    }
}

// Initialize all carousels on page load
document.addEventListener('DOMContentLoaded', () => {
    const carouselElements = document.querySelectorAll('.carousel');
    carouselElements.forEach(element => {
        new Carousel(element);
    });
});
