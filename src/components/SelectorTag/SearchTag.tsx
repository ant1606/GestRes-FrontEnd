import { useFetch } from '#/hooks/useFetch';
import { type TagsSelectorSuccessResponse } from '#/pages/Private/Tag/index.types';
import { getTagsForTagSelector } from '#/services/tag.services';
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
  value: number[] | never[];
}
const SearchTag: React.FC<Props> = ({ handleChange, value }) => {
  // const [selected, setSelected] = useState([]);
  const { fetchWithSessionHandling } = useFetch();
  const [listTags, setListTags] = useState<Array<{ value: number; label: string }>>([]);

  useEffect(() => {
    const populateListTags = async (): Promise<void> => {
      const response = (await getTagsForTagSelector(
        fetchWithSessionHandling
      )) as TagsSelectorSuccessResponse;
      setListTags(response.data.map((tag: Tag) => ({ value: tag.id, label: tag.name })));
    };

    populateListTags();
  }, []);

  const onSelectChange = (e: Array<{ value: number; label: string }>): void => {
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
