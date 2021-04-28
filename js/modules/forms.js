/*jshint esversion: 8 */
import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

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

            postData('http://localhost:3000/requests', json)
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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');

        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));


}

export default forms;