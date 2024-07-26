const apiUrl = '/api/todos';

document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();
});

function fetchTodos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(todos => renderTodos(todos));
}

function renderTodos(todos) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo.title}: ${todo.description}</span>
            <div class="todo-actions">
                <button onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

function addTodo() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (title && description) {
        const todo = { title, description, completed: false };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
            .then(response => response.json())
            .then(() => {
                fetchTodos();
                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
            });
    }
}

function deleteTodo(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
        .then(() => fetchTodos());
}
