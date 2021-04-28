/*jshint esversion: 8 */

import tabs from './modules/tabs'; // мы не ставим .js так как webpack и так знает что еему надо собирать
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calculate from './modules/calculate';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 5000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2021-07-08');
    modal('[data-modal]', '.modal', modalTimerId);
    cards();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        last: '.offer__slider-prev',
        next: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'

    });
    calculate();
});
// мы используем дата атрибуты, если хотим указать что разные элеенты (с разными классам и тегам вызывают одно и то же)