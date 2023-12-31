//  Seleçao de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.getElementById('search-input');
const todosAll = document.querySelectorAll('#todo-list');
const filterSelect = document.getElementById('filter-select');
var todos = document.querySelectorAll('.todo');


let oldInputValue;

//  Funções
const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");
    todoList.style.display = '';

    const todoTitle = document.createElement("h3");
    todoTitle.innerHTML = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);
    todoInput.value = ""; //    Limpa a lista
    todoInput.focus(); //   Deixa o foco no input

    todos = document.querySelectorAll('.todo');
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        //  Peguei o text e alterei pelo novo
        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    });
};

//  Eventos
//  Add tarefa +
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = todoInput.value;

    if(inputValue) {
        //  Save todo
        saveTodo(inputValue);
    }
});

//  Identificar o clique e identificar o elemento
document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms(); //   Evitar repetição

        editInput.value = todoTitle; // Vem com o valor pré preenchido
        oldInputValue = todoTitle; // Salvando a variavel para fazer alteração depois.
    }
    
    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

});
//  Botao Cancelar dentro do edit
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault(); //  Não enviar formulário

    toggleForms(); //   Evitar repetição
});

//  Botao editar, enviar
editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        //  Atualizar
        updateTodo(editInputValue);
    }
    toggleForms();
});

//  Buscar tarefas
searchInput.addEventListener('input', function (event) {
    const searchString = searchInput.value.toLowerCase();

    todos.forEach(todo => {
        const todoText = todo.querySelector('h3').innerText.toLowerCase();
        if (todoText.includes(searchString)) {
            todo.style.display = '';
        } else {
            todo.style.display = 'none';
        }
    })
});

//  Filtrar tarefas
filterSelect.addEventListener('change', function (event) {
    const selectTask = filterSelect.value;
    // const done = document.querySelectorAll('.done');

    todos.forEach(todo => {
        if (selectTask == 'all') {
            todo.style.display = '';
        } else {
            if (selectTask == 'done' && todo.classList.contains("done")) {
                todo.style.display = '';
            } else if (selectTask == 'todo' && !todo.classList.contains("done")) {
                todo.style.display = '';
            } else {
                todo.style.display = 'none';
            }
        }            
    })
});

//  Verifica se existe tarefa na lista
document.addEventListener("DOMContentLoaded", function() {
    if(todoList.length > 0) {
        todoList.style.display = '';
    } else {
        todoList.style.display = 'none';
    }
})