import React from "react";
import { FormWithInvalidInputPrevention } from "./FormWithInvalidInputPrevention";
import { FormValidationOnSubmit } from "./FormValidationOnSubmit";
import { FormValidationOnBlur } from "./FormValidationOnBlur";
import { TaskList } from "./TaskList/TaskList";
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => (
  <>
    {/* <h3>Форма с отменой невалидного ввода</h3>
    <FormWithInvalidInputPrevention /> */}
    {/* <h3>Форма с валидацией на отправку</h3>
    <FormValidationOnSubmit /> */}
    {/* <h3>Форма с валидацией на потерю фокуса</h3>
    <FormValidationOnBlur /> */}
    <h3>Форма добавления нового клиента</h3>
    <TaskList />
  </>
);
