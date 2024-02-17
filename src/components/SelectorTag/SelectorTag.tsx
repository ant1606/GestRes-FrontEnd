import Choices from 'choices.js';
import React, { useEffect, useRef } from 'react';
import 'choices.js/src/styles/choices.scss';

interface Props {
  setSelectValues: React.Dispatch<React.SetStateAction<number[]>>;
  selectedTags: string[] | number[];
  choicesData: Array<{ value: string | number; label: string }>;
}

const SelectorTag: React.FC<Props> = ({ setSelectValues, selectedTags, choicesData }) => {
  const selectRef = useRef<HTMLSelectElement>(undefined);
  const selectedTagsRef = useRef(selectedTags);

  useEffect(() => {
    selectedTagsRef.current = selectedTags;
  }, [selectedTags]);

  useEffect(() => {
    const handleChange = (event: CustomEvent): void => {
      console.log('Desde hanldeChange', event);
      setSelectValues((prevState) => {
        const existValue = prevState.find(
          (val) => val.toString() === event.detail.value.toString()
        );
        if (existValue === undefined || existValue === null)
          return [...prevState, event.detail.value];
        else {
          return prevState.filter((val) => val.toString() !== event.detail.value.toString());
        }
      });
    };

    selectRef.current.addEventListener('change', handleChange);

    return () => {
      // selectRef.current.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    let choicesDataTmp = choicesData;
    // Seleccionando las valores ya existentes de la entidad
    if (selectRef.current !== null) {
      choicesDataTmp = choicesData.map((opt) => {
        return {
          ...opt,
          selected: selectedTagsRef.current.some((val) => val.toString() === opt.value.toString())
        };
      });
    }

    console.log('Viendo el choiceData', choicesDataTmp);
    const choices = new Choices(selectRef.current, {
      allowHTML: false,
      placeholder: true,
      placeholderValue: 'Selecciona las etiquetas',
      removeItemButton: true,
      removeItems: true,
      maxItemCount: -1,
      choices: choicesDataTmp
    });

    return () => {
      choices.destroy();
    };
  }, [choicesData, selectRef]);

  return <select multiple ref={selectRef} />;
};

export default SelectorTag;
