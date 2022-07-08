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

/* console.log('1. Верстка соответствует макету. Ширина экрана 390px +48\n2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется не обрезается и не удаляется +0\n3. На ширине экрана 390px и меньше реализовано адаптивное меню +22\nОценка: 70 баллов') //вывести в консоль самооценку своей работы */