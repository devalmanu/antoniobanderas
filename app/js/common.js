'use strict';

const mainIndexPage = document.querySelector('.main-index');

// scroll into block
document.querySelectorAll('a.link-button[href^="#"').forEach(link => {
   link.addEventListener('click', function (e) {
      e.preventDefault();
      let href = this.getAttribute('href').substring(1);

      const scrollTarget = document.getElementById(href);
      // const topOffsetHeader = document.querySelector('.header').offsetHeight;
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition;

      window.scrollBy({
         top: offsetPosition,
         behavior: 'smooth'
      });
   });
});

// animate elements
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
   window.addEventListener('scroll', animOnScroll);
   function animOnScroll() {
      for (let index = 0; index < animItems.length; index++) {
         const animItem = animItems[index];
         const animItemHeight = animItem.offsetHeight;
         const animItemOffset = offset(animItem).top;
         const animStart = 10;

         let animItemPoint = window.innerHeight - animItemHeight / animStart;
         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }

         if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
            animItem.classList.add('_active');
         } else {
            if (!animItem.classList.contains('_anim-no-hide')) {
               animItem.classList.remove('_active');
            }
         }
      }
   }
   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
   }

   setTimeout(() => {
      animOnScroll();
   }, 300);
}


const offerSection = document.querySelector('#offer');
const waterSection = document.querySelector('#water');
const sideBar = document.querySelector('.steps__sidebar');
// Получаем нужный элемент
let elementSteps = document.querySelector('#steps');
let elementSurprise = document.querySelector('#surprise');
let elementСreator = document.querySelector('#creator');
let elementFriends = document.querySelector('#friends');
// let elementProducts = document.querySelector('#products');

let allElementsSection = [elementSteps, elementSurprise, elementСreator, elementFriends];



function changeSideBarTitle() {
   allElementsSection.forEach((elem, i) => {
      if (isVisible(elem)) {
         let titleBar = elem.querySelector('h4.section-title').innerText;
         sideBar.querySelector('h4').innerText = titleBar;
      }
   });
}
function changeSideBarLink() {
   allElementsSection.forEach((elem, i) => {
      if (isVisible(elem)) {
         let elemNextId = elem.nextElementSibling;
         let elemParent = elem.closest(".pin-spacer");
         if (elemNextId) {
            sideBar.querySelector('.link-button').setAttribute('href', `#${elem.nextElementSibling.id}`);
         }
         if (elemNextId == 'null' && elemParent) {
            let elemfindInParent = elemParent.querySelector('.blockIn');
            let blockInId = elemfindInParent.getAttribute('id');
            sideBar.querySelector('.link-button').setAttribute('href', `#${blockInId}`);
         }
      }
   });
}
// Запускаем функцию при прокрутке страницы
window.addEventListener('scroll', function () {
   if (mainIndexPage) {
      sidebarFixed();
      if (window.innerWidth >= 1200) {
         // startAnimate();
         toggleVisibilityClass(document.querySelector('#steps'));
         stepsAppearance();
      }
   }
});

window.addEventListener('load', function () {
   if (mainIndexPage) {
      if (window.innerWidth >= 1200) {
         startAnimate();
         toggleVisibilityClass(document.querySelector('#steps'));
         stepsAppearance();
      }
   }
});

window.addEventListener('resize', function () {
   // startAnimate();
});

function sidebarFixed() {
   // const offerSectionTop = offerSection.offsetTop;
   if (mainIndexPage) {
      const offerSectionHeight = offerSection.offsetHeight;

      if (window.pageYOffset > offerSectionHeight) {
         sideBar.classList.add('bar-fixed');
         changeSideBarTitle();
         if (window.innerWidth < 1200) {
            changeSideBarLink();
         }

      } else {
         sideBar.classList.remove('bar-fixed');
      }
   }

}

