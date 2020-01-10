import React from "react";
import { Filter } from "./filterTasks";

export const FilterSelect = ({ value, onChange }) => (
  <select value={value} onChange={e => onChange(e.target.value)}>
    <option value={Filter.ALL}>All</option>
    <option value={Filter.DONE}>Done</option>
    <option value={Filter.UNDONE}>Undone</option>
  </select>
);
