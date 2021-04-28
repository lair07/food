/*jshint esversion: 8 */

function slider({container, slide, last, next, totalCounter, currentCounter, wrapper, field}) {

    const sliders = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        lastSlide = document.querySelector(last),
        currentSlide = document.querySelector(currentCounter),
        allSlides = document.querySelector(totalCounter),
        nextSlide = document.querySelector(next),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field), // внутренний большой слайд со всеми элементами
        width = window.getComputedStyle(slidesWrapper).width; // window.getComputedStyle(slidesWrapper) потому что здесь вернется объект с всеми внесенными свойствами и из него выташим только ширину 
    let index = 1;
    let offset = 0;
    let dots = [];


    if (sliders.length < 10) {
        currentSlide.innerHTML = `0${index}`;
        allSlides.innerHTML = `0${sliders.length}`;
    } else {
        currentSlide.innerHTML = `${index}`;
        allSlides.innerHTML = `${sliders.length}`;
    }


    slidesField.style.width = 100 * sliders.length + '%';
    slidesField.style.display = 'flex'; // чтобы они выстроились в ряд
    slidesField.style.transition = '0.5s all'; // чтобы листалось с замедлением плавно 
    slidesWrapper.style.overflow = 'hidden'; // скрываем все элемты, которые выходят за область видимости

    sliders.forEach(slider => {
        slider.style.width = width; // все слайды теперь одинаковой ширины и они помешаются в тот блок который будет виден (та ячейка в замке, где видно цифру)
    });

    slider.style.position = 'relative'; // теперь все элементы которые находятся внутри слайдера будут нормально отображаться 

    const indicator = document.createElement('ol');
    indicator.classList.add('carousel-indicators');
    slider.append(indicator);

    for (let i = 0; i < sliders.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); // к каждой точке будет установлен датаатрибут датаслайдто и будет установлена нумерация причем начиная с единицы
        dot.classList.add('dot');
        indicator.append(dot);
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.push(dot);
    }

    nextSlide.addEventListener('click', () => {
        if (offset == +(width.replace('px', '')) * (sliders.length - 1)) { // ширина одного слайда умноженного на колличество слайдов
            offset = 0; // это значит что долистали до самого конца и нужно вернуться в самое начало 
        } else {
            offset += +(width.replace('px', '')); // когда мы нажимаем стрелку вперед к слайду который виден добавляеся еще один такой же слайд и слайд будет смещаться на определенную ширину 
        }
        slidesField.style.transform = `translateX(-${offset}px)`; // мы смещаем картинки по оси икс и если мы смещаем их влево то они идут со знаком минус

        if (index == sliders.length) {
            index = 1;
        } else {
            index++;
        }

        getZeroToSlider();

        dotsOpacity();
    });

    lastSlide.addEventListener('click', () => {
        if (offset == 0) { // когда слайдер нажимая на левую стрелку дойдет до нуля и надо чтобы он перешел на последний слайд в данном случае на четвертый
            offset = +(width.replace('px', '')) * (sliders.length - 1); // переходит на последний слайд ( на 4)
        } else {
            offset -= +(width.replace('px', '')); // из этой переменной каждый раз будет отниматься ширина слайда на которую я смещаюсь
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (index == 1) {
            index = sliders.length;
        } else {
            index--;
        }

        getZeroToSlider();

        dotsOpacity();

    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            index = slideTo;
            offset = +(width.replace('px', '')) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            getZeroToSlider();

            dotsOpacity();

        });
    });

    function dotsOpacity() {
        dots.forEach(dot => {
            dot.style.opacity = '.5'; // в начальном положении у каждой точки установили полупрозрачность
        });
        dots[index - 1].style.opacity = 1;
    }

    function getZeroToSlider() {
        if (sliders.length < 10) {
            currentSlide.innerHTML = `0${index}`;
        } else {
            currentSlide.innerHTML = `${index}`;
        }

    }

    // allSlides.innerHTML = getZeroToSlider(sliders.length);
    // currentSlide.innerHTML = getZeroToSlider(index+1);

    // sliders.forEach(slide => {
    //     slide.classList.add('hide');
    // });

    // function showSlide (slide) {
    //     slide.classList.remove('hide');
    //     slide.classList.add('show');
    // }

    // function hideSlide (slide) {
    //     slide.classList.remove('show');
    //     slide.classList.add('hide');
    // }

    // при захождении на сайт нужно чтобы автоматически открывался первый слайд
    // showSlide(sliders[0]);

    // nextSlide.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     if (index < sliders.length) {
    //         index++;
    //         showSlide(sliders[index]);
    //         hideSlide(sliders[index-1]);
    //         currentSlide.innerHTML = getZeroToSlider(index+1)
    //     }
    // });

    // lastSlide.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     if (index > 0) {
    //         index--;
    //         showSlide(sliders[index]);
    //         hideSlide(sliders[index+1]);
    //         currentSlide.innerHTML = getZeroToSlider(index+1);
    //     }
    // });

}

export default slider;