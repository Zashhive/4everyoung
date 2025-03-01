// In a real implementation, this would send the message to a backend
            // For demo purposes, we'll simulate a response after 1 second
            setTimeout(() => {
                chatMessages.innerHTML += `
                    <div class="chat-message agent">
                        <div class="message-bubble">Thank you for your message. How can I help you with our skincare services today?</div>
                        <div class="message-time">${currentTime}</div>
                    </div>
                `;
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }
    
    // Cookie helper functions
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }
    
    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    // Booking form validation
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            
            // Simple validation
            let isValid = true;
            
            if (!firstName.value.trim()) {
                showError(firstName, 'First name is required');
                isValid = false;
            } else {
                removeError(firstName);
            }
            
            if (!lastName.value.trim()) {
                showError(lastName, 'Last name is required');
                isValid = false;
            } else {
                removeError(lastName);
            }
            
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(email);
            }
            
            if (!phone.value.trim()) {
                showError(phone, 'Phone number is required');
                isValid = false;
            } else {
                removeError(phone);
            }
            
            // If form is valid, proceed to next step
            if (isValid) {
                // In a real implementation, this would submit the form or advance to the next step
                // For demo purposes, we'll simulate a success message
                const bookingSteps = document.querySelector('.booking-steps');
                const confirmationStep = document.querySelector('.booking-confirmation');
                
                if (bookingSteps && confirmationStep) {
                    bookingSteps.style.display = 'none';
                    confirmationStep.style.display = 'block';
                    
                    // Scroll to top of confirmation
                    window.scrollTo({
                        top: confirmationStep.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
    
    function showError(input, message) {
        // Get the parent form-group element
        const formGroup = input.closest('.form-group');
        
        // Remove any existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error class to input
        input.classList.add('error');
        
        // Create and append error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }
    
    function removeError(input) {
        // Get the parent form-group element
        const formGroup = input.closest('.form-group');
        
        // Remove error class from input
        input.classList.remove('error');
        
        // Remove any existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function isValidEmail(email) {
        // Simple email validation regex
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    // Service selection in booking form
    const serviceCards = document.querySelectorAll('.service-option');
    
    if (serviceCards.length > 0) {
        serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                // Remove selected class from all cards
                serviceCards.forEach(c => c.classList.remove('selected'));
                
                // Add selected class to clicked card
                this.classList.add('selected');
                
                // Update hidden input with selected service
                const serviceInput = document.getElementById('selectedService');
                const serviceId = this.getAttribute('data-service-id');
                const serviceName = this.querySelector('h4').textContent;
                const servicePrice = this.querySelector('.price').textContent;
                
                if (serviceInput) {
                    serviceInput.value = serviceId;
                }
                
                // Update booking summary
                const summaryService = document.querySelector('.summary-service-name');
                const summaryPrice = document.querySelector('.summary-service-price');
                
                if (summaryService && summaryPrice) {
                    summaryService.textContent = serviceName;
                    summaryPrice.textContent = servicePrice;
                    
                    // Recalculate total
                    updateTotalPrice();
                }
            });
        });
    }
    
    // Date and time selection in booking form
    const calendarDays = document.querySelectorAll('.calendar-day:not(.unavailable)');
    const timeSlots = document.querySelectorAll('.time-slot:not(.unavailable)');
    
    if (calendarDays.length > 0) {
        calendarDays.forEach(day => {
            day.addEventListener('click', function() {
                // Remove selected class from all days
                calendarDays.forEach(d => d.classList.remove('selected'));
                
                // Add selected class to clicked day
                this.classList.add('selected');
                
                // Update hidden input with selected date
                const dateInput = document.getElementById('selectedDate');
                const date = this.getAttribute('data-date');
                
                if (dateInput) {
                    dateInput.value = date;
                }
                
                // Update booking summary
                const summaryDate = document.querySelector('.summary-date');
                
                if (summaryDate) {
                    summaryDate.textContent = formatDate(date);
                }
                
                // Show time slots for the selected date
                const selectedDateTimeSlots = document.querySelector('.time-slots[data-date="' + date + '"]');
                const allTimeSlots = document.querySelectorAll('.time-slots');
                
                if (allTimeSlots.length > 0) {
                    allTimeSlots.forEach(slots => {
                        slots.style.display = 'none';
                    });
                }
                
                if (selectedDateTimeSlots) {
                    selectedDateTimeSlots.style.display = 'block';
                }
            });
        });
    }
    
    if (timeSlots.length > 0) {
        timeSlots.forEach(slot => {
            slot.addEventListener('click', function() {
                // Remove selected class from all time slots
                timeSlots.forEach(s => s.classList.remove('selected'));
                
                // Add selected class to clicked time slot
                this.classList.add('selected');
                
                // Update hidden input with selected time
                const timeInput = document.getElementById('selectedTime');
                const time = this.getAttribute('data-time');
                
                if (timeInput) {
                    timeInput.value = time;
                }
                
                // Update booking summary
                const summaryTime = document.querySelector('.summary-time');
                
                if (summaryTime) {
                    summaryTime.textContent = time;
                }
            });
        });
    }
    
    // Add-on products selection
    const productAddons = document.querySelectorAll('.product-addon');
    
    if (productAddons.length > 0) {
        productAddons.forEach(addon => {
            addon.addEventListener('click', function() {
                this.classList.toggle('selected');
                
                const checkbox = this.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
                
                // Update booking summary
                updateAddons();
                updateTotalPrice();
            });
        });
    }
    
    function updateAddons() {
        const selectedAddons = document.querySelectorAll('.product-addon.selected');
        const addonsSummary = document.querySelector('.summary-addons');
        
        if (addonsSummary) {
            if (selectedAddons.length > 0) {
                let addonsList = '';
                
                selectedAddons.forEach(addon => {
                    const addonName = addon.querySelector('h5').textContent;
                    const addonPrice = addon.querySelector('.addon-price').textContent;
                    
                    addonsList += `
                        <div class="summary-addon-item">
                            <div class="summary-addon-name">${addonName}</div>
                            <div class="summary-addon-price">${addonPrice}</div>
                        </div>
                    `;
                });
                
                addonsSummary.innerHTML = addonsList;
                addonsSummary.style.display = 'block';
            } else {
                addonsSummary.innerHTML = '';
                addonsSummary.style.display = 'none';
            }
        }
    }
    
    function updateTotalPrice() {
        const servicePrice = document.querySelector('.summary-service-price');
        const addonItems = document.querySelectorAll('.summary-addon-price');
        const totalElement = document.querySelector('.summary-total-price');
        
        if (servicePrice && totalElement) {
            let total = parseFloat(servicePrice.textContent.replace(/[^0-9.-]+/g, ''));
            
            if (addonItems.length > 0) {
                addonItems.forEach(addon => {
                    total += parseFloat(addon.textContent.replace(/[^0-9.-]+/g, ''));
                });
            }
            
            totalElement.textContent = '$' + total.toFixed(2);
        }
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    // Initialize any sliders
    initializeSliders();
    
    function initializeSliders() {
        const sliders = document.querySelectorAll('.slider');
        
        sliders.forEach(slider => {
            const slides = slider.querySelectorAll('.slide');
            const prevButton = slider.querySelector('.slider-prev');
            const nextButton = slider.querySelector('.slider-next');
            let currentSlide = 0;
            
            // Hide all slides except the first one
            slides.forEach((slide, index) => {
                if (index !== 0) {
                    slide.style.display = 'none';
                }
            });
            
            // Previous slide
            if (prevButton) {
                prevButton.addEventListener('click', function() {
                    slides[currentSlide].style.display = 'none';
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                    slides[currentSlide].style.display = 'block';
                });
            }
            
            // Next slide
            if (nextButton) {
                nextButton.addEventListener('click', function() {
                    slides[currentSlide].style.display = 'none';
                    currentSlide = (currentSlide + 1) % slides.length;
                    slides[currentSlide].style.display = 'block';
                });
            }
        });
    }
});
