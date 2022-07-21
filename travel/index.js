function openNav() {
    document.getElementById("sidepanel").style.right = '0px';
    document.getElementById("body-overlay").style.display = 'unset';
}

function closeNav() {
    document.getElementById("sidepanel").style.right = '-165px';
    document.getElementById("body-overlay").style.display = "none";
}

let registerText = document.querySelectorAll('.register__text');
let register = document.querySelector('.register')

function openPopUpMenu() {
    document.getElementById('login-menu').style.top = '100px';
    document.getElementById("body-overlay").style.display = 'unset';
    registerText[0].classList.add('register__text--active');
    register.classList.add('register--active');
}

function openMobilePopUpMenu() {
    document.getElementById('login-menu').style.cssText = `
    top: 0;
    left: 0;
    width: 100%;
    `
    document.getElementById("body-overlay").style.display = 'unset';
    registerText[0].classList.add('register__text--active');
    registerText[1].classList.add('register__text--active');
    register.classList.add('register--active');
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
    registerText[0].classList.remove('register__text--active');
    registerText[1].classList.remove('register__text--active');
}

function closeMobilePopUpMenu() {
    document.getElementById('login-menu').style.cssText = `
    top: -670px;
    left: 27.43vw;
    width: 45.28%;
    `;
    document.getElementById("body-overlay").style.display = "none";
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
   registerText[1].classList.add('register__text--active');
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

let overlay = document.querySelector('.body-overlay');
overlay.addEventListener('click', () => {
    if (document.innerWidth < 391) {
        closeMobilePopUpMenu();
    } else {
        closePopUpMenu();
    }
})

//=========================Slider===================================================================

const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');
const slider = document.querySelector('.destinations-figures');
const slides = document.querySelectorAll('.slides');
const dots = document.querySelectorAll('.dots__single-dot');
let currentDesktopSlide = slides[1];
let currentDesktopDot = dots[1];
let currentMobileSlide = slides[1];
let currentMobileDot = dots[1]
const leftImage = slides[0];
const centralImage = slides[1];
const rightImage = slides[2];


window.addEventListener('load', () => {
    slider.style.left = 0;
})

function slideOnLeftDot() {
        let currentPosition = slider.style.left;
        dots[0].classList.add('dots__single-dot--active');
        if (currentDesktopDot === dots[1]) {
            dots[1].classList.remove('dots__single-dot--active');
            slider.style.left = parseInt(`${currentPosition}`) + 860 + 'px';
        } else if (currentDesktopDot === dots[2]) {
            dots[2].classList.remove('dots__single-dot--active');
            slider.style.left = parseInt(`${currentPosition}`) + 1720 + 'px';
        };
        currentDesktopSlide = slides[0];
        currentDesktopDot = dots[0];
    }

function slideOnCentralDot() {
        let currentPosition = slider.style.left;
        dots[1].classList.add('dots__single-dot--active');
        if (currentDesktopDot === dots[0]) {
        dots[0].classList.remove('dots__single-dot--active');
        slider.style.left = parseInt(`${currentPosition}`) - 860 + 'px';
        } else if (currentDesktopDot === dots[2]) {
        dots[2].classList.remove('dots__single-dot--active');
        slider.style.left = parseInt(`${currentPosition}`) + 860 + 'px';
    }
    currentDesktopSlide = slides[1];
    currentDesktopDot = dots[1];
    }

function slideOnRightDot() {
        let currentPosition = slider.style.left;
        dots[2].classList.add('dots__single-dot--active');
        if (currentDesktopDot === dots[0]) {
            dots[0].classList.remove('dots__single-dot--active');
            slider.style.left = parseInt(`${currentPosition}`) - 1720 + 'px';
        } else if (currentDesktopDot === dots[1]) {
            dots[1].classList.remove('dots__single-dot--active');
            slider.style.left = parseInt(`${currentPosition}`) - 860 + 'px';
        }
        currentDesktopSlide = slides[2];
        currentDesktopDot = dots[2];
    }

function slideRight() {
    if (currentMobileSlide === slides[0]) {
        dots[0].classList.remove('dots__single-dot--active');
        dots[1].classList.add('dots__single-dot--active');
        slides[0].classList.remove('slides--active');
        slides[1].classList.add('slides--active');
        currentMobileSlide = slides[1];
        currentMobileDot = dots[1];
        arrowLeft.classList.remove('arrow-left--disabled')
    } else if (currentMobileSlide === slides[1]) {
        dots[1].classList.remove('dots__single-dot--active');
        dots[2].classList.add('dots__single-dot--active');
        slides[1].classList.remove('slides--active');
        slides[2].classList.add('slides--active');
        currentMobileSlide = slides[2];
        currentMobileDot = dots[2];
        arrowRight.classList.add('arrow-right--disabled');
    }
}

function slideLeft() {
    if (currentMobileSlide === slides[1]) {
        dots[0].classList.add('dots__single-dot--active');
        dots[1].classList.remove('dots__single-dot--active');
        slides[0].classList.add('slides--active');
        slides[1].classList.remove('slides--active');
        currentMobileSlide = slides[0];
        currentMobileDot = dots[0];
        arrowLeft.classList.add('arrow-left--disabled');
    } else if (currentMobileSlide === slides[2]) {
        dots[1].classList.add('dots__single-dot--active');
        dots[2].classList.remove('dots__single-dot--active');
        slides[1].classList.add('slides--active');
        slides[2].classList.remove('slides--active');
        currentMobileSlide = slides[1];
        currentMobileDot = dots[1];
        arrowRight.classList.remove('arrow-right--disabled')
    }
}

arrowRight.addEventListener('click', slideRight)
arrowLeft.addEventListener('click', slideLeft)
leftImage.addEventListener('click', slideOnLeftDot)
centralImage.addEventListener('click', slideOnCentralDot)
rightImage.addEventListener('click', slideOnRightDot)
dots[0].addEventListener('click', slideOnLeftDot)
dots[1].addEventListener('click', slideOnCentralDot)
dots[2].addEventListener('click', slideOnRightDot)

function toggleEventListeners() {
    if (window.innerWidth > 391) {
        dots[0].addEventListener('click', slideOnLeftDot)
        dots[1].addEventListener('click', slideOnCentralDot)
        dots[2].addEventListener('click', slideOnRightDot)
        leftImage.addEventListener('click', slideOnLeftDot)
        centralImage.addEventListener('click', slideOnCentralDot)
        rightImage.addEventListener('click', slideOnRightDot)
    } else {
        dots[0].removeEventListener('click', slideOnLeftDot)
        dots[1].removeEventListener('click', slideOnCentralDot)
        dots[2].removeEventListener('click', slideOnRightDot)
        leftImage.removeEventListener('click', slideOnLeftDot)
        centralImage.removeEventListener('click', slideOnCentralDot)
        rightImage.removeEventListener('click', slideOnRightDot)
    }
    setTimeout(toggleEventListeners, 500);
}
window.addEventListener('load', toggleEventListeners)

let prevWidth = window.innerWidth;
let prevHeight = window.innerHeight;
function isMobile() {
    if (window.innerWidth !== prevWidth) {
        let mobileScreenWidth = window.matchMedia("(max-width: 391px)");
        if (mobileScreenWidth.matches) {
            if (currentDesktopSlide === slides[0] || currentDesktopSlide === slides[2]) {
                slideOnCentralDot();
            }
            if (currentMobileDot === dots[0]) {
                slideRight();
            } else if (currentMobileDot === dots[2]) {
                slideLeft();
            }
            closePopUpMenu();
        } else {
            if (currentDesktopDot === dots[0] || currentDesktopDot === dots[2]) {
                slideOnCentralDot();
                dots[0].classList.remove('dots__single-dot--active');
                dots[1].classList.add('dots__single-dot--active');
                dots[2].classList.remove('dots__single-dot--active');
            } 
            if (currentMobileDot === dots[0] || currentMobileDot === dots[2]) {
                dots[0].classList.remove('dots__single-dot--active');
                dots[1].classList.add('dots__single-dot--active');
                dots[2].classList.remove('dots__single-dot--active');
            }
            closeMobilePopUpMenu();
        }
    }
    prevWidth = window.innerWidth;
}

window.addEventListener('resize', isMobile)

console.log('1. Слайдер изображений в секции destinations +50\n2. Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50\n3. Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). +25\nОценка: 125 баллов') //вывести в консоль самооценку своей работы

