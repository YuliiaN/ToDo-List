const formRef = document.querySelector('.todo__form');
const inputRef = document.querySelector('.todo__field');
const btnSubmitRef = document.querySelector('.todo__btn');
const todoListRef = document.querySelector('.todo__list');

const storage = {};
const STORAGE_KEY = 'current-items';
const itemsCollection = [];
const arr = [];

formRef.addEventListener('submit', onFormSubmit);
// refreshPage();

function onFormSubmit(event) {
  event.preventDefault();

  //create html

  const newItem = `<li class="todo__item">
            <p>${inputRef.value}</p>
            <div todo__btn-list>
              <button type="button" class="todo__btn-item todo__edit">
                Edit
              </button>
              <button type="button" class="todo__btn-item todo__done">
                Done
              </button>
              <button type="button" class="todo__btn-item todo__delete">
                Delete
              </button>
            </div>
          </li>
    `;
  todoListRef.insertAdjacentHTML('beforeend', newItem);
  arr.push(newItem);
  event.currentTarget.reset();

  // local storage

  for (const item of arr) {
    const index = arr.indexOf(item);
    // storage[index] = item;
    //   localStorage[`${index}`] = item;
    localStorage.setItem(`${index}`, item);
  }

  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
}

refreshPage();

function refreshPage() {
  //     const storage = localStorage.getItem(STORAGE_KEY);

  //   if (!storage) {
  //     return;
  //   }

  if (!localStorage.length) {
    return;
  }

  // const arr = [];
  for (let i = 0; i < localStorage.length; i++) {
    arr.push(localStorage.getItem(i));
  }

  console.log(arr.join(''));
  todoListRef.insertAdjacentHTML('beforeend', arr.join(''));

  //   const keysCollection = Object.values(JSON.parse(storage));
  //   for (const item of keysCollection) {
  //     todoListRef.insertAdjacentHTML('beforeend', item);
  //   }
}

function checkStorage() {
  const storage = localStorage.getItem(STORAGE_KEY);
  return storage ? true : false;
}
