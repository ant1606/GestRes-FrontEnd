import Choices from 'choices.js';
import React, { useEffect, useRef, useState } from 'react';
import 'choices.js/src/styles/choices.scss';
import { getTags } from '@/services/tag.services';
const SelectorTag: React.FC = () => {
  const selectRef = useRef(undefined);
  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  useEffect(() => {
    const choices = new Choices(selectRef.current, {
      allowHTML: false,
      placeholder: true,
      placeholderValue: 'Pick an Strokes record',
      removeItemButton: true,
      maxItemCount: -1
    }).setChoices(async function () {
      const response = await getTags(`searchNombre=`);
      return response.data.map((tag: Tag) => ({ value: tag.id, label: tag.name }));
    });

    const handleChange = (event): void => {
      setSelectedValues((prevState) => [...prevState, event.detail.value]);
    };

    selectRef.current.addEventListener('change', handleChange);
    return () => {
      // selectRef.current.removeEventListener('change', handleChange);
      choices.destroy();
    };
  }, []);

  return <select multiple ref={selectRef} />;
};

export default SelectorTag;
