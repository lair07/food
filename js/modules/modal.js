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

export default modal;
export {closeModal, openModal};