# First own project. 
This is a simple project, even one of the most common among beginners =)
## Description:
* ES6+ standards were used
* Working in OOP style 
* Pure JavaSctipt, no add-ons used
* Splitting files, designing for reuse and simply changing functions as needed 

## Code:
* Main .js
```js
  import Forms from './modules/forms.js';

  window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    new Forms('form', '.todo-box__container').init();
  });
```
* modules .js
```js 
  export default class Forms {
    constructor(selectors = 'form', container = null) {
      this.forms = document.querySelectorAll(selectors);
      this.inputs = document.querySelectorAll('input');
      this.task = {};
      this.container = document.querySelector(container);
    }

    handlerTasks() {
      this.forms.forEach(form => {
        form.addEventListener('submit', e => {
          e.preventDefault();

          this.inputs.forEach(input => {
            const value = input.value;
            const id = Math.random();

            let item = this.taskConstructor(id, value);
            let allowItem = this.taskTemplate(item, Object.keys(this.task).length);
            this.container.insertAdjacentHTML('beforeend', allowItem);
          });
          
          form.reset();
        });
      });
    }
    taskConstructor(id, value) {
      const newTask = {
        id,
        value
      };

      this.task[newTask.id] = newTask;
      localStorage.setItem(id, value);

      return { ...newTask };
    }
    taskRemove() {
      this.container.addEventListener('click', e => {
        const target = e.target;

        if (target.classList.contains('btn-remove')) {
          const taskID = target.closest('.task-item').dataset.id;
          const el = target.closest('.task-item');

          el.classList.remove('show');
          el.classList.add('hide');
          setTimeout(() => el.remove(), 900);
          delete this.task[taskID];
          localStorage.removeItem(taskID);
          setTimeout(() => this.cheackTasks(), 900);
        }
      });
    }
    taskTemplate({ id = null, value = null }, index, check = false) {
      if (!check) {
        return `
          <div class="task-item" data-id="${id}">
            <div class="task-item__num">${index}</div>
            <p class="task-item__text">${value}</p>
            <div class="task-item__btn">
              <button class="btn btn-remove"></button>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="task-item show" data-id="${id}">
            <div class="task-item__num">${index + 1}</div>
            <p class="task-item__text">${value}</p>
            <div class="task-item__btn">
              <button class="btn btn-remove"></button>
            </div>
          </div>
        `;
      }
    }
    cheackTasks() {
      this.container.innerHTML = '';
      const verifiedList = Object.values(this.task);
      verifiedList.forEach((item, index) => {
        const template = this.taskTemplate(item, index, true);
        this.container.insertAdjacentHTML('beforeend', template);
      });
    }
    chackLocalStorage(){
      const storage = Object.entries(localStorage);
      storage.forEach(element => {
        const newTask = {
          id: element[0],
          value: element[1]
        };
        this.task[newTask.id] = newTask;
      });
      this.cheackTasks();
    }

    init() {
      this.chackLocalStorage();
      this.handlerTasks();
      this.taskRemove();
      
    }
  }


```