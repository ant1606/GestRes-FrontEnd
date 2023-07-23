import React, { useEffect, useRef, useState } from 'react';
import FormView from './FormView';
import { useRecourse } from '../../context/recourse.context';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@/hooks/useForm';
import { toastNotifications } from '@/utilities/notificationsSwal';
import {
  validateNombre,
  validateRuta,
  validateAutor,
  validateEditorial,
  validateTipoId,
  validateTotalVideos,
  validateTotalHoras,
  validateTotalPaginas,
  validateTotalCapitulos
} from '../../utils/RecourseFormValidationInputs';
import { useAppSelector } from '@/hooks/redux';
import { type RootState } from '@/redux/store';

const validateFunctionsFormInputs = {
  nombre: validateNombre,
  ruta: validateRuta,
  autor: validateAutor,
  editorial: validateEditorial,
  tipoId: validateTipoId,
  totalVideos: validateTotalVideos,
  totalHoras: validateTotalHoras,
  totalPaginas: validateTotalPaginas,
  totalCapitulos: validateTotalCapitulos
};

export const FormContainer: React.FC = () => {
  const [comboTypeData, setComboTypeData] = useState<Settings[]>([]);
  // const { savingRecourse, recourseError, addNewError, recourseActive, updatingRecourse } =
  //   useRecourse();
  const { recourseError, addValidationError, recourseActive } = useRecourse();
  const { settingsType } = useAppSelector((state: RootState) => state.settings);

  const navigate = useNavigate();
  // TODO Los valores diferentes al tipo de recurso salen como false en el formulario de show
  // TODO QUeda cargar las etiquetas del recurso
  const initialState = {
    nombre: recourseActive?.nombre ? recourseActive?.nombre : '',
    ruta: recourseActive?.ruta ? recourseActive?.ruta : '',
    autor: recourseActive?.autor ? recourseActive?.autor : '',
    editorial: recourseActive?.editorial ? recourseActive?.editorial : '',
    tipoId:
      recourseActive === null
        ? settingsType.length === 0
          ? 0
          : settingsType[0].id
        : recourseActive?.tipoId,
    totalVideos: recourseActive?.totalVideos
      ? recourseActive?.totalVideos.toString()
      : recourseActive?.totalVideos === undefined
        ? '0'
        : recourseActive?.totalVideos === null && '0',
    totalHoras: recourseActive?.totalHoras
      ? recourseActive?.totalHoras.toString()
      : recourseActive?.totalHoras === undefined
        ? '00:00:00'
        : recourseActive?.totalHoras === null && '00:00:00',
    totalPaginas: recourseActive?.totalPaginas
      ? recourseActive?.totalPaginas.toString()
      : recourseActive?.totalPaginas === undefined
        ? '0'
        : recourseActive?.totalPaginas === null && '0',
    totalCapitulos: recourseActive?.totalCapitulos
      ? recourseActive?.totalCapitulos.toString()
      : recourseActive?.totalCapitulos === undefined
        ? '0'
        : recourseActive?.totalCapitulos === null && '0',
    // tags: [],
    recourseType: settingsType
  };

  // TODO El campo Tipo Recurso aun no se carga correctamente, al igual que los valores del formulario, generar un meetodo para cargarlos
  // dependiendo de la existencia del recourseActive
  const {
    values: formValues,
    handleInputChange,
    validatedSubmitForm,
    reset
  } = useForm(
    initialState,
    validateFunctionsFormInputs as Record<string, (values: unknown) => string | null>,
    addValidationError
  );

  const {
    name,
    source,
    author,
    editorial,
    typeId,
    totalVideos,
    totalHours,
    totalPages,
    totalChapters
  } = formValues;
  const recourseErrorRef = useRef();

  useEffect(() => {
    if (settingsType !== null) {
      setComboTypeData(settingsType);
      reset();
    }
  }, [settingsType]);

  useEffect(() => {
    recourseErrorRef.current = recourseError;
  }, [recourseError]);

  useEffect(() => {
    addValidationError({ totalVideos: null });
    addValidationError({ totalHoras: null });
    addValidationError({ totalCapitulos: null });
    addValidationError({ totalPaginas: null });
    // TODO Al momento de cambiar el tipoId, los valores cambiados de totalXXXXX no se reinicializan
  }, [typeId]);

  useEffect(() => {
    // console.log(recourseActive);
    // console.log(recourseActive?.tipoId);
    reset();
    // console.log(recourseActive === null ? (!settingsType ? 0 : settingsType[0].id) : recourseActive?.tipoId)
  }, [recourseActive]);

  const handleSubmit = async (): Promise<void> => {
    e.preventDefault();

    // setIsLoading(true);
    await validatedSubmitForm();
    const isValid = Object.keys(recourseErrorRef.current).every(
      (el) => recourseErrorRef.current[el] === null
    );
    // console.log(isValid);
    if (isValid) {
      // TODO Aplicar cuando se actualice el registro
      const res = (await recourseActive)
        ? updatingRecourse(formValues, recourseActive.identificador)
        : savingRecourse(formValues);
      // let res =!tagActive ? await savingTag(formValues, searchParams) : await updatingTag(formValues);
      // console.log(res);
      if (res) {
        // console.log("Se guardo");
        reset();
        addNewError([]);

        navigate('/recursos');
      }
    } else {
      toastNotifications().toastError();
    }
  };

  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <FormView
      handleSubmit={handleSubmitWrapper}
      handleInputChange={handleInputChange}
      handleChangeType={handleInputChange}
      name={name}
      typeId={typeId}
      editorial={editorial}
      totalPages={totalPages}
      totalVideos={totalVideos}
      totalChapters={totalChapters}
      author={author}
      totalHours={totalHours}
      source={source}
      recourseError={recourseError}
      dataSelectType={comboTypeData}
    />
  );
};
