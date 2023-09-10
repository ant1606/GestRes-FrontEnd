import Button from '#/components/Button';
import Field from '#/components/Field';
import React from 'react';
import { useTag } from '../../context/tag.context';

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancelClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  tagError: Record<string, string>;
  name: string;
  submitIsDisabled: boolean;
}

const FormView: React.FC<Props> = ({
  handleSubmit,
  handleInputChange,
  handleCancelClick,
  tagError,
  name,
  submitIsDisabled
}) => {
  const { tagActive } = useTag();
  return (
    <div className="shadow-md p-4 h-32 rounded-xl flex flex-col gap-2 mb-10">
      <h3 className="text-center text-3xl">Mantenimiento de Etiquetas</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-end gap-10 w-full ">
          <div className="flex flex-col grow relative">
            <Field
              type="text"
              label="Ingrese Etiqueta"
              name="name"
              classBox="grow"
              handleChange={handleInputChange}
              errorInput={tagError?.name}
              value={name}
            />
          </div>
          <Button text="GUARDAR" type="submit" btnType="main" isDisable={submitIsDisabled} />

          {tagActive !== null && (
            <Button
              text="CANCELAR"
              btnType="warning"
              handleClick={handleCancelClick}
              type="button"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default FormView;
