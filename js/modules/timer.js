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

export default timer;