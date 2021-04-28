/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculate.js":
/*!*********************************!*\
  !*** ./js/modules/calculate.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*jshint esversion: 8 */

function calc() {
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;


    if (localStorage.getItem('sex')) { // если в лс уже присутвует (стоит в значении тру) такой ключ тоего значение мы присаеваем переменной
        sex = localStorage.getItem('sex');
    } else { // а если его там нет мы устонавливаеем по умолчанию девушка
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }


    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }


    function initLocalSettings(selector, activClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) { // если хотя б что то из этого будет фолс то есть не заполнено пользователем или не указано то калькулятор не будет работать 
            result.textContent = '____';
            return; // пустое return досрочно прирывает функцию и все дальнейшие действия которые идут после условия работать не будут
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);

        }
    }
    calcTotal();

    function getStaticInformation(selector, activClass) {
        const elements = document.querySelectorAll(selector); // таким образом говорится что внутри родителя будут получатся все дивы

        elements.forEach(elem => {
            elem.addEventListener('click', (event) => {
                if (event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
                } else {
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', event.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activClass);
                });
                event.target.classList.add(activClass);

                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');



    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);


        input.addEventListener('input', () => {

            if (input.value.match(/\D+/g)) {
                input.style.boxShadow = '0 3px 16px #ff51518c';
            } else {
                input.style.boxShadow = '0 4px 15px rgba(0,0,0,.2)';

            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();

        });

    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/*jshint esversion: 8 */


function cards () {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parentSelector = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH () {
            this.price *= this.transfer;
        }

        render () {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = ` 
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parentSelector.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/*jshint esversion: 8 */



function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(e => {
        bindPostData(e);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display:block;
            margin: 0 auto;`;
            form.insertAdjacentElement('afterend', statusMessage); // чтобы изза спинера формы не смещались влево

            const formData = new FormData(form); // специальный объект, который позволяет с определенной формы быстро сформировать данные, которые заполнил пользователь, а потом при помощи фетч отправляет их на сервер

            // трансформация формдэйта в json формат
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset(); // сброс данных из формы (ее отчистка) это идет в финнали так как вне зависимости был ли запрос на сервер удачным или нет форма должна очищаться
                });

        });
    }

    function showThanksModal(message) {
        const prevModalDialogs = document.querySelector('.modal__dialog');

        prevModalDialogs.classList.add('hide'); // скрывается
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialogs.classList.add('show');
            prevModalDialogs.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');

        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
/*jshint esversion: 8 */

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // чтобы когда пользователь открывал модальноее окно он не мог крутить сам сайт
    
    if (modalTimerId) { // если модалтаймерайди существует то только тогда вызываем клеарИнтервал
        clearInterval(modalTimerId);
    }

}
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide'); 
    document.body.style.overflow = ''; // после закрытия мод окн сайт можно снова прокручивать
}


function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); // так мы не можем вызывать функцию в колбеке тоесть писать вот так openModal(modalSelector), поэтому мы ее оборачиваем в стрелочную функцию
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code == "Escape") {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*jshint esversion: 8 */
function tabs (tabsSelector, tabsContentSelector, tabsParentSelector, activClass) {
    let tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove(activClass);
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add(activClass);
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains(tabsSelector.slice(1))) { // slice тк бращаемся не к '.tabheader__item' а к тому же только без точки поэтому ее нужно убрать с помощью слайс
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
	});
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*jshint esversion: 8 */

function timer(id, deadline) {

    function getTimeRemaning(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), // часов должно быть не больше 24
            minutes = Math.floor((t / 1000 / 60) % 60), // минут должно быть не ольше 60
            seconds = Math.floor((t / 1000) % 60); // секунд должно быть не больше 60

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"), // обращается к каждому элементу на хтмл странице по их айдишнику
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000); // функция вызывается через одинаковый промежуток времени

        updateClock(); // так как когда запускается код он идет идет и доходит до сетинтервала, который запускает функцию

        function updateClock() {
            const t = getTimeRemaning(endtime); //  в значеение этой переменной записывается объект который возвращается этой функциею updateClock только через секунду мы при каждом обновлении видим мигание таймера то есть сначала начальное время а потом уже отсчет, поэтому мы вызываем эту функцию

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);


            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
/*jshint esversion: 8 */

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' // для формдата хедр был не нужен, поэтому он был закомментирован, а ля джсон он нужен
        },
        body: data
    });
    return await res.json(); // - это промис
};
// podtData - настраивает запрос, посылает запрос на сервер, получает какой-то ответ от сервера(что напримерр все прошло успешно) и после этого трансформирует этот объект в джсон

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status:${res.status}`);
    }

    return await res.json(); // - это промис
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculate */ "./js/modules/calculate.js");
/*jshint esversion: 8 */

 // мы не ставим .js так как webpack и так знает что еему надо собирать








window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)('.modal', modalTimerId), 5000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__.default)('.timer', '2021-07-08');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default)('[data-modal]', '.modal', modalTimerId);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)({
        container: '.offer__slider',
        slide: '.offer__slide',
        last: '.offer__slider-prev',
        next: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'

    });
    (0,_modules_calculate__WEBPACK_IMPORTED_MODULE_6__.default)();
});
// мы используем дата атрибуты, если хотим указать что разные элеенты (с разными классам и тегам вызывают одно и то же)
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map