document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input');
    const addButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');

    // Load todos from local storage
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todoList.innerHTML = '';
        todos.forEach(todo => addTodoToDOM(todo));
    }

    // Add todo to local storage
    function saveTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Add todo to DOM
    function addTodoToDOM(todo) {
        const li = document.createElement('li');
        li.innerHTML = `
            ${todo.text}
            <button class="edit" onclick="editTodo('${todo.id}')">Edit</button>
            <button class="delete" onclick="deleteTodo('${todo.id}')">Delete</button>
        `;
        todoList.appendChild(li);
    }

    // Add new todo
    addButton.addEventListener('click', () => {
        const text = input.value.trim();
        if (text === '') return;

        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const id = new Date().toISOString();
        const todo = { id, text };
        todos.push(todo);
        saveTodos(todos);
        addTodoToDOM(todo);
        input.value = '';
    });

    // Edit todo
    window.editTodo = function(id) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const todo = todos.find(todo => todo.id === id);
        const newText = prompt('Edit your to-do:', todo.text);
        if (newText !== null && newText.trim() !== '') {
            todo.text = newText.trim();
            saveTodos(todos);
            loadTodos();
        }
    };

    // Delete todo
    window.deleteTodo = function(id) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(todo => todo.id !== id);
        saveTodos(todos);
        loadTodos();
    };

    loadTodos();
});