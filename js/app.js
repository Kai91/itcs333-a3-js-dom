// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const errorMsg = document.getElementById('error-msg');
    const todoList = document.getElementById('todo-list');
    const counterEl = document.getElementById('counter');
    
    let currentFilter = 'all';

    const updateCounter = () => {
        const activeTasks = todoList.querySelectorAll('li:not(.completed)');
        counterEl.textContent = `${activeTasks.length} items left`;
    };

    const applyFilter = (filter) => {
        currentFilter = filter;
        const tasks = todoList.getElementsByTagName('li');

        for (let li of tasks) {
            const isCompleted = li.classList.contains('completed');

            if (filter === 'all') {
                li.style.display = 'flex';
            } else if (filter === 'active') {
                li.style.display = isCompleted ? 'none' : 'flex';
            } else if (filter === 'done') {
                li.style.display = isCompleted ? 'flex' : 'none';
            }
        }
    };

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        
        if (text === '') {
            errorMsg.classList.remove('hidden');
            return;
        } else {
            errorMsg.classList.add('hidden');
        }

        const li = document.createElement('li');

        const span = document.createElement('span');
        span.classList.add('item-text');
        span.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        
        li.appendChild(span);
        li.appendChild(deleteBtn);
        
        todoList.appendChild(li);
        
        todoInput.value = '';
        updateCounter();
        applyFilter(currentFilter);
    });

    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('item-text')) {
            e.target.parentElement.classList.toggle('completed');            
            updateCounter();
            applyFilter(currentFilter);
        }
        if (e.target.classList.contains('delete-btn')) {
            e.target.parentElement.remove();
            updateCounter();
            applyFilter(currentFilter);
        }
    });

    const filterContainer = document.querySelector('.filters');

    filterContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            if (e.target.id === 'filter-all') {
                applyFilter('all');
            } else if (e.target.id === 'filter-active') {
                applyFilter('active');
            } else if (e.target.id === 'filter-done') {
                applyFilter('done');
            }
        }
    });
});