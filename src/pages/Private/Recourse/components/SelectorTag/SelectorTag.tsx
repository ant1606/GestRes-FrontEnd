import Choices from 'choices.js';
import React, { useEffect, useRef, useState } from 'react';
import 'choices.js/src/styles/choices.scss';
import { getTags } from '@/services/tag.services';
// TODO Ver si es combeniente cambiar el componente choices por react-select
interface Props {
  setSelectValues: React.Dispatch<React.SetStateAction<number[]>>;
  selectedTags: number[];
}

const SelectorTag: React.FC<Props> = ({ setSelectValues, selectedTags }) => {
  const selectRef = useRef<HTMLSelectElement>(undefined);
  const selectedTagsRef = useRef(selectedTags);
  // const [selectedValues, setSelectedValues] = useState<number[]>([]);

  useEffect(() => {
    selectedTagsRef.current = selectedTags;
  }, [selectedTags]);

  useEffect(() => {
    const choices = new Choices(selectRef.current, {
      allowHTML: false,
      placeholder: true,
      placeholderValue: 'Selecciona las etiquetas',
      removeItemButton: true,
      removeItems: true,
      maxItemCount: -1
    })
      .setChoices(async function () {
        const response = await getTags(`searchNombre=`);
        return response.data.map((tag: Tag) => ({ value: tag.id, label: tag.name }));
      })
      .then((instance) => {
        if (selectRef.current !== null) {
          instance.setChoiceByValue(selectedTagsRef.current);
        }
      });

    const handleChange = (event: CustomEvent): void => {
      setSelectValues((prevState) => {
        const existValue = prevState.find((val) => val === event.detail.value);
        if (existValue === undefined || existValue === null)
          return [...prevState, event.detail.value];

        return prevState.filter((val) => val !== event.detail.value);
      });
    };

    // choices.passedElement.addEventListener('change', handleChange);
    selectRef.current.addEventListener('change', handleChange);

    return () => {
      // selectRef.current.removeEventListener('change', handleChange);
      // choices.destroy();
    };
  }, []);

  return <select multiple ref={selectRef} />;
};

export default SelectorTag;