function visibleDiv(target) {
   // Все позиции элемента
   let targetPosition = {
      top: window.pageYOffset + target.getBoundingClientRect().top,
      // left: window.pageXOffset + target.getBoundingClientRect().left,
      // right: window.pageXOffset + target.getBoundingClientRect().right,
      bottom: window.pageYOffset + target.getBoundingClientRect().bottom
   },
      // Получаем позиции окна
      windowPosition = {
         top: window.pageYOffset,
         left: window.pageXOffset,
         right: window.pageXOffset + document.documentElement.clientWidth,
         bottom: window.pageYOffset + document.documentElement.clientHeight
      };

   if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
      targetPosition.top < windowPosition.bottom) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
      // Если элемент полностью видно, то запускаем следующий код
      let titleBar = target.querySelector('h4.section-title').innerText;
      sideBar.querySelector('h4').innerText = titleBar;
      sideBar.querySelector('.link-button').setAttribute('href', `#${target.nextElementSibling.id}`);
   }
};


function isVisible(elem) {
   if (mainIndexPage) {
      const headerHeight = 0; //document.querySelector("header").offsetHeight;
      const windowPosition = {
         top: window.pageYOffset,
         bottom: window.pageYOffset + document.documentElement.clientHeight
      };
      const targetPosition = {
         top: window.pageYOffset + headerHeight + elem.getBoundingClientRect().top,
         bottom: window.pageYOffset + elem.getBoundingClientRect().bottom
      }

      return (targetPosition.bottom >= windowPosition.top && targetPosition.top <= windowPosition.bottom)
   }

}

function toggleVisibilityClass(elem) {
   if (isVisible(elem)) {
      elem.classList.add("visible");
   } else {
      elem.classList.remove("visible");
   }

}


gsap.registerPlugin(ScrollTrigger);

