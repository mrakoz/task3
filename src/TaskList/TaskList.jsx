import React from "react";
import { AddForm } from "./AddForm";
import { EditForm } from "./EditForm";
import { Filter, filterTasks } from "./filterTasks";
import { FilterSelect } from "./FilterSelect";

// Вспомогательные функции для обновления списка задач.
// Мы не может изменять тот массив который в state, нужно сначала скопировать его и только потом менять.

// Добавление задачи - копирование массива задач и добавление новой задачи вконец копии
function addTask(
  tasks, // массив задач
  taskToAdd // задача, которую нужно добавить
) {
  return [...tasks, taskToAdd];
}

// Изменение одной задачи
function updateTask(
  tasks, // массив задач
  id, // id задачи, которую нужно поменять
  fieldToUpdate // объект, в котором находятся те поля задачи, которые нужно обновить, например {text: '123'}
  // работает аналогично setState, в который можно передать только те поля state, которые нужно изменить, а не все
) {
  // Алгоритм обновления такой
  // 1. Копируем весь массив до той задачи, которую нужно изменеить
  // 2. Задачу которую нужно изменить копируем, у копии меняем нужные поля
  // 3. Копию задачи дописываем в копию массива
  // 4. Копируем в массив-копию остаток оригинального массива - все задачи после той, которую нужно обновить

  const taskIndex = tasks.findIndex(task => task.id === id); // находим индекс задачи, которую надо обновить по ее id
  const taskToUpdate = tasks[taskIndex];
  const taskCopy = { ...taskToUpdate, ...fieldToUpdate }; // копируем задачу которую надо обновить и меняем у нее поля
  console.log('field: ', fieldToUpdate)

  return [
    ...tasks.slice(0, taskIndex), // копируем массив до обновляемой задачи
    taskCopy, // вставляем копию обновленной задачи
    ...tasks.slice(taskIndex + 1) // копируем остаток массива
  ];
}

export class TaskList extends React.Component {
  state = {
    // все задачи
    tasks: [
      {
        id: 1,
        name: "First test name",
        phone: "+34567895425",
        isDone: false
      },
      {
        id: 2,
        name: "Second test name",
        phone: "+123123123",
        isDone: false
      },
      {
        id: 3,
        name: "Third test name",
        phone: "+4564564564",
        isDone: false
      }
    ],

    // id задачи, которую сейчас редактируем
    // если taskToEdit равен null, то видим список задач и форму добавления
    // если taskToEdit равен какому-то числу, видим форму редактирования задачи с таким id
    taskToEdit: null,

    // текущее значение фильтра задач
    filter: Filter.ALL
  };

  // id, который будет у следующей добавленной задачи
  // Не в state, т.к. от этого значения не зависит внешний вид компонента и при его изменении не нужна перерисовака
  nextId = 4;

  render() {
    if (this.state.taskToEdit) {
      // Если в taskToEdit какое-то число, показываем только форму редактирования задачи
      return (
        <EditForm
          taskText={
            // находим редактируемую задачу и передаем ее текст в форму редактирования
            this.state.tasks.find(task => task.id === this.state.taskToEdit)
              .name
          }

          userPhone={this.state.tasks.find(task => task.id === this.state.taskToEdit)
            .phone
          }

          onSave={(name, phone) => {
            // когда пользователь жмет Save на форме, форма передает текст, находим радектируемую задачу и обновляем ее текст
            const copy = updateTask(this.state.tasks, this.state.taskToEdit, {
              name, phone
            });
            console.log(copy);

            this.setState({
              tasks: copy, // заменяем задачи обновленной копией
              taskToEdit: null // обнуляем редактируемую задачу, чтобы спрятать форму редактирования и показать список задач
            });
          }}
          onCancel={() =>
            // Когда пользователь жмет Cancel выходим из режима редактирования без изменения задач
            this.setState({
              taskToEdit: null
            })
          }
        />
      );
    }

    return (
      <>
        <AddForm
          onSave={(name, phone) => {
            // Создаем новую задачу с текстом с формы
            const task = {
              id: this.nextId,
              isDone: false,
              name,
              phone
            };

            // Добавляем новую задачу в массив задач
            this.setState({
              tasks: addTask(this.state.tasks, task)
            });

            this.nextId++;
          }}
        />
        {/* <FilterSelect
          value={this.state.filter}
          onChange={filter => {
            this.setState({ filter });
          }}
        /> */}
        <h3>Список клиентов</h3>
        <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              {/* <th>Done?</th> */}
              <th>Имя</th>
              <th>Телефон</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* 
              Фильтруем все задачи при каждой перерисовке вместо того, чтобы держать в state массив отфильтрованных задач.
              Это позволяет
              - упростить форму state и уменьшает сложность кода
              - упрощает добавление новых функций вроде сортировки и постраничного отображения
                их тоже можно будет описать функцияюми вроде sortTasks, paginateTasks, которые можно композировать примерно таким образом
                paginateTasks(
                  sortTask(
                    filterTasks(this.state.tasks, this.state.filter),
                    this.state.sortOrder
                  ),
                  this.state.pageNumber,
                  this.state.itemsPerPage
                )
            */}
            {filterTasks(this.state.tasks, this.state.filter).map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                {/* <td>
                  <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={evt =>
                      this.setState({
                        // меняем у задачи признак готовиности по нажатию на чекбокс
                        tasks: updateTask(this.state.tasks, task.id, {
                          isDone: evt.target.checked
                        })
                      })
                    }
                  />
                </td> */}
                <td>{task.name}</td>
                <td>{task.phone}</td>
                <td>
                  <button
                    onClick={() =>
                      // Выставляем id задачи, которую нужно отредактировать.
                      // Это приводит к показу формы редакитирования вместо списка.
                      this.setState({
                        taskToEdit: task.id
                      })
                    }
                  >
                    Правка
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </>
    );
  }
}
