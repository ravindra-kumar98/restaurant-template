// Get all the background divs
var backgrounds = document.querySelectorAll(".background");
// Get the slider and the images
const slider = document.querySelector(".slider-images");
const images = Array.from(slider.children);

// Set the initial image index
let imageIndex = 0;

// Flag to check if typing is in progress
let isTypingInProgress = false;

// Array to store content for each slide
const slidesContent = [
    {
        heading: "Gourmet Cheeseburger",
        description: "Indulge in our gourmet cheeseburger, stacked high with fresh lettuce, juicy tomatoes, melted cheese, and a perfectly seasoned beef patty. A taste sensation that satisfies every craving.",
    },
    {
        heading: "Classic Margherita Pizza",
        description: "Enjoy the timeless flavors of our classic Margherita pizza. Topped with fresh basil, ripe tomatoes, and mozzarella cheese, this pizza is a slice of heaven.",
    },
    {
        heading: "Authentic Vada Pav",
        description: "Experience the vibrant flavors of Mumbai with our authentic Vada Pav. A spicy potato fritter sandwiched between soft buns, served with tangy chutneys and green chilies for a burst of flavor.",
    },
    {
        heading: "Ultimate Pepperoni Slice",
        description: "Dive into the gooey, cheesy goodness of our ultimate pepperoni slice. Perfectly baked with a crispy crust and loaded with pepperoni, this slice is a treat for all pizza lovers.",
    }
];

// Function to animate typing effect with line break handling
function typeWriter(element, text, delay = 100) {
    return new Promise((resolve) => {
        let index = 0;
        const measureDiv = document.createElement('div');
        measureDiv.style.position = 'absolute';
        measureDiv.style.visibility = 'hidden';
        measureDiv.style.whiteSpace = 'nowrap';
        measureDiv.style.font = window.getComputedStyle(element).font;
        document.body.appendChild(measureDiv);

        function type() {
            if (index < text.length) {
                const char = text.charAt(index);
                measureDiv.textContent += char;
                
                if (measureDiv.offsetWidth > element.offsetWidth) {
                    // Line break needed
                    const lastSpace = element.innerHTML.lastIndexOf(' ');
                    if (lastSpace !== -1) {
                        element.innerHTML = element.innerHTML.substring(0, lastSpace) + '<br>' + 
                                            element.innerHTML.substring(lastSpace + 1);
                        measureDiv.textContent = text.substring(text.lastIndexOf(' ') + 1, index + 1);
                    } else {
                        element.innerHTML += '<br>';
                        measureDiv.textContent = char;
                    }
                }

                element.innerHTML += char;
                index++;
                setTimeout(type, delay);
            } else {
                document.body.removeChild(measureDiv);
                isTypingInProgress = false;
                resolve();
            }
        }

        element.textContent = ''; // Clear the content before typing
        isTypingInProgress = true;
        type();
    });
}

// Function to update the slider content
async function updateSlider() {
    // If typing is in progress, don't update
    if (isTypingInProgress) return;

    // Remove the 'active', 'previous', 'next', and 'inactive' classes from all images
    images.forEach((image) => {
        image.classList.remove("active", "previous", "next", "inactive");
    });

    // Add the 'active' class to the current image
    images[imageIndex].classList.add("active");

    // Add the 'previous' class to the image before the current one
    if (imageIndex - 1 >= 0) {
        images[imageIndex - 1].classList.add("previous");
    } else {
        images[images.length - 1].classList.add("previous");
    }

    // Add the 'next' class to the image after the current one
    if (imageIndex + 1 < images.length) {
        images[imageIndex + 1].classList.add("next");
    } else {
        images[0].classList.add("next");
    }

    // Add the 'inactive' class to the other images
    images.forEach((image, index) => {
        if (index !== imageIndex && index !== (imageIndex - 1 + images.length) % images.length && index !== (imageIndex + 1) % images.length) {
            image.classList.add("inactive");
        }
    });

    // Set the opacity of all the background divs to 0
    backgrounds.forEach((background) => {
        background.style.opacity = 0;
    });

    // If the current image is active, set the opacity of the corresponding background div to 1
    if (images[imageIndex].classList.contains("active")) {
        backgrounds[imageIndex].style.opacity = 1;
    }

    // Update the text content
    const headingElement = document.getElementById("heading");
    const descriptionElement = document.getElementById("description");

    headingElement.classList.remove('fade-in-text');
    descriptionElement.classList.remove('fade-in-text');

    void headingElement.offsetWidth; // Trigger reflow to restart the animation
    void descriptionElement.offsetWidth; // Trigger reflow to restart the animation

    headingElement.classList.add('fade-in-text');
    descriptionElement.classList.add('fade-in-text');

    // Always show the description immediately
    descriptionElement.textContent = slidesContent[imageIndex].description;

    // Run typing animation for the heading
    await typeWriter(headingElement, slidesContent[imageIndex].heading);

    // Update the image index
    imageIndex = (imageIndex + 1) % images.length;
}

// Wrapper function for updateSlider to handle its asynchronous nature
async function updateSliderWrapper() {
    await updateSlider();
}

// Initial update of the slider
updateSliderWrapper();

// Update the slider every 3 seconds
setInterval(updateSliderWrapper, 8000);