function startAnimate() {
   if (mainIndexPage) {
      const steps = document.querySelector("#steps");

      gsap.registerPlugin(ScrollTrigger);

      // gsap.registerPlugin();
      let scene_1 = gsap.timeline();

      ScrollTrigger.create({
         animation: scene_1,
         trigger: ".page_body",
         start: "top top",
         end: "+=500",
         paused: true,
         scrub: true,
      });
      scene_1.to("#offer", {
         ease: "power1.out",
         duration: 2,
      });
      scene_1.to("#offer-content", {
         scrollTrigger: {
            trigger: ".offer",
            start: "top 0%",
            end: "bottom 0%",
            scrub: 2,
         },
         top: "auto",
         ease: "linear",
         scale: 0.65,
         position: "fixed",
         opacity: 0,
         stagger: 0.3,
      });

      scene_1.to("#offer__arrow", {
         scrollTrigger: {
            trigger: ".offer",
            start: "top 0%",
            end: "bottom 50%",
            scrub: 5,
         },
         opacity: 0,
      });

      /* вторая секция */
      let scene_2 = gsap.timeline();
      ScrollTrigger.create({
         animation: scene_2,
         trigger: ".steps",
         start: "top top",
         end: "bottom",
         scrub: true,
         pin: true,
         onEnter: function () {
            document.querySelector("#water .link-button").setAttribute("href", "#surprise")
         },
         onLeave: function () {
            steps.classList.add("leave");
         },
         onEnterBack: function () {
            steps.classList.remove("leave");
         },
      });

      // появление кругов
      scene_2.fromTo(".steps__number-ball", {
         opacity: 0,
         scale: 0
      }, {
         opacity: 1,
         scale: 1,
         duration: 0.1,
         ease: "power2.out",
      }, 0);

      // появление линий
      scene_2.fromTo(".finish-line", {
         opacity: 0,
      }, {
         opacity: 1,
         duration: 0.1,
         ease: "power2.out"
      }, "<25%")


      // исчезновение всех кругов
      scene_2.to(".steps__number-ball", {
         opacity: 0,
         scale: 0,
         duration: 0.1,
         ease: "power2.out"
      }, 0.1);

      // исчезновение линий
      scene_2.to(".finish-line", {
         opacity: 0,
         duration: 0.1,
         ease: "power2.out",
      }, 0.1)

      /* 3 третья секция */
      let scene_3 = gsap.timeline();

      ScrollTrigger.create({
         animation: scene_3,
         trigger: elementSurprise,
         start: 'top top',
         end: 'bottom',
         scrub: true,
         onEnter: function () {
            document.querySelector("#water .link-button").setAttribute("href", "#creator")
         },
         // pin: true,
      });
      // появление первого приза
      scene_3.fromTo('.surprise__one .surprise__img', {
         scrollTrigger: {
            trigger: '.surprise__slide-1',
            start: 'top bottom',
            scrub: 3,
         },
         x: '90vw',
         scale: 2,
         opacity: 1,
         duration: 0.5,
      }, {
         scrollTrigger: {
            trigger: '.surprise__slide-1',
            start: 'top center',
            scrub: 2,
         },
         scale: 0.7,
         opacity: 1,
         duration: 0.3,
         delay: 0.5,
         x: '-50vw',
      }, ">");
      // появление второй приза
      scene_3.fromTo('.surprise__two .surprise__img', {
         scrollTrigger: {
            trigger: '.surprise__slide-2',
            start: 'top bottom',
            scrub: 3,
         },
         x: '-100vw',
         scale: 1.5,
         opacity: 1,
         duration: 0.5,
      }, {
         scrollTrigger: {
            trigger: '.surprise__slide-2',
            start: 'top center',
            scrub: 2,
         },
         scale: 0.5,
         opacity: 1,
         duration: 0.3,
         delay: 0.5,
         x: '100vw',
      }, ">");
      // появление текста Главный приз
      scene_3.fromTo('#surprise__maintext', {
         scrollTrigger: {
            trigger: '.surprise__slide-3',
            scrub: 3,
         },
         y: '-20vh',
         scale: 0.8,
         opacity: 0,
         duration: 2.5, ease: "power1.out",
      }, {
         scrollTrigger: {
            trigger: '.surprise__slide-3',
            scrub: 1,
         },
         scale: 1,
         opacity: 1,
         duration: 2.5, ease: "power1.out",
         y: '0',
      }, ">");
      scene_3.fromTo('.surprise__slide-3 img', {
         scrollTrigger: {
            trigger: '.surprise__slide-3',
            scrub: 3,
         },
         scale: 0.8,
         opacity: 1,
         duration: 2.5, ease: "power1.out",
      }, {
         scrollTrigger: {
            trigger: '.surprise__slide-3',
            scrub: 1,
         },
         scale: 1.2,
         opacity: 1,
         delay: 0.5,
         duration: 2.5, ease: "power1.out",
      }, ">");

      /* 4 секция */
      let scene_4 = gsap.timeline();
      ScrollTrigger.create({
         animation: scene_4,
         trigger: elementСreator,
         start: 'top top',
         end: 'top center',
         scrub: true,
         pin: true,
         onEnter: function () {
            document.querySelector("#water .link-button").setAttribute("href", "#friends")
         },
      });

      scene_4.fromTo(".creator__content", {
         scrollTrigger: {
            trigger: elementСreator,
            start: 'top bottom',
            scrub: 3,
         },
         scale: 1.8,
         // position: "fixed",
         ease: "power1.out",
         duration: 0.3,

      }, {
         scrollTrigger: {
            trigger: elementСreator,
            start: 'top center',
            scrub: 2,
         },
         ease: "power1.out",
         scale: 0,
         position: "sticky",
         opacity: 0.5,
         stagger: 0.3,
      }, 1);

      scene_4.fromTo(".creator .orbit-mercury:after", {
         opacity: 0,
      }, {
         opacity: 1,
         ease: "power1.out"
      },).fromTo(".creator .orbit-venus:after", {
         opacity: 0,
      }, {
         opacity: 1,
         ease: "power1.out"
      },).fromTo(".creator .orbit-earth:after", {
         opacity: 0,
      }, {
         opacity: 1,
         ease: "power1.out"
      },).fromTo(".creator .orbit-mars:after", {
         opacity: 0,
      }, {
         opacity: 1,
         ease: "power1.out"
      },);

      /* 5 секция */
      let scene_5 = gsap.timeline();
      // scene_5.timeScale(0.5)
      scene_5.to(elementFriends, {
         ease: "power1.out",
         duration: 1,
         onEnter: function () {
            document.querySelector("#water .link-button").setAttribute("href", "#eau-water")
         },
      });
      // scene_5.timeScale(0.25);
      ScrollTrigger.create({
         animation: scene_5,
         trigger: elementFriends,
         start: 'top top',
         end: 'bottom',
         scrub: true,
         pin: true,
         // marker: true,
      });

      scene_5.fromTo('.card-2', {
         scrollTrigger: {
            trigger: '.friends__content',
            start: 'top',
            scrub: 5,
         },
         top: "-15vw",
         right: "-60%",
         scale: 1.4,
         scrub: 2,
         delay: 0.5,
         opacity: 1,
         duration: 1.5, ease: "none",
      }, {
         scrollTrigger: {
            trigger: elementFriends,
            // scrub: 8,
         },
         scale: 1,
         scrub: 3,
         opacity: 0,
         top: "50%",
         right: "50%",
         xPercent: -50,
         yPercent: -50,
         duration: 4, ease: "none",
      }, 0.5);
      // появление первой карточки
      scene_5.fromTo('.card-1', {
         scrollTrigger: {
            trigger: elementFriends,
            scrub: 10,
         },
         top: "50vw",
         left: "-25vw",
         opacity: 1,
         scrub: 2,
         delay: 0.5,
         scale: 2,
         duration: 1.5, ease: "none",
      }, {
         scale: 0.8,
         opacity: 0,
         top: "50%",
         left: "50%",
         xPercent: -50,
         yPercent: -50,
         duration: 5, ease: "none",
         scrub: 3,
      }, 1.5);
      // четвертая карта
      scene_5.fromTo('.card-4', {
         scrollTrigger: {
            trigger: elementFriends,
            scrub: 15,
         },
         top: "40vw",
         right: "-50%",
         scale: 3,
         scrub: 2,
         delay: 0.5,
         opacity: 1,
         duration: 1.5, ease: "none",
      }, {
         scale: 1,
         scrub: 3,
         opacity: 0,
         top: "50%",
         right: "50%",
         xPercent: -50,
         yPercent: -50,
         duration: 5, ease: "none",
      }, 3);
      // третья карта
      scene_5.fromTo('.card-3', {
         scrollTrigger: {
            trigger: elementFriends,
            scrub: 18,
         },
         top: "25vw",
         left: "-40vw",
         scale: 2.5,
         scrub: 2,
         delay: 0.5,
         opacity: 1,
         duration: 1.5, ease: "none",
      }, {
         scale: 1,
         scrub: 3,
         opacity: 0,
         top: "50%",
         left: "50%",
         xPercent: -50,
         yPercent: -50,
         duration: 5, ease: "none",
      }, 4.5);

      scene_5.to('.friends__content', {
         scrollTrigger: {
            trigger: elementFriends,
            scrub: 20,
         },
         duration: 1.5, ease: "none",
         // scrub: 16,
      }, ">");
   }

}


