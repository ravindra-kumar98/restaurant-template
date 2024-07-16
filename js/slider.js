 // Get all the background divs
 var backgrounds = document.querySelectorAll(".background");
 // Get the slider and the images
 const slider = document.querySelector(".slider-images");
 const images = Array.from(slider.children);

 // Set the initial image index
 let imageIndex = 0;

 // Array to store content for each slide
 const slidesContent = [
     {
         heading: "Gourmet Cheeseburger",
         description: "Indulge in our gourmet cheeseburger, stacked high with fresh lettuce, juicy tomatoes, melted cheese, and a perfectly seasoned beef patty. A taste sensation that satisfies every craving.",
         price: "₹109"
     },
     {
         heading: "Classic Margherita Pizza",
         description: "Enjoy the timeless flavors of our classic Margherita pizza. Topped with fresh basil, ripe tomatoes, and mozzarella cheese, this pizza is a slice of heaven.",
         price: "₹599"
     },
     {
         heading: "Authentic Vada Pav",
         description: "Experience the vibrant flavors of Mumbai with our authentic Vada Pav. A spicy potato fritter sandwiched between soft buns, served with tangy chutneys and green chilies for a burst of flavor.",
         price: "₹99"
     },
     {
         heading: "Ultimate Pepperoni Slice",
         description: "Dive into the gooey, cheesy goodness of our ultimate pepperoni slice. Perfectly baked with a crispy crust and loaded with pepperoni, this slice is a treat for all pizza lovers.",
         price: "₹399"
     },
     {
         heading: "Food Item 1",
         description: "Delicious food item 1 description.",
         price: "$10.99"
     }
 ];

 // Function to update the slider content
function updateSlider() {
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
    const priceElement = document.getElementById("price");

    headingElement.textContent = slidesContent[imageIndex].heading;
    descriptionElement.textContent = slidesContent[imageIndex].description;
    priceElement.textContent = slidesContent[imageIndex].price;

    // Apply fade-in animation
    headingElement.classList.remove('fade-in-text');
    descriptionElement.classList.remove('fade-in-text');
    priceElement.classList.remove('fade-in-text');

    void headingElement.offsetWidth; // Trigger reflow to restart the animation
    void descriptionElement.offsetWidth; // Trigger reflow to restart the animation
    void priceElement.offsetWidth; // Trigger reflow to restart the animation

    headingElement.classList.add('fade-in-text');
    descriptionElement.classList.add('fade-in-text');
    priceElement.classList.add('fade-in-text');

    // Update the image index
    imageIndex = (imageIndex + 1) % images.length;
}

// Initial update of the slider
updateSlider();

// Update the slider every 3 seconds
setInterval(updateSlider, 3000);

images[1].classList.add("next");
images[2].classList.add("inactive");
images[3].classList.add("inactive");
images[0].classList.add("active");
