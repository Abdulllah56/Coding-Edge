// Fixed Testimonial Carousel Functionality
let currentTestimonialIndex = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.dot');
const totalSlides = testimonialSlides.length;
let testimonialInterval;

function updateCarouselPosition() {
  // Remove all classes from all slides
  testimonialSlides.forEach((slide, index) => {
    slide.classList.remove('active', 'prev', 'next');
    
    if (index === currentTestimonialIndex) {
      slide.classList.add('active');
    } else if (index < currentTestimonialIndex) {
      slide.classList.add('prev');
    } else {
      slide.classList.add('next');
    }
  });
  
  // Update dots
  testimonialDots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === currentTestimonialIndex) {
      dot.classList.add('active');
    }
  });
}

function nextTestimonial() {
  currentTestimonialIndex = (currentTestimonialIndex + 1) % totalSlides;
  updateCarouselPosition();
}

function prevTestimonial() {
  currentTestimonialIndex = (currentTestimonialIndex - 1 + totalSlides) % totalSlides;
  updateCarouselPosition();
}

function changeTestimonial(direction) {
  clearInterval(testimonialInterval);
  if (direction === 1) {
    nextTestimonial();
  } else {
    prevTestimonial();
  }
  startTestimonialAutoplay();
}

function currentTestimonial(index) {
  clearInterval(testimonialInterval);
  currentTestimonialIndex = index - 1;
  updateCarouselPosition();
  startTestimonialAutoplay();
}

function startTestimonialAutoplay() {
  testimonialInterval = setInterval(nextTestimonial, 5000);
}

// Initialize testimonial carousel
document.addEventListener('DOMContentLoaded', function() {
  updateCarouselPosition();
  startTestimonialAutoplay();
  
  // Pause autoplay on hover
  const testimonialContainer = document.querySelector('.testimonial-carousel-container');
  if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', () => {
      clearInterval(testimonialInterval);
    });
    
    testimonialContainer.addEventListener('mouseleave', () => {
      startTestimonialAutoplay();
    });
  }
});