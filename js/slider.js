var backgrounds = document.querySelectorAll(".background");
const slider = document.querySelector(".slider-images"),
    images = Array.from(slider.children);
let imageIndex = 0;
const slidesContent = [
    {
        heading: "Gourmet Cheeseburger",
        description: "Indulge in our gourmet cheeseburger, stacked high with fresh lettuce, juicy tomatoes, melted cheese, and a perfectly seasoned beef patty. A taste sensation that satisfies every craving.",
        price: "₹109",
    },
    { heading: "Classic Margherita Pizza", description: "Enjoy the timeless flavors of our classic Margherita pizza. Topped with fresh basil, ripe tomatoes, and mozzarella cheese, this pizza is a slice of heaven.", price: "₹599" },
    {
        heading: "Authentic Vada Pav",
        description: "Experience the vibrant flavors of Mumbai with our authentic Vada Pav. A spicy potato fritter sandwiched between soft buns, served with tangy chutneys and green chilies for a burst of flavor.",
        price: "₹99",
    },
    {
        heading: "Ultimate Pepperoni Slice",
        description: "Dive into the gooey, cheesy goodness of our ultimate pepperoni slice. Perfectly baked with a crispy crust and loaded with pepperoni, this slice is a treat for all pizza lovers.",
        price: "₹399",
    },
    { heading: "Cheeseburger", description: "A taste sensation that satisfies every craving.", price: "₹319" },
];
function typeWriter(e, t, i = 100)
{
    return new Promise((a) =>
    {
        let s = 0;
        (e.textContent = ""),
            (function n()
            {
                s < t.length ? ((e.textContent += t.charAt(s)), s++, setTimeout(n, i)) : a();
            })();
    });
}
async function updateSlider()
{
    images.forEach((e) =>
    {
        e.classList.remove("active", "previous", "next", "inactive");
    }),
        images[imageIndex].classList.add("active"),
        imageIndex - 1 >= 0 ? images[imageIndex - 1].classList.add("previous") : images[images.length - 1].classList.add("previous"),
        imageIndex + 1 < images.length ? images[imageIndex + 1].classList.add("next") : images[0].classList.add("next"),
        images.forEach((e, t) =>
        {
            t !== imageIndex && t !== (imageIndex - 1 + images.length) % images.length && t !== (imageIndex + 1) % images.length && e.classList.add("inactive");
        }),
        backgrounds.forEach((e) =>
        {
            e.style.opacity = 0;
        }),
        images[imageIndex].classList.contains("active") && (backgrounds[imageIndex].style.opacity = 1);
    let e = document.getElementById("heading"),
        t = document.getElementById("description"),
        i = document.getElementById("price");
    (e.textContent = slidesContent[imageIndex].heading),
        (t.textContent = slidesContent[imageIndex].description),
        (i.textContent = slidesContent[imageIndex].price),
        e.classList.remove("fade-in-text"),
        t.classList.remove("fade-in-text"),
        i.classList.remove("fade-in-text"),
        e.offsetWidth,
        t.offsetWidth,
        i.offsetWidth,
        e.classList.add("fade-in-text"),
        t.classList.add("fade-in-text"),
        i.classList.add("fade-in-text"),
        await typeWriter(e, slidesContent[imageIndex].heading),
        (imageIndex = (imageIndex + 1) % images.length);
}
updateSlider(), setInterval(updateSlider, 3e3);