function stepsAppearance() {
   const section = document.querySelector("#steps");
   const headerHeight = 0;
   const clientHeight = document.documentElement.clientHeight;

   const targetPosition = section.getBoundingClientRect().top + headerHeight;

   const elems = [
      section.querySelector("#step-one"),
      section.querySelector("#step-two"),
      section.querySelector("#steps__eua-blue"),
      section.querySelector("#steps__eua-dark"),
      section.querySelector("#step-three"),
      section.querySelector("#step-four"),
   ]

   const isLeave = section.classList.contains("leave"); // покинули блок, проскроллили ниже
   const opacity = isLeave ? 0 : 1;

   const styles = [
      {
         top: -200,
         left: -50,
         zoom: 2,
         opacity: opacity
      },
      {
         top: -150,
         left: 70,
         zoom: 2,
         opacity: opacity
      },
      {
         top: -50,
         left: 100,
         zoom: 3,
         opacity: opacity
      },
      {
         top: -10,
         left: -50,
         zoom: 3,
         opacity: opacity
      },
      {
         top: 0,
         left: -50,
         zoom: 2,
         opacity: opacity
      },
      {
         top: 0,
         left: 70,
         zoom: 2,
         opacity: opacity
      },
   ]

   setStepsStyles(elems, styles)

   if (section.classList.contains("visible")) {
      // сколько проскроллили относительно высоты окна
      const scrolledPart = (clientHeight - targetPosition) / clientHeight;

      // новые коэфициенты на основании проскролленой части
      let newStyles = [];
      styles.forEach((p) => {
         newStyles.push({
            top: (1 - scrolledPart) * p.top,
            left: (1 - scrolledPart) * p.left,
            zoom: isLeave ? (1.2 - scrolledPart) * 5 : p.zoom - scrolledPart * (p.zoom - 1),
            opacity: isLeave ? (1.2 - scrolledPart) * 5 : 1
         })
      })

      setStepsStyles(elems, newStyles)
   }
}

