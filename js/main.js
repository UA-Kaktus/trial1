document.addEventListener("DOMContentLoaded", () => {
    const sliderWrapper = document.querySelector('[js-slider-wrapper]'),
          sliderImages = document.querySelectorAll('[js-slider-img'),
          sliderThumbs = document.querySelectorAll('[js-slider-thumb]');

    const arrowLeft = document.querySelector('[js-slider-left]'),
          arrowRight = document.querySelector('[js-slider-right]');

    const imageWidth = window.getComputedStyle(sliderImages[0]).width.slice(0,-2)

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

    //валідація форми
    const validateEmail = (email) => {
        return String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    let statusForSendingData = true;

    validation('[js-form]');

    function validation(parentForm) {
        const form = document.querySelector(parentForm),
              formButton = form.querySelector('[js-form-submit]'),
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