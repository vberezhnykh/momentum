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

function loadTasks() {
    const storage = window.localStorage;
    if(!Object.keys(storage).includes('tasks')) {
        return false;
    };
    let tasks = Array.from(JSON.parse(localStorage.getItem('tasks')));
    tasks.forEach(task => {
        const completedValue = task.completed;
        const textValue = task.name;

        const inbox = document.querySelector('.inbox');
        const inboxHeader = document.createElement('h2');
        const inboxHeaders = document.querySelectorAll('.inbox__header'); 

        if (completedValue === false) {
            createItem();
            const text = document.querySelector/* All */('.inbox__task-text--unset');
            text.textContent = textValue;
            text.classList.remove('inbox__task-text--unset');
            text.classList.add('inbox__task-text');
            const button = document.querySelector('.inbox__checkbox--unset');
            button.classList.remove('inbox__checkbox--unset');
            button.classList.add('inbox__checkbox');
    
            if (inboxHeaders.length < 1) {
                inbox.prepend(inboxHeader);
                inboxHeader.textContent = 'Inbox';
                inboxHeader.classList.add('inbox__header');
            }
        } else if (completedValue === true) {
            createItem();
            const text = document.querySelector('.inbox__task-text--unset');
            
            text.textContent = textValue;
            text.classList.remove('inbox__task-text--unset');
            text.classList.add('inbox__task-text--done');
            
            const button = document.querySelector('.inbox__checkbox--unset')
            const wrapper = button.parentElement;
            const completedList = document.querySelector('.completed__list');
            const listItem = wrapper.parentElement;
                        
            button.classList.add('inbox__checkbox--done');
            button.classList.remove('inbox__checkbox--unset');
            wrapper.classList.add('inbox__wrapper--done');
            wrapper.classList.remove('inbox__wrapper--basic');
            completedList.prepend(listItem);

            const completedHeader = document.querySelector('.completed__header');
            const completed = document.querySelector('.completed');
            if (!completed.contains(completedHeader)) {
                const header = document.createElement('h2');
                header.classList.add('completed__header');
                header.textContent = 'Completed';
                completed.prepend(header);
            }
        }
    })
}
window.onload = loadTasks;

function createItem() {
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
    checkBox.classList.add('inbox__checkbox--unset');
    inboxWrapper.append(checkBox);
    checkBox.addEventListener('click', completeTask);
    text.classList.add('inbox__task-text--unset');
    
    text.textContent = taskText.value;
    inboxWrapper.append(text);

    deleteButton.classList.add('inbox__delete-button');
    inboxWrapper.append(deleteButton);
    deleteButton.addEventListener('click', deleteTask);
}

function addTask() {
    const inbox = document.querySelector('.inbox');
    const inboxHeader = document.createElement('h2');
    const inboxHeaders = document.querySelectorAll('.inbox__header');
    const taskText = document.querySelector('.todo-input__text');

    if (taskText.value === '') {
        alert('Please add some task');
        return;
    }
    
    let isCreated = false;
    const storage = window.localStorage;
    if(Object.keys(storage).includes('tasks')) {
        
        let tasks = (Array.from(JSON.parse(localStorage.getItem('tasks'))));
        tasks.forEach(task => {
            if (task.name === taskText.value && task.completed === false) {
                alert('Task already exist');
                taskText.value === '';
                isCreated = true;
        };
        })     
    } 
    if (isCreated) {
        return
    } else {
        createItem();
        const text = document.querySelector('.inbox__task-text--unset');
        text.classList.add('inbox__task-text');
        text.classList.remove('inbox__task-text--unset');
        const checkBox = document.querySelector('.inbox__checkbox--unset');
        checkBox.classList.remove('inbox__checkbox--unset');
        checkBox.classList.add('inbox__checkbox');
        
        localStorage.setItem('tasks', JSON.stringify([...JSON.parse(localStorage.getItem('tasks') || '[]'), { name: taskText.value, completed: false }]));
    
        if (inboxHeaders.length < 1) {
            inbox.prepend(inboxHeader);
            inboxHeader.textContent = 'Inbox';
            inboxHeader.classList.add('inbox__header');
        }
        taskText.value = '';
        isCreated = false;
    }
}

function deleteTask(elem) {
    const button = elem.target;
    const wrapper = button.parentElement;
    const text = wrapper.childNodes[1];
    let tasks = Array.from(JSON.parse(localStorage.getItem('tasks')));
    tasks.forEach(task => {
        if (task.name === text.textContent) {
            tasks.splice(tasks.indexOf(task), 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
    const listItem = wrapper.parentElement;
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
    const deleteBtn = wrapper.childNodes[2];
    
    const text = wrapper.childNodes[1];
    let tasks = Array.from(JSON.parse(localStorage.getItem('tasks')));
    tasks.forEach(task => {
        if (task.name === text.textContent && task.completed === false) {
            task.completed = true;
        } else if (task.name === text.textContent && task.completed === true) {
            task.completed = false;
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));

    if (!completed.contains(completedHeader)) {
        const header = document.createElement('h2');
        header.classList.add('completed__header');
        header.textContent = 'Completed';
        completed.prepend(header);
    }

    if (!button.classList.contains('inbox__checkbox--done')) {
        button.classList.add('inbox__checkbox--done');
        button.classList.remove('inbox__checkbox');
        wrapper.classList.add('inbox__wrapper--done');
        wrapper.classList.remove('inbox__wrapper--basic');
        deleteBtn.classList.remove('inbox__delete-button');
        deleteBtn.classList.add('inbox__delete-button--done');
        text.classList.add('inbox__task-text--done');
        text.classList.remove('inbox__task-text');
        completedList.prepend(listItem);
    } else {
        button.classList.remove('inbox__checkbox--done');
        button.classList.add('inbox__checkbox');
        wrapper.classList.remove('inbox__wrapper--done');
        wrapper.classList.add('inbox__wrapper--basic');
        deleteBtn.classList.remove('inbox__delete-button--done');
        deleteBtn.classList.add('inbox__delete-button');
        text.classList.add('inbox__task-text');
        text.classList.remove('inbox__task-text--done');
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

