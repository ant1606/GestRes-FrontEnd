/* eslint-disable prettier/prettier */
import Button from '#/components/Button';
import Combobox from '#/components/Combobox';
import Field from '#/components/Field';
import { GLOBAL_TYPES_RECOURSE } from '#/config/globalConstantes';
import { useAppSelector } from '#/hooks/redux';
import { type RootState } from '#/redux/store';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SelectorTag from '../SelectorTag/SelectorTag';

interface SelectType {
  id: number;
  value: string;
}

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeType: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  typeId: number;
  editorial: string;
  totalPages: number;
  totalVideos: number;
  totalChapters: number;
  author: string;
  totalHours: string;
  source: string;
  recourseError: Record<string, string | null>;
  dataSelectType: SelectType[];
  isShow: boolean;
  selectedTags: number[];
  setSelectedTags: React.Dispatch<React.SetStateAction<number[]>>;
  recourseSelected: Recourse;
}

const FormView: React.FC<Props> = ({
  handleSubmit,
  handleInputChange,
  handleChangeType,
  name,
  typeId,
  editorial,
  totalPages,
  totalVideos,
  totalChapters,
  author,
  totalHours,
  source,
  recourseError,
  dataSelectType,
  isShow,
  selectedTags,
  setSelectedTags,
  recourseSelected
}) => {

  const { settingsType } = useAppSelector((state: RootState) => state.settings);
  const navigate = useNavigate();

  const handleClickCancel = (): void => {
    navigate('/app/recourse');
  }

  if (settingsType === undefined) return <>No se cargaron los datos iniciales</>;
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex w-full gap-10 my-5">
        <Field
          type="text"
          label="Nombre"
          name="name"
          classBox="basis-3/4"
          handleChange={handleInputChange}
          value={name}
          errorInput={recourseError?.name}
        />

        <Combobox
          name="typeId"
          label="Tipo"
          options={dataSelectType}
          filter={false}
          classBox="basis-1/4"
          handleChange={handleChangeType}
          value={typeId}
          errorCombo={recourseError?.typeId}
          isDisabled={isShow}
        />
      </div>
      <div className="flex gap-10 my-5">
        <Field
          type="text"
          label="Editorial"
          name="editorial"
          classBox="basis-3/4"
          handleChange={handleInputChange}
          value={editorial}
          errorInput={recourseError?.editorial}
        />

        {typeId ===
          settingsType.find((val) => val.key === GLOBAL_TYPES_RECOURSE.RECOURSE_TYPE_LIBRO)?.id ? (
          <Field
            type="text"
            label="Total Paginas"
            name="totalPages"
            classBox="basis-1/4"
            handleChange={handleInputChange}
            value={totalPages}
            errorInput={recourseError.totalPages}
          />
        ) : (
          <Field
            type="text"
            label="Total Videos"
            name="totalVideos"
            classBox="basis-1/4"
            handleChange={handleInputChange}
            value={totalVideos}
            errorInput={recourseError.totalVideos}
          />
        )}
      </div>
      <div className="flex gap-10 my-5">
        <Field
          type="text"
          label="Autor"
          name="author"
          classBox="basis-3/4"
          handleChange={handleInputChange}
          value={author}
          errorInput={recourseError.author}
        />

        {typeId ===
          settingsType?.find((val) => val.key === GLOBAL_TYPES_RECOURSE.RECOURSE_TYPE_LIBRO)?.id ? (
          <Field
            type="text"
            label="Total Capitulos"
            name="totalChapters"
            classBox="basis-1/4"
            handleChange={handleInputChange}
            value={totalChapters}
            errorInput={recourseError.totalChapters}
          />
        ) : (
          <Field
            type="text"
            label="Total Horas"
            name="totalHours"
            classBox="basis-1/4"
            handleChange={handleInputChange}
            value={totalHours}
            errorInput={recourseError.totalHours}
          />
        )}
      </div>
      <div className="my-5">
        <Field
          type="text"
          label="Ruta"
          name="source"
          handleChange={handleInputChange}
          value={source}
          errorInput={recourseError.source}
          classBox=""
        />
      </div>
      <div className="mt-5 mb-24">
        {
          !isShow ? (
            <SelectorTag setSelectValues={setSelectedTags} selectedTags={selectedTags} />
          ) : (
            <div className="flex flex-1 justify-start items-start flex-wrap gap-2 leading-1">
              {recourseSelected?.tags.map((tag) => (
                <div
                  key={tag.id}
                  className={`${tag.style} m-0 h-7 shrink px-4 py-1 text-sm font-bold text-white rounded-2xl transform-uppercase`}>
                  {tag.name}
                </div>
              ))}
            </div>
          )
        }
      </div>
      {!isShow ?
        (
          <div className="flex justify-around gap-14">
            <Button type="submit" text="Registrar" btnType="main" />
            <Button btnType="danger" text="Cancelar" type="button" handleClick={handleClickCancel} />
          </div>
        ) :
        (<></>)
      }

    </form>
  );
};

export default FormView;
