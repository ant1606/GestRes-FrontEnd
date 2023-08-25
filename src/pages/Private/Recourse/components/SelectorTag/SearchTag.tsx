import { getTags } from '#/services/tag.services';
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

interface Props {
  handleChange: React.Dispatch<React.SetStateAction<number[]>>;
  value: [];
}
const SearchTag: React.FC<Props> = ({ handleChange, value }) => {
  // const [selected, setSelected] = useState([]);
  const [listTags, setListTags] = useState<Tag[]>([]);

  useEffect(() => {
    const populateListTags = async (): Promise<void> => {
      const response = await getTags(`searchNombre=`);
      // console.log(response);
      setListTags(response.data.map((tag: Tag) => ({ value: tag.id, label: tag.name })));
    };

    populateListTags();
  }, []);

  const onSelectChange = (e) => {
    handleChange(e);
  };

  const placeholder = useMemo(() => {
    if (value.length > 0) {
      if (value.length === 1) {
        return value[0].label;
      } else {
        return `${value.length} Tags`;
        // return Object.values(value)
        //   .map((s) => s.label)
        //   .join(", ");
      }
    } else {
      return 'Tags';
    }
  }, [value]);

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
          ...(value.length > 0 && { color: 'black' })
        })
      }}
      // overrides values in control input
      controlShouldRenderValue={false}
      placeholder={placeholder}
    />
  );
};

export default SearchTag;
