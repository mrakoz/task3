import React from "react";
import { FormWithInvalidInputPrevention } from "./FormWithInvalidInputPrevention";
import { FormValidationOnSubmit } from "./FormValidationOnSubmit";
import { FormValidationOnBlur } from "./FormValidationOnBlur";
import { ClientsList } from "./TaskList/ClientsList";
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => (
  <>
    <h3>Форма добавления нового клиента</h3>
    <ClientsList />
  </>
);
