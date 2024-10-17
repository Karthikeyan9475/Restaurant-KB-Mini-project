// Get all sliders and buttons
const sliders = document.querySelectorAll('.slider-container');

sliders.forEach((slider) => {
    // Get the specific product inventory, previous, and next buttons within each slider
    const productInventory = slider.querySelector('.product-inventory');
    const prevBtn = slider.querySelector('.angleleft');
    const nextBtn = slider.querySelector('.angleright');

    // Get the width of one product including margins
    const productWidth = slider.querySelector('.product').offsetWidth + 20;

    // Initially hide prev button (at the start)
    prevBtn.style.display = 'none';

    // Variables for drag and scroll
    let isDragging = false;
    let startX;
    let scrollLeft;

    // Move to the previous products
    prevBtn.addEventListener('click', () => {
        productInventory.scrollLeft -= productWidth;

        // Show next button if we are not at the end anymore
        nextBtn.style.display = 'block';

        // Hide prev button if we're at the start
        if (productInventory.scrollLeft <= productWidth) {
            prevBtn.style.display = 'none';
        }
    });

    // Move to the next products
    nextBtn.addEventListener('click', () => {
        productInventory.scrollLeft += productWidth;

        // Show prev button if we moved forward
        prevBtn.style.display = 'block';

        // Hide next button if we're at the end
        if (productInventory.scrollLeft + productInventory.clientWidth >= productInventory.scrollWidth) {
            nextBtn.style.display = 'none';
        }
    });

    // Ensure buttons are updated when manually scrolled (using mouse/touch)
    productInventory.addEventListener('scroll', () => {
        // Show or hide prev button based on scroll position
        if (productInventory.scrollLeft <= 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
        }

        // Show or hide next button based on scroll position
        if (productInventory.scrollLeft + productInventory.clientWidth >= productInventory.scrollWidth) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'block';
        }
    });

    // Mouse and touch drag functionality
    productInventory.addEventListener('mousedown', (e) => {
        isDragging = true;
        productInventory.classList.add('active'); // Optional: Add CSS class for dragging state
        startX = e.pageX - productInventory.offsetLeft;
        scrollLeft = productInventory.scrollLeft;
    });

    productInventory.addEventListener('mouseleave', () => {
        isDragging = false;
        productInventory.classList.remove('active');
    });

    productInventory.addEventListener('mouseup', () => {
        isDragging = false;
        productInventory.classList.remove('active');
    });

    productInventory.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - productInventory.offsetLeft;
        const walk = (x - startX) * 2; // The 2 multiplier is for faster scrolling
        productInventory.scrollLeft = scrollLeft - walk;
    });

    // Touch support for mobile devices
    productInventory.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - productInventory.offsetLeft;
        scrollLeft = productInventory.scrollLeft;
    });

    productInventory.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - productInventory.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed here if necessary
        productInventory.scrollLeft = scrollLeft - walk;
    });

    productInventory.addEventListener('touchend', () => {
        isDragging = false;
    });
});
// //tutor joes
// let sliderPosition=0;
// const sliders= document.querySelectorAll('.product');
// const totalSlider=sliders.length;
// const btnPrev=document.querySelector('#prev');
// const btnNext=document.querySelector('#next');

// btnPrev.addEvenListerner('click',function(){
//     PrevSlide();
// });
// btnNext.addEvenListerner('click',function(){
//     NextSlide();
// });

// function UpdatePosition(){
//     sliders.forEach(slide=>{
//         slide.classList.remove('active');
//         slide.classList.add('hidden');
//     })

//     sliders[sliderPosition].classList.add('active'); 
// }

// function PrevSlide(){
//     if(sliderPosition==0){
//         sliderPosition=totalSlider-1;
//     }
//     else{
//     sliderPosition--;
//     }
//     UpdatePosition();
// }
// function NextSlide(){
//     if(sliderPosition==totalSlider-1){
//         sliderPosition=0;
//     }
//     else{
//         sliderPosition++;
//     }
//     sliderPosition++;
//     UpdatePosition();
// }