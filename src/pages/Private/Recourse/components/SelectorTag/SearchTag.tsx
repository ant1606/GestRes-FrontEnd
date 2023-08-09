import { getTags } from '@/services/tag.services';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Select, { components } from 'react-select';

const Option = (props) => (
  <div>
    <components.Option {...props}>
      <input type="checkbox" checked={props.isSelected} onChange={() => null} />{' '}
      <label>{props.label}</label>
    </components.Option>
  </div>
);

const MultiValue = (props) => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);

const SearchTag: React.FC = () => {
  const [selected, setSelected] = useState([]);
  const [listTags, setListTags] = useState<Tag[]>([]);

  useEffect(() => {
    const populateListTags = async (): Promise<void> => {
      const response = await getTags(`searchNombre=`);
      console.log(response);
      setListTags(response.data.map((tag: Tag) => ({ value: tag.id, label: tag.name })));
    };

    populateListTags();
  }, []);

  const onSelectChange = useCallback((e) => {
    setSelected(e);
  }, []);

  const placeholder = useMemo(() => {
    console.log(selected);
    if (selected.length > 0) {
      if (selected.length === 1) {
        return selected[0].label;
      } else {
        return 'Multiple options selected';
        // return Object.values(selected)
        //   .map((s) => s.label)
        //   .join(", ");
      }
    } else {
      return 'No options selected';
    }
  }, [selected]);

  return (
    <Select
      closeMenuOnSelect={false}
      isMulti
      components={{ Option, MultiValue }}
      options={listTags}
      hideSelectedOptions={false}
      backspaceRemovesValue={false}
      onChange={(e) => {
        onSelectChange(e);
      }}
      // conditional styles for placeholder
      styles={{
        placeholder: (defaultStyles) => ({
          ...defaultStyles,
          ...(selected.length > 0 && { color: 'black' })
        })
      }}
      // overrides values in control input
      controlShouldRenderValue={false}
      placeholder={placeholder}
    />
  );
};

export default SearchTag;
