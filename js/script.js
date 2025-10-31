console.log("Script loaded successfully.");

const form = document.querySelector('form');
const todoInput = document.getElementById('text-todo');
const dateInput = document.getElementById('date-todo');
const todoList = document.querySelector('.todolist');
const clearBtn = document.getElementById('clear-todo');
const filterBtn = document.getElementById('filter-todo');

form.addEventListener('submit', handleSubmit);
clearBtn.addEventListener('click', clearTodos);
filterBtn.addEventListener('click', filterTodos);

function normalizeNoTodo() {
    document.querySelectorAll('li').forEach(li => {
        if (li.textContent.trim() === 'No todo available' && li.parentElement !== todoList) {
            li.remove();
        }
    });

    const placeholder = todoList.querySelector('li.empty');
    if (todoList.children.length === 0) {
        if (!placeholder) {
            const li = document.createElement('li');
            li.className = 'empty';
            li.textContent = 'No todo available';
            todoList.appendChild(li);
        }
    } else {
        if (placeholder && todoList.children.length > 1) placeholder.remove();
    }
}

normalizeNoTodo();

function validateForm() {
    const todo = todoInput.value.trim();
    const date = dateInput.value;

    if (todo === "") {
        alert("Please enter a todo item.");
        return false;
    }  
    if (date === "") {
        alert("Please select a date.");
        return false;
    }
    return true;
}   

function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) return;

    addTodo();
    
    todoInput.value = '';
    dateInput.value = '';
}

function addTodo() {
    const todo = todoInput.value.trim();
    const date = dateInput.value;
    
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const noTodo = todoList.querySelector('li.empty');
    if (noTodo) noTodo.remove();

    const li = document.createElement('li');
    li.innerHTML = `
        <span class="todo-text">${todo}</span>
        <span class="todo-date">${formattedDate}</span>
        <button onclick="deleteTodo(this)" class="delete-btn">Delete</button>
    `;
        
    todoList.appendChild(li);
}

function deleteTodo(btn) {
    const li = btn.parentElement;
    li.remove();
    
    if (todoList.children.length === 0) {
        const li = document.createElement('li');
        li.className = 'empty';
        li.textContent = 'No todo available';
        todoList.appendChild(li);
    }
}

function clearTodos() {
    todoList.innerHTML = '';
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = 'No todo available';
    todoList.appendChild(li);
}

function filterTodos() {
    const todos = Array.from(todoList.children);
    const filteredTodos = todos.filter(
        (li) => !li.classList.contains('empty')
    );
    filteredTodos.sort((a, b) => {
        const dateA = new Date(a.querySelector('.todo-date')?.textContent || 0);
        const dateB = new Date(b.querySelector('.todo-date')?.textContent || 0);
        return dateA - dateB;
    });
    
    todoList.innerHTML = '';
    if (filteredTodos.length === 0) {
        const li = document.createElement('li');
        li.className = 'empty';
        li.textContent = 'No todo available';
        todoList.appendChild(li);
    } else {
        filteredTodos.forEach(todo => todoList.appendChild(todo));
    }
}


