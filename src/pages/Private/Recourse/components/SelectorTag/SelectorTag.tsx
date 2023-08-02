import Choices from 'choices.js';
import React, { useEffect, useRef } from 'react';
import 'choices.js/src/styles/choices.scss';
import { getTags } from '@/services/tag.services';
const SelectorTag: React.FC = () => {
  const selectRef = useRef(undefined);

  useEffect(() => {
    const choices = new Choices(selectRef.current, {
      allowHTML: false,
      placeholder: true,
      placeholderValue: 'Pick an Strokes record',
      maxItemCount: -1
    }).setChoices(async function () {
      const response = await getTags(`searchNombre=`);
      return response.data.map((tag: Tag) => ({ value: tag.id, label: tag.name }));
    });
  }, []);

  return <select multiple ref={selectRef} />;
};

export default SelectorTag;
