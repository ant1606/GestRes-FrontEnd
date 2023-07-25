import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Combobox from '../../Atoms/Combobox';
import Field from '../../Atoms/Field';
import { useForm } from '../../../hooks/useForm.js';
import useRecourse from '../../../Context/RecourseContext.jsx';
import GLOBAL_CONSTANTES from '../../../const/globalConstantes.js';
import useSettings from '../../../Context/SettingsContext';
import {
  validateAutor,
  validateEditorial,
  validateNombre,
  validateRuta,
  validateTipoId,
  validateTotalCapitulos,
  validateTotalHoras,
  validateTotalPaginas,
  validateTotalVideos
} from './utils/RecourseFormValidationInputs.js';
import { toastNotifications } from '../../../helpers/notificationsSwal.js';

const RecourseForm = ({ children }) => {
  const [comboTypeData, setComboTypeData] = useState([]);
  const { savingRecourse, recourseError, addNewError, recourseActive, updatingRecourse } =
    useRecourse();
  const { settingsType } = useSettings();
  const navigate = useNavigate();
  // TODO Los valores diferentes al tipo de recurso salen como false en el formulario de show
  // TODO QUeda cargar las etiquetas del recurso
  const initialState = {
    nombre: recourseActive?.nombre ? recourseActive?.nombre : '',
    ruta: recourseActive?.ruta ? recourseActive?.ruta : '',
    autor: recourseActive?.autor ? recourseActive?.autor : '',
    editorial: recourseActive?.editorial ? recourseActive?.editorial : '',
    tipoId:
      recourseActive === null ? (!settingsType ? 0 : settingsType[0].id) : recourseActive?.tipoId,
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
    tags: [],
    recourseType: settingsType
  };
  // const initialState = {
  //   nombre: recourseActive?.nombre ?  recourseActive?.nombre : '',
  //   ruta: recourseActive?.ruta ? recourseActive?.ruta : '',
  //   autor: recourseActive?.autor ? recourseActive?.autor : '',
  //   editorial: recourseActive?.editorial ? recourseActive?.editorial : '',
  //   tipoId: recourseActive === null ? (!settingsType ? 0 : settingsType[0].id) : recourseActive?.tipoId,
  //   totalVideos: recourseActive?.totalVideos ? recourseActive?.totalVideos : recourseActive?.totalVideos=== undefined && '0',
  //   totalHoras: recourseActive?.totalHoras ? recourseActive?.totalHoras : recourseActive?.totalHoras=== undefined && '00:00:00',
  //   totalPaginas: recourseActive?.totalPaginas ? recourseActive?.totalPaginas : recourseActive?.totalPaginas=== undefined && '0',
  //   totalCapitulos: recourseActive?.totalCapitulos ? recourseActive?.totalCapitulos : recourseActive?.totalCapitulos=== undefined && '0',
  //   tags: [],
  //   recourseType: settingsType
  // };

  // tipoId: recourseActive?.tipoId === undefined ? 0 : (!settingsType ? 0 : settingsType[0].id) ,
  // recourseActive?.tipoId === undefined ? (!settingsType ? 0 : settingsType[0].id) : recourseActive?.tipoId,
  const validateInputs = {
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

  // TODO El campo Tipo Recurso aun no se carga correctamente, al igual que los valores del formulario, generar un meetodo para cargarlos
  // dependiendo de la existencia del recourseActive
  const [formValues, handleInputChange, reset, validatedSubmitForm] = useForm(
    initialState,
    validateInputs,
    addNewError
  );
  const {
    nombre,
    ruta,
    autor,
    editorial,
    tipoId,
    totalVideos,
    totalHoras,
    totalPaginas,
    totalCapitulos,
    tags
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
    addNewError({ totalVideos: null });
    addNewError({ totalHoras: null });
    addNewError({ totalCapitulos: null });
    addNewError({ totalPaginas: null });
    // TODO Al momento de cambiar el tipoId, los valores cambiados de totalXXXXX no se reinicializan
  }, [tipoId]);

  useEffect(() => {
    // console.log(recourseActive);
    // console.log(recourseActive?.tipoId);
    reset();
    // console.log(recourseActive === null ? (!settingsType ? 0 : settingsType[0].id) : recourseActive?.tipoId)
  }, [recourseActive]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setIsLoading(true);
    await validatedSubmitForm();
    const isValid = Object.keys(recourseErrorRef.current).every(
      (el) => recourseErrorRef.current[el] === null
    );
    // console.log(isValid);
    if (isValid) {
      // TODO Aplicar cuando se actualice el registro
      if (
        parseInt(formValues.typeId) ===
        settingsType.find((val) => val.key === GLOBAL_CONSTANTES.RECOURSE_TYPE_LIBRO).id
      ) {
        recourse.totalVideos = null;
        recourse.totalHoras = null;
      } else {
        recourse.totalPaginas = null;
        recourse.totalCapitulos = null;
      }

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

    // setIsLoading(false);
    // document.querySelector('#nombre').select();
    //
    // e.preventDefault();
    // //TODO Queda pendiente la obtencion de las etiquetas
    // if(recourseActive===null){
    //   recourseSaveDB({...formValues});
    // } else {
    //   console.log("Actualizar el recurso");
    // }
  };

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex w-full gap-10 my-5">
          <Field
            type="text"
            label="Nombre"
            name="nombre"
            classBox="basis-3/4"
            handleChange={handleInputChange}
            value={nombre}
            errorInput={recourseError.nombre}
          />

          <Combobox
            name="tipoId"
            label="Tipo"
            options={comboTypeData}
            filter={false}
            classBox="basis-1/4"
            handleChange={handleInputChange}
            value={tipoId}
            errorCombo={recourseError.tipoId}
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
            errorInput={recourseError.editorial}
          />

          {parseInt(tipoId) ===
            settingsType?.find((val) => val.key === GLOBAL_CONSTANTES.RECOURSE_TYPE_LIBRO).id ? (
            <Field
              type="text"
              label="Total Paginas"
              name="totalPaginas"
              classBox="basis-1/4"
              handleChange={handleInputChange}
              value={totalPaginas}
              errorInput={recourseError.totalPaginas}
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
            name="autor"
            classBox="basis-3/4"
            handleChange={handleInputChange}
            value={autor}
            errorInput={recourseError.autor}
          />

          {parseInt(tipoId) ===
            settingsType?.find((val) => val.key === GLOBAL_CONSTANTES.RECOURSE_TYPE_LIBRO).id ? (
            <Field
              type="text"
              label="Total Capitulos"
              name="totalCapitulos"
              classBox="basis-1/4"
              handleChange={handleInputChange}
              value={totalCapitulos}
              errorInput={recourseError.totalCapitulos}
            />
          ) : (
            <Field
              type="text"
              label="Total Horas"
              name="totalHoras"
              classBox="basis-1/4"
              handleChange={handleInputChange}
              value={totalHoras}
              errorInput={recourseError.totalHoras}
            />
          )}
        </div>

        <div className="my-5">
          <Field
            type="text"
            label="Ruta"
            name="ruta"
            handleChange={handleInputChange}
            value={ruta}
            errorInput={recourseError.ruta}
          />
        </div>

        <div className="mt-5 mb-24">
          <Field
            type="text"
            label="Etiquetas"
            name="etiqueta"
            value={tags}
            handleChange={handleInputChange}
          />
        </div>
        {children}
      </form>
    </>
  );
};

export default RecourseForm;
