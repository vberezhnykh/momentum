function openNav() {
    document.getElementById("sidepanel").style.right = '0px';
    document.getElementById("body-overlay").style.display = 'unset';
}

function closeNav() {
    document.getElementById("sidepanel").style.right = '-165px';
    document.getElementById("body-overlay").style.display = "none";
}

console.log('1. Верстка соответствует макету. Ширина экрана 390px +48\n2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется не обрезается и не удаляется +0\n3. На ширине экрана 390px и меньше реализовано адаптивное меню +22\nОценка: 70 баллов') //вывести в консоль самооценку своей работы