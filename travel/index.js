function openNav() {
    document.getElementById("sidepanel").style.right = '0px';
    document.getElementById("body-overlay").style.display = 'unset';
}

function closeNav() {
    document.getElementById("sidepanel").style.right = '-165px';
    document.getElementById("body-overlay").style.display = "none";
}

function openPopUpMenu() {
    document.getElementById('login-menu').style.top = '100px';
    document.getElementById("body-overlay").style.display = 'unset';
}

function openMobilePopUpMenu() {
    document.getElementById('login-menu').style.cssText = `
    top: 0;
    left: 0;
    width: 100%;
    `
    document.getElementById("body-overlay").style.display = 'unset';
}

function closePopUpMenu() {
    document.getElementById('login-menu').style.top = '-670px';
    document.getElementById("body-overlay").style.display = "none"
    document.getElementById('facebook').style.display = 'initial';
    document.getElementById('google').style.display = 'initial';
    document.getElementById('line-container').style.display = 'flex';
    document.getElementById('popup-heading').textContent = 'Log in to your account';
    document.getElementById('general').textContent = 'Sign In';
    document.getElementById('forgot-password').style.display = 'initial';
    document.getElementById('register1').style.display = 'initial';
    document.getElementById('register2').style.display = 'none';
    document.getElementById('login-menu').style.height = '660px';
}

function closeMobilePopUpMenu() {
    document.getElementById('login-menu').style.cssText = `
    top: -670px;
    left: 395px;
    width: 45.28%;
    `
}

function showAlert() {
    let message = document.getElementById('login').value + ' ' + document.getElementById('password').value;
    alert(message);
}

function changeMenu() {
   document.getElementById('popup-heading').textContent = 'Create account';
   document.getElementById('facebook').style.display = 'none';
   document.getElementById('google').style.display = 'none';
   document.getElementById('line-container').style.display = 'none';
   document.getElementById('forgot-password').style.display = 'none';
   document.getElementById('general').textContent = 'Sign Up';
   document.getElementById('register1').style.display = 'none';
   document.getElementById('register2').style.display = 'unset';
   document.getElementById('login-menu').style.height = '436px';
}

function changeToLoginMenu() {
    document.getElementById('facebook').style.display = 'initial';
    document.getElementById('google').style.display = 'initial';
    document.getElementById('line-container').style.display = 'flex';
    document.getElementById('popup-heading').textContent = 'Log in to your account';
    document.getElementById('general').textContent = 'Sign In';
    document.getElementById('forgot-password').style.display = 'initial';
    document.getElementById('register1').style.display = 'initial';
    document.getElementById('register2').style.display = 'none';
    document.getElementById('login-menu').style.height = '660px';
}

//=========================Slider===================================================================

/* console.log('1. Верстка соответствует макету. Ширина экрана 390px +48\n2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется не обрезается и не удаляется +0\n3. На ширине экрана 390px и меньше реализовано адаптивное меню +22\nОценка: 70 баллов') //вывести в консоль самооценку своей работы */
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');
const slider = document.querySelector('.destinations-figures');
const slides = document.querySelectorAll('.slides');
const dots = document.querySelectorAll('.dots__single-dot');
let currentSlide = slides[1];
let currentDot = dots[1];
const leftImage = slides[0];
const centralImage = slides[1];
const rightImage = slides[2];


window.addEventListener('load', () => {
    slider.style.left = 0;
})

function slideOnLeftDot() {
    let currentPosition = slider.style.left;
    dots[0].classList.add('dots__single-dot--active');
    if (currentDot === dots[1]) {
        dots[1].classList.remove('dots__single-dot--active');
        slider.style.left = parseInt(`${currentPosition}`) + 860 + 'px';
    } else if (currentDot === dots[2]) {
        dots[2].classList.remove('dots__single-dot--active');
        slider.style.left = parseInt(`${currentPosition}`) + 1720 + 'px';
    };
    currentSlide = slides[0];
    currentDot = dots[0];
}

function slideOnCentralDot() {
    let currentPosition = slider.style.left;
    dots[1].classList.add('dots__single-dot--active');
    if (currentDot === dots[0]) {
        dots[0].classList.remove('dots__single-dot--active');
        slider.style.left = parseInt(`${currentPosition}`) - 860 + 'px';
    } else if (currentDot === dots[2]) {
        dots[2].classList.remove('dots__single-dot--active');
        slider.style.left = parseInt(`${currentPosition}`) + 860 + 'px';
    }
    currentSlide = slides[1];
    currentDot = dots[1];
}

function slideOnRightDot() {
    let currentPosition = slider.style.left;
    dots[2].classList.add('dots__single-dot--active');
    if (currentDot === dots[0]) {
        dots[0].classList.remove('dots__single-dot--active');
        slider.style.left = parseInt(`${currentPosition}`) - 1720 + 'px';
    } else if (currentDot === dots[1]) {
        dots[1].classList.remove('dots__single-dot--active');
        slider.style.left = parseInt(`${currentPosition}`) - 860 + 'px';
    }
    currentSlide = slides[2];
    currentDot = dots[2];
}

function slideRight() {
    if (currentSlide === slides[0]) {
        dots[0].classList.remove('dots__single-dot--active');
        dots[1].classList.add('dots__single-dot--active');
        slides[0].classList.remove('slides--active');
        slides[1].classList.add('slides--active');
        currentSlide = slides[1];
        currentDot = dots[1];
        arrowLeft.classList.remove('arrow-left--disabled')
    } else if (currentSlide === slides[1]) {
        dots[1].classList.remove('dots__single-dot--active');
        dots[2].classList.add('dots__single-dot--active');
        slides[1].classList.remove('slides--active');
        slides[2].classList.add('slides--active');
        currentSlide = slides[2];
        currentDot = dots[2];
        arrowRight.classList.add('arrow-right--disabled');
    }
}

function slideLeft() {
    if (currentSlide === slides[1]) {
        dots[0].classList.add('dots__single-dot--active');
        dots[1].classList.remove('dots__single-dot--active');
        slides[0].classList.add('slides--active');
        slides[1].classList.remove('slides--active');
        currentSlide = slides[0];
        currentDot = dots[0];
        arrowLeft.classList.add('arrow-left--disabled');
    } else if (currentSlide === slides[2]) {
        dots[1].classList.add('dots__single-dot--active');
        dots[2].classList.remove('dots__single-dot--active');
        slides[1].classList.add('slides--active');
        slides[2].classList.remove('slides--active');
        currentSlide = slides[1];
        currentDot = dots[1];
        arrowRight.classList.remove('arrow-right--disabled')
    }
}

arrowRight.addEventListener('click', slideRight)
arrowLeft.addEventListener('click', slideLeft)
dots[0].addEventListener('click', slideOnLeftDot)
leftImage.addEventListener('click', slideOnLeftDot)
dots[1].addEventListener('click', slideOnCentralDot)
centralImage.addEventListener('click', slideOnCentralDot)
dots[2].addEventListener('click', slideOnRightDot)
rightImage.addEventListener('click', slideOnRightDot)