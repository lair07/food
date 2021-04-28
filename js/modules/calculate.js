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

export default calc;