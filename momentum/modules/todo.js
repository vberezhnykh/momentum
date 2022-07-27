function openTodoList() {
    const todoList = document.querySelector('.todo');
    const openBtn = document.querySelector('.todo__open-btn');
    todoList.classList.add('todo--visible'); 
    openBtn.classList.add('todo__open-btn--hidden');
}

function closeToDoList() {
    const todoList = document.querySelector('.todo');
    const openBtn = document.querySelector('.todo__open-btn');
    todoList.classList.remove('todo--visible');
    openBtn.classList.remove('todo__open-btn--hidden');
}

function addTask() {
    const inbox = document.querySelector('.inbox');
    const inboxHeader = document.createElement('h2');
    const inboxHeaders = document.querySelectorAll('.inbox__header');
    const inboxList = document.querySelector('.inbox__list');
    const li = document.createElement('li');
    const inboxWrapper = document.createElement('div');
    const checkBox = document.createElement('button');
    const text = document.createElement('span');
    const taskText = document.querySelector('.todo-input__text');
    const deleteButton = document.createElement('button');  
    
    li.classList.add('inbox__item');
    inboxList.append(li);
    inboxWrapper.classList.add('inbox__wrapper', 'inbox__wrapper--basic');
    li.append(inboxWrapper);
    checkBox.classList.add('inbox__checkbox');
    inboxWrapper.append(checkBox);
    checkBox.addEventListener('click', completeTask);
    text.classList.add('inbox__task-text');
    text.textContent = taskText.value;
    inboxWrapper.append(text);
    deleteButton.classList.add('inbox__delete-button');
    inboxWrapper.append(deleteButton);
    deleteButton.addEventListener('click', deleteTask);

    if (inboxHeaders.length < 1) {
        inbox.prepend(inboxHeader);
        inboxHeader.textContent = 'Inbox';
        inboxHeader.classList.add('inbox__header');
    }
}

function deleteTask(elem) {
    const button = elem.target;
    const listItem = button.parentElement.parentElement;
    listItem.remove();

    const deleteButtons = document.querySelectorAll('.inbox__delete-button');
    const inboxHeader = document.querySelector('.inbox__header');
    const inbox = document.querySelector('.inbox');
    (deleteButtons.length < 1 && inbox.contains(inboxHeader)) ? inboxHeader.remove() : false;
    
    const checkBoxes = document.querySelectorAll('.inbox__checkbox--done');
    const completedHeader = document.querySelector('.completed__header');
    checkBoxes.length < 1 ? completedHeader.remove() : false;
}

function completeTask(elem) {
    const completed = document.querySelector('.completed');
    const button = elem.target;
    const wrapper = button.parentElement;
    const listItem = wrapper.parentElement;
    const completedList = document.querySelector('.completed__list');
    const inboxList = document.querySelector('.inbox__list');
    const completedHeader = document.querySelector('.completed__header');
    
    if (!completed.contains(completedHeader)) {
        const header = document.createElement('h2');
        header.classList.add('completed__header');
        header.textContent = 'Completed';
        completed.prepend(header);
    }

    if (!button.classList.contains('inbox__checkbox--done')) {
        button.classList.add('inbox__checkbox--done');
        wrapper.classList.add('inbox__wrapper--done');
        wrapper.classList.remove('inbox__wrapper--basic');
        completedList.prepend(listItem);
    } else {
        button.classList.remove('inbox__checkbox--done');
        wrapper.classList.remove('inbox__wrapper--done');
        wrapper.classList.add('inbox__wrapper--basic');
        inboxList.append(listItem);
    }

    const checkBoxes = document.querySelectorAll('.inbox__checkbox--done');
    checkBoxes.length < 1 ? completedHeader.remove() : false;
        
    const inboxItems = document.querySelectorAll('.inbox__wrapper--basic');
    const inboxHeader = document.querySelector('.inbox__header');
    inboxItems.length < 1 ? inboxHeader.remove() : false;

    const inbox = document.querySelector('.inbox');
    if (inboxItems.length > 0 && !inbox.contains(inboxHeader)) {
        const inboxHeader = document.createElement('h2');
        inboxHeader.textContent = 'Inbox';
        inboxHeader.classList.add('inbox__header');
        inbox.prepend(inboxHeader);
    }
}

export {openTodoList, addTask, closeToDoList};

