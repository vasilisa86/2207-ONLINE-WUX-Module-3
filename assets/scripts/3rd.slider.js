// ==== Third Party Slider Main Page ===== //
const slideContainer = document.querySelector('.slider');
const sliderText = document.querySelector('.slider--text');
const btnLeft = document.querySelector('.slider__btn-left');
const btnRight = document.querySelector('.slider__btn-right');

// costanta for images
const sliderImages = [
    {
        src: './assets/images/background.jpg',
        text: 'Enjoy the Omaha beach sunset'
    },
    {
        src: './assets/images/background2.jpg',
        text: 'Visit Tawharanui Regional Park'
    },
    {
        src: './assets/images/background3.jpg',
        text: 'Taste Matakana Farmers Market'
    }
];

let slideCounter = 0;
// slider initiation 
const startSlider = () => {
    slideContainer.style.backgroundImage = `linear-gradient(
      to right,
      rgba(34, 34, 34, 0.4),
      rgba(68, 68, 68, 0.4)
    ), url(${sliderImages[0].src})`;
    sliderText.innerHTML = sliderImages[0].text;
};
// Right button
btnRight.addEventListener('click', function () {
    if (slideCounter === sliderImages.length - 1) {
        slideContainer.style.backgroundImage = `linear-gradient(
      to right,
      rgba(34, 34, 34, 0.4),
      rgba(68, 68, 68, 0.4)
    ), url(${sliderImages[0].src})`;
        sliderText.innerHTML = sliderImages[0].text;
        slideCounter = -1;

        slideContainer.classList.add('fadeIn');
        setTimeout(() => {
            slideContainer.classList.remove('fadeIn');
        }, 1000);
    }
    slideContainer.style.backgroundImage = `linear-gradient(
      to right,
      rgba(34, 34, 34, 0.4),
      rgba(68, 68, 68, 0.4)
      ),url(${sliderImages[slideCounter + 1].src})`;
    sliderText.innerHTML = sliderImages[slideCounter + 1].text;
    slideCounter++;
    slideContainer.classList.add('fadeIn');
    setTimeout(() => {
        slideContainer.classList.remove('fadeIn');
    }, 1000);
});
//Left button
btnLeft.addEventListener('click', function () {
    if (slideCounter === 0) {
        slideContainer.style.backgroundImage = `linear-gradient(
      to right,
      rgba(34, 34, 34, 0.4),
      rgba(68, 68, 68, 0.4)
    ),url(${sliderImages[sliderImages.length - 1].src})`;
        sliderText.innerHTML = sliderImages[sliderImages.length - 1].text;
        slideCounter = sliderImages.length;
        slideContainer.classList.add('fadeIn');
        setTimeout(() => {
            slideContainer.classList.remove('fadeIn');
        }, 1000);
    }

    slideContainer.style.backgroundImage = `linear-gradient(
      to right,
      rgba(34, 34, 34, 0.4),
      rgba(68, 68, 68, 0.4)
    ),url(${sliderImages[slideCounter - 1].src})`;
    sliderText.innerHTML = sliderImages[slideCounter - 1].text;
    slideCounter--;
    slideContainer.classList.add('fadeIn');
    setTimeout(() => {
        slideContainer.classList.remove('fadeIn');
    }, 1000);
});
//DOM
document.addEventListener('DOMContentLoaded', startSlider);
