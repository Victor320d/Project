// Этот файл предназначен для ваших JavaScript-скриптов.
// Согласно Заданию 1 Модуля 2, он будет подключен перед закрывающим тегом </body>.

// Здесь вы будете реализовывать:
// - Функционал создания и вывода карточек (Задание 2 Модуля 2)
// - Инициализация слайдера Swiper.js (Задание 2.1 Модуля 2)
// - Логика модального окна и формы (Задание 2.2 Модуля 2)
// - Функционал прелоадера (Задание 2.3 Модуля 2)
// - Получение данных для карточек с сервера (Задание 3 Модуля 2)

// Функция для создания и добавления информационных карточек в Swiper wrapper
function createInfoCards() {
    // Временные данные для карточек. В будущем здесь может быть fetch-запрос к серверу.
    const infoData = [
        { text: "ИИ-навигация" }, // Сокращено
        { text: "Голосовой ассистент" }, // Сокращено
        { text: "Оптимизация маршрутов" }, // Сокращено
        { text: "Зрение для водителя" }, // Сокращено и изменено
        { text: "Умный дом: интеграция" }, // Сокращено и изменено
        { text: "Автообновление ПО" }, // Сокращено
        { text: "Личные рекомендации" }, // Сокращено
        { text: "Безопасное вождение" } // Сокращено
    ];

    const swiperWrapper = document.querySelector('.myInfoSlider .swiper-wrapper');
    if (!swiperWrapper) {
        console.error('Swiper wrapper not found!');
        return;
    }

    // Очищаем существующие слайды (если они есть) перед добавлением новых
    swiperWrapper.innerHTML = '';

    infoData.forEach(item => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');

        const infoItem = document.createElement('div');
        infoItem.classList.add('info-item');

        const infoText = document.createElement('p');
        infoText.classList.add('info-item__text');
        infoText.textContent = item.text;

        infoItem.appendChild(infoText);
        slide.appendChild(infoItem);
        swiperWrapper.appendChild(slide);
    });
    console.log('Info cards created and appended.');
}


document.addEventListener('DOMContentLoaded', () => {
    // Функционал прелоадера (Задание 2.3 Модуля 2)
    const preloader = document.getElementById('preloader');

    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('hidden');
            preloader.addEventListener('transitionend', () => {
                preloader.remove();
            }, { once: true });
        }
    }, 1000); // Задержка перед началом скрытия (1 секунда)

    // Вызываем функцию создания карточек ПЕРЕД инициализацией Swiper
    createInfoCards();

    // Инициализация Swiper для секции дополнительных информационных блоков
   new Swiper('.myInfoSlider', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
        nextEl: '.custom-swiper-button-next',
        prevEl: '.custom-swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 5 }
    },
    on: {
        init: function () {
            console.log('Swiper инициализирован!');
            // Добавим диагностику для кнопок, чтобы убедиться, что они найдены Swiper'ом
            const customNext = document.querySelector('.custom-swiper-button-next');
            const customPrev = document.querySelector('.custom-swiper-button-prev');
            if (customNext) {
                console.log('Кастомная кнопка NEXT найдена в DOM и передана Swiper.');
            } else {
                console.error('ОШИБКА: Кастомная кнопка NEXT НЕ найдена в DOM!');
            }
            if (customPrev) {
                console.log('Кастомная кнопка PREV найдена в DOM и передана Swiper.');
            } else {
                console.error('ОШИБКА: Кастомная кнопка PREV НЕ найдена в DOM!');
            }
        }
    }
});

    // ----- Логика модального окна (Задание 2.2 Модуля 2) -----
    const modal = document.getElementById('contactModal');
    const openModalButtons = document.querySelectorAll('.open-modal-button'); // Для кнопок "Подробнее"
    const heroModalButton = document.getElementById('openModalButton'); // Для кнопки "Смотреть больше"
    const closeButton = document.querySelector('.close-button');
    const cancelButton = document.querySelector('.modal-button--cancel');
    const sendButton = document.querySelector('.modal-button--send');
    const modalForm = document.querySelector('.modal-form');

    // Функция для открытия модального окна
    function openModal() {
        modal.classList.add('show');
        // Добавляем класс к body, чтобы предотвратить прокрутку фона
        document.body.classList.add('modal-open');
    }

    // Функция для закрытия модального окна
    function closeModal() {
        modal.classList.remove('show');
        // Удаляем класс с body
        document.body.classList.remove('modal-open');
        // Очищаем поля формы при закрытии
        modalForm.reset();
    }

    // Открытие модального окна по кнопке "Смотреть больше"
    if (heroModalButton) {
        heroModalButton.addEventListener('click', openModal);
    }

    // Открытие модального окна по кнопкам "Подробнее"
    openModalButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });

    // Закрытие модального окна по кнопке "x"
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Закрытие модального окна по кнопке "Отмена"
    if (cancelButton) {
        cancelButton.addEventListener('click', closeModal);
    }

    // Закрытие модального окна по клику вне его (на оверлей)
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // Обработка отправки формы (для примера, просто закрываем окно)
    if (sendButton) {
        sendButton.addEventListener('click', (event) => {
            event.preventDefault(); // Предотвращаем стандартную отправку формы
            // Здесь может быть ваша логика отправки данных (например, fetch API)
            console.log('Данные отправлены:', {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value
            });
            alert('Сообщение отправлено!'); // Использование alert здесь уместно для демонстрации
            closeModal(); // Закрываем модальное окно после "отправки"
        });
    }
});

// Добавим стиль для body, чтобы предотвратить прокрутку фона при открытом модальном окне
// Этот стиль должен быть в вашем global.css или style.css
// body.modal-open {
//     overflow: hidden;
// }