function setStepsStyles(elems, positions) {
   elems.forEach((elem, index) => {
      elem.style.transform = `translate(${positions[index].left}vw, ${positions[index].top}vh) scale(${positions[index].zoom})`;
      elem.style.opacity = positions[index].opacity;
   })
}
// page interactive image
const formCover = document.querySelector('.form-cover');

if (formCover) {
   const imageUpload = document.querySelector('#imageUpload');
   const imagePreview = document.querySelector('.imagePreview');

   function fileChanged() {
      const file = imageUpload.files[0];
      if (!file) {
         return;
      }
      // проверка формата файла
      if (/\.(jpe?g|png)$/i.test(file.name)) {
         // console.log(file.name);
         const reader = new FileReader();
         reader.addEventListener("load", function () {
            // convert image file to base64 string
            const image = new Image();
            image.src = reader.result;
            let url = 'url("' + image.src + '")';
            image.onload = function () {
               let messageError = formCover.querySelector('.message-error');
               messageError.style.display = 'none';
               if (image.width >= 600) {
                  imagePreview.style.backgroundImage = url;
                  return true;
               } else {
                  messageError.style.display = 'block';
                  messageError.textContent = `Фото меньше допустимого размера`;
               }
            };

         }, false);
         reader.readAsDataURL(file);

      }
   }

   imageUpload.addEventListener('change', fileChanged);

   const textDescription = document.querySelector('.avatar-description__text') // textarea
   const counter = document.querySelector('.counter-text__current'); // счётчик
   const avatarTitle = document.querySelector('.avatar-title-finish');
   const avatarDesc = document.querySelector('.avatar-desc-finish');


   const defaultSelect = () => {
      const element = document.querySelector('.select-default');
      const choices = new Choices(element, {
         searchEnabled: false,
      });
      let ariaLabel = element.getAttribute('aria-label');

      element.closest('.choices').setAttribute('aria-label', ariaLabel);
      element.addEventListener('change', function (event) {
         // let dropdownList = document.querySelector('.choices__list');
         // dropdownList.setAttribute('data-simplebar', '');
         avatarTitle.textContent = event.detail.value;
      });
   };

   defaultSelect();

   // выбор цвета заголовка
   const colorSelect = document.querySelector('.color-select');

   colorSelect.addEventListener('click', (e) => {
      if (e.target.classList.contains('color-select__btn')) {
         e.preventDefault()
         document.querySelectorAll('.color-select__btn').forEach(el => el.classList.remove('color-select__btn--active'));

         let color = e.target.dataset.color;
         let colorHex = e.target.style.backgroundColor;
         e.target.classList.add('color-select__btn--active');
         avatarDesc.style.color = colorHex;
         avatarTitle.style.color = colorHex;
      }
   });

   textDescription.addEventListener('input', onInput);

   function onInput(evt) {
      const length = evt.target.value.length;
      counter.textContent = length;
      avatarDesc.textContent = evt.target.value;
   }

   // преобразование готового изображения 
   const avatarCover = document.querySelector(".avatar-cover");
   const elementToSave = document.querySelector(".interactive__cover");
   const buttonGenerate = document.querySelector(".button-generate");
   const interactiveResult = document.querySelector(".interactive__result");
   const counterSteps = document.querySelector(".cover-counter__current");
   const coverSIdebarArrow = document.querySelector(".cover__arrow a");
   const linkBackPage = document.querySelector(".btn-back-link");

   let counterCoverSteps = 1;

   buttonGenerate.addEventListener('click', () => {

      let imageClone = imagePreview.cloneNode(true);
      avatarCover.appendChild(imageClone);

      formCover.classList.add('is-vishidden');
      interactiveResult.classList.remove('is-vishidden');

      counterSteps.textContent = counterCoverSteps + 1;
      coverSIdebarArrow.href = document.location.pathname;
      linkBackPage.href = document.location.pathname;

      html2canvas(elementToSave).then(canvas => {
         canvas.toBlob((blob) => {

            let formData = new FormData();

            formData.append('file_keeper[file]', blob, 'Antonio-Banderas.jpeg');

            fetch('https://icon-promo.ru/api/file_keepers', {
               body: formData,
               method: 'POST'
            })
               .then((response) => response.json())
               .then((result) => {
                  console.log(result.data.attributes.static_url)
                  // ССЫЛКА ПЕРЕДАЕТСЯ В <pre>
                  let pre = document.getElementById('log');
                  pre.innerText = result.data.attributes.static_url;
               })
         }, 'image/jpeg', 0.95);

      });
   });

   if (!interactiveResult.classList.contains('is-vishidden')) {
      // coverSIdebarArrow.href = `./interactive.html`;
      coverSIdebarArrow.addEventListener('click', () => {
         // e.preventDefault();
         interactiveResult.classList.add('is-vishidden');
         formCover.classList.remove('is-vishidden');
         counterSteps.textContent = counterCoverSteps - 1;
      });

   }

   const buttonSave = document.querySelector(".button-save");

   // Download with right click
   buttonSave.addEventListener("click", () => {
      html2canvas(elementToSave).then(canvas => {
         // document.body.appendChild(canvas);
         const a = document.createElement("a");
         let scrBase64 = canvas.toDataURL('image/jpeg', 1.0);
         a.href = scrBase64;
         a.download = "Antonio-Banderas.jpeg";
         a.click();
      });
   });
   // копирование ссылки
   const clipboard = new ClipboardJS('.btn-clipboard', {
      text: function (trigger) {
         return document.getElementById('log').innerText;
      }
   });

   clipboard.on('success', function (e) {
      // alert('Текст скопирован: ' + e.text);
      e.trigger.textContent = 'Скопировано';
      // Возращаем через 3 секунды текст триггеру на Копировать 
      window.setTimeout(function () {
         e.trigger.textContent = 'Cкопировать ссылку';
      }, 3000);
   });

   clipboard.on('error', function (e) {
      // console.log('Ошибка копирования');
   });


   // При перезагрузке страницы пользователя сохраняются данные
   // перед перезагрузкой или закрытием страницы (событие beforeunload) данные нужно сохранить
   // function setLocalStorage() {
   //    localStorage.setItem('avatar-title', avatarTitle.value);
   //    localStorage.setItem('avatar-title-color', avatarTitle.style.color);
   //    localStorage.setItem('avatar-description__text', textDescription.value);
   //    localStorage.setItem('counter-text__current', counter.innerHTML);
   //    localStorage.setItem('avatar-desc', avatarDesc.innerHTML);
   //    localStorage.setItem('avatar-desc-color', avatarDesc.style.color);
   //    localStorage.setItem('avatar-img', imagePreview.style.backgroundImage);
   // }
   // window.addEventListener('beforeunload', setLocalStorage)
   // // перед загрузкой страницы(событие load) данные нужно восстановить и отобразить
   // function getLocalStorage() {
   //    if (localStorage.getItem('avatar-title')) {
   //       avatarTitle.value = localStorage.getItem('avatar-title');
   //       avatarTitle.style.color = localStorage.getItem('avatar-title-color');
   //    }
   //    if (localStorage.getItem('avatar-description__text')) {
   //       textDescription.value = localStorage.getItem('avatar-description__text');
   //       counter.innerHTML = localStorage.getItem('counter-text__current');
   //       avatarDesc.innerHTML = localStorage.setItem('avatar-desc');
   //       avatarDesc.style.color = localStorage.getItem('avatar-desc-color');
   //    }
   //    if (localStorage.getItem('avatar-img')) {
   //       imagePreview.style.backgroundImage = localStorage.getItem('avatar-img');
   //    }
   // }
   // window.addEventListener('load', getLocalStorage)
}





