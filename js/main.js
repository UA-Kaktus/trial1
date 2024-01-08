document.addEventListener("DOMContentLoaded", () => {
    // const sliderWrapper = document.querySelector('[data-js="slider-wrapper"]'),
    //       sliderImages = document.querySelectorAll('[data-js="slider-img"]'),
    //       sliderThumbs = document.querySelectorAll('[data-js="slider-thumb"]');

    // const arrowLeft = document.querySelector('[data-js="slider-left"]'),
    //       arrowRight = document.querySelector('[data-js="slider-right"]');

    // const imageWidth = window.getComputedStyle(sliderImages[0]).width.slice(0,-2)

    // let currentSlide = 0;

    // changeButtonDis();

    // sliderThumbs.forEach((el,ind) => {
    //     el.addEventListener('click', () => {
    //         changeCurrentSlide(ind);
    //         changeButtonDis();
    //     });
    // });

    // arrowLeft.addEventListener('click', () => {
    //     onArrowCLick(-1);
    //     changeButtonDis();
    // });
    // arrowRight.addEventListener('click', () => {
    //     onArrowCLick(1);
    //     changeButtonDis();
    // });

    // function changeButtonDis() {
    //     arrowLeft.disabled = false;
    //     arrowRight.disabled = false;

    //     if (currentSlide == 0) {
    //         arrowLeft.disabled = true;
    //     }
    //     if (currentSlide == sliderImages.length - 1) {
    //         arrowRight.disabled = true;
    //     }
    // }

    // function changeCurrentSlide(ind) {
    //     sliderThumbs.forEach(el => {
    //         el.classList.remove('slider-thumb_active');
    //     });
    //     sliderWrapper.style.left = `-${ind * imageWidth}px`;

    //     sliderThumbs[ind].classList.add('slider-thumb_active');
    //     currentSlide = ind;
    // }

    // function onArrowCLick(num) {
    //     currentSlide = currentSlide + num;
    //     sliderThumbs.forEach(el => {
    //         el.classList.remove('slider-thumb_active');
    //     });
    //     sliderWrapper.style.left = `-${currentSlide * imageWidth}px`;

    //     sliderThumbs[currentSlide].classList.add('slider-thumb_active');
    // }

    //валідація форми
    const validateEmail = (email) => {
        return String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    let statusForSendingData = true;

    validation('[data-js="form"]');

    function validation(parentForm) {
        const form = document.querySelector(parentForm),
              formButton = form.querySelector('[data-js="form-submit"]'),
              formInputs = form.querySelectorAll('input:not([type="submit"])');

        formButton.addEventListener('click', e => {
            e.preventDefault();
            statusForSendingData = true;

            formInputs.forEach(el => {
                if (el.name == 'email' && !validateEmail(el.value)) {
                    el.labels[0].classList.add('incorrect');
                    statusForSendingData = false;
                }

                if (el.name == 'phone') {
                    if(el.value.toString().length < 8) {
                        el.labels[0].classList.add('incorrect');
                        statusForSendingData = false;
                    }
                }

                if (el.name == 'name' && !el.value) {
                    el.labels[0].classList.add('incorrect');
                    statusForSendingData = false;
                }

                if (el.name == 'surname' && !el.value) {
                    el.labels[0].classList.add('incorrect');
                    statusForSendingData = false;
                }
            });

            if (statusForSendingData) {
                //send data
                formInputs.forEach(el => {
                    el.value = '';
                });
            }
        });

        formInputs.forEach( el => el.addEventListener('input', () => {
            el.labels[0].classList.remove('incorrect');
        }));
    }
});

getData('../source.json');

function getData(url) {
    fetch(url).
    then(response => response.json()).
    then(data => {
        renderPage(data);
        initSlider();
    });
}

function renderPage(data) {
    if(data.sliderImages) {
        data.sliderImages.forEach((el,ind) => {
            const element = document.createElement('img');
            element.src = el;
            element.alt = 'slider image';
            element.dataset.js = 'slider-img';
            document.querySelector('[data-js="slider-wrapper"]').append(element);

            const elementThumb = document.createElement('img');
            elementThumb.src = el;
            elementThumb.alt = 'thumb image';
            ind == 0 ? elementThumb.classList.add('slider-thumb', 'slider-thumb_active') : elementThumb.classList.add('slider-thumb');
            elementThumb.dataset.js = 'slider-thumb';
            document.querySelector('[data-js="slider-thumbs"]').append(elementThumb);
        });
    }

    if(data.name) {
        document.querySelectorAll('[data-js="place-for-name"]').forEach(el => {
            el.innerHTML = data.name;
        });
    }

    data.priceBefore ? document.querySelector('[data-js="price-before"]').innerHTML = data.priceBefore : null;
    data.priceDiscount ? document.querySelector('[data-js="price-discount"]').innerHTML = data.priceDiscount : null;
    data.imageInQuiz ? document.querySelectorAll('[data-js="image-in-quiz"]').forEach(el => el.src = data.imageInQuiz) : null;
    data.imageForAnimation ? document.querySelector('[data-js="image-for-animation"]').src = data.imageForAnimation : null;
    data.imagePresent ? document.querySelectorAll('[data-js="present-img"]').forEach(el => el.src = data.imagePresent) : null;
    
}

function initSlider() {
    const sliderWrapper = document.querySelector('[data-js="slider-wrapper"]'),
          sliderImages = document.querySelectorAll('[data-js="slider-img"]'),
          sliderThumbs = document.querySelectorAll('[data-js="slider-thumb"]');

    const arrowLeft = document.querySelector('[data-js="slider-left"]'),
          arrowRight = document.querySelector('[data-js="slider-right"]');

    const imageWidth = 298;

    let currentSlide = 0;

    changeButtonDis();

    sliderThumbs.forEach((el,ind) => {
        el.addEventListener('click', () => {
            changeCurrentSlide(ind);
            changeButtonDis();
        });
    });

    arrowLeft.addEventListener('click', () => {
        onArrowCLick(-1);
        changeButtonDis();
    });
    arrowRight.addEventListener('click', () => {
        onArrowCLick(1);
        changeButtonDis();
    });

    function changeButtonDis() {
        arrowLeft.disabled = false;
        arrowRight.disabled = false;

        if (currentSlide == 0) {
            arrowLeft.disabled = true;
        }
        if (currentSlide == sliderImages.length - 1) {
            arrowRight.disabled = true;
        }
    }

    function changeCurrentSlide(ind) {
        sliderThumbs.forEach(el => {
            el.classList.remove('slider-thumb_active');
        });

        sliderWrapper.style.left = `-${ind * imageWidth}px`;

        sliderThumbs[ind].classList.add('slider-thumb_active');
        currentSlide = ind;
    }

    function onArrowCLick(num) {
        currentSlide = currentSlide + num;
        sliderThumbs.forEach(el => {
            el.classList.remove('slider-thumb_active');
        });
        sliderWrapper.style.left = `-${currentSlide * imageWidth}px`;

        sliderThumbs[currentSlide].classList.add('slider-thumb_active');
    }
}