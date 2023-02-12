import { Notify } from 'notiflix';

const refs = {
  formRef: document.querySelector('.todo__form'),
  inputRef: document.querySelector('.todo__field'),
  todoListRef: document.querySelector('.todo__list'),
};
const STORAGE_KEY = 'tasks';
let todosCollection = [];

refs.formRef.addEventListener('submit', addTask);
refreshPage();

function addTask(event) {
  event.preventDefault();

  if (!refs.inputRef.value) {
    Notify.failure('You cannot add empty field!');
    return;
  }

  Notify.success(`Task "${refs.inputRef.value}" has been added`);

  const newTask = {
    id: Date.now(),
    text: refs.inputRef.value,
    done: 'todo__item',
  };

  todosCollection.push(newTask);
  saveToLocalStorage();
  renderTask(newTask);
  event.currentTarget.reset();
}

function refreshPage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    return;
  }
  todosCollection = JSON.parse(localStorage.getItem(STORAGE_KEY));
  todosCollection.forEach(todo => renderTask(todo));
}

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todosCollection));
}

function renderTask(task) {
  const todo = `<li id="${task.id}" class="${task.done}">
              <input value="${task.text}" class="todo__input" readonly></input>
              <div class="todo__btn-list">
                <button
                  type="button"
                  data-action="edit"
                  class="todo__btn-item todo__edit"
                >
                  Edit
                </button>
                <button
                  type="button"
                  data-action="done"
                  class="todo__btn-item todo__done"
                >
                  Done
                </button>
                <button
                  type="button"
                  data-action="delete"
                  class="todo__btn-item todo__delete"
                >
                  Delete
                </button>
              </div>
            </li>
      `;
  refs.todoListRef.insertAdjacentHTML('beforeend', todo);

  const btnListRef = document.querySelectorAll('.todo__btn-item');
  btnListRef.forEach(button => button.addEventListener('click', onClickAction));
}

function onClickAction(event) {
  const { target } = event;
  const action = target.dataset.action;
  const itemTag = target.closest('li');
  const itemID = +itemTag.id;
  const inputTag = itemTag.children[0];
  const itemInd = todosCollection.findIndex(elem => elem.id === itemID);
  const itemObj = todosCollection[itemInd];

  switch (action) {
    case 'edit':
      if (target.textContent.toLowerCase().trim() === action) {
        inputTag.removeAttribute('readonly');
        inputTag.focus();
        inputTag.selectionStart = inputTag.value.length;
        target.textContent = 'save';
        target.addEventListener('click', changeName);

        const prev_value = itemObj.text;

        function changeName() {
          inputTag.setAttribute('readonly', 'readonly');
          target.textContent = 'edit';
          itemObj.text = inputTag.value;
          todosCollection.splice(itemInd, 1, itemObj);
          Notify.info(
            `Task "${prev_value}" has been changed to "${inputTag.value}"`
          );
          saveToLocalStorage();
        }
      }
      break;

    case 'done':
      const className = 'todo__item-done';
      itemTag.classList.toggle(className);

      if (itemObj.done === 'todo__item') {
        itemObj.done = `todo__item ${className}`;
        Notify.success(`Well done! You have completed "${inputTag.value}"`);
      } else {
        itemObj.done = 'todo__item';
      }

      todosCollection.splice(itemInd, 1, itemObj);
      saveToLocalStorage();
      break;

    case 'delete':
      todosCollection.splice(itemInd, 1);
      itemTag.remove();
      Notify.success(`Task "${inputTag.value}" has been deleted`);
      saveToLocalStorage();
  }
}
