export default class Forms {
  constructor(selectors = 'form', container = null) {
    this.forms = document.querySelectorAll(selectors);
    this.inputs = document.querySelectorAll('input');
    this.task = {one: {id: 0.32432, value: 'yes'}};
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
    
    return { ...newTask };
  }
  taskRemove() {
    this.container.addEventListener('click', e => {
      const target = e.target;

      if (target.classList.contains('btn-remove')) {
        const taskID = target.closest('.task-item').dataset.id;
        const el = target.closest('.task-item');

        el.classList.add('hide');
        setTimeout(() => el.remove(), 900);
        delete this.task[taskID];

        // this.cheackTasks();
      }
      
    });
  }
  taskTemplate({ id, value }, index, check = false) {
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
          <div class="task-item__num">${index}</div>
          <p class="task-item__text">${value}</p>
          <div class="task-item__btn">
            <button class="btn btn-remove"></button>
          </div>
        </div>
      `;
    }
  }
  cheackTasks() {
    // this.container.innerHTML = '';
    // this.task.forEach((task, index) => {
    //   let item = this.taskTemplate(task, index, true);
    //   this.container.insertAdjacentHTML('beforeend', item);
    // });
  }
  localStor(){

  }

  init() {
    this.handlerTasks();
    this.taskRemove();
  }
}

