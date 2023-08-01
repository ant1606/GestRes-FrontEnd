import Choices from 'choices.js';
import React, { useEffect, useRef } from 'react';
import 'choices.js/src/styles/choices.scss';
const SelectorTag: React.FC = () => {
  const selectRef = useRef(undefined);

  useEffect(() => {
    const choices = new Choices(selectRef.current, {
      allowHTML: true,
      removeItemButton: true
    });
  }, []);

  return (
    <select multiple ref={selectRef}>
      <option placeholder="true">Multiple Options</option>
      <option defaultValue="2">Paris</option>
      <option defaultValue="3">Bucharest</option>
      <option defaultValue="4">Rome</option>
      <option defaultValue="5">New York</option>
      <option defaultValue="6">Miami</option>
      <option defaultValue="7">Los Santos</option>
      <option defaultValue="8">Sydney</option>
      <option defaultValue="9">Piatra Neamt</option>
    </select>
  );
};

export default SelectorTag;
