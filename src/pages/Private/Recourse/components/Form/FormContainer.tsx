/* eslint-disable prettier/prettier */
// TODO AParece error al momento de registrar un recursos, suele salir el error de CORS
import React, { useEffect, useRef, useState } from 'react';

import { useRecourse } from '../../context/recourse.context';
import { useNavigate } from 'react-router-dom';
import { useForm } from '#/hooks/useForm';
import { toastNotifications } from '#/utilities/notificationsSwal';
import {
  validateName,
  validateSource,
  validateAuthor,
  validateEditorial,
  validateTypeId,
  validateTotalVideos,
  validateTotalHours,
  validateTotalPages,
  validateTotalChapters,
  validateUnitMeasureProgressId
} from '../../utils/RecourseFormValidationInputs';
import { useAppDispatch, useAppSelector } from '#/hooks/redux';
import { type RootState } from '#/redux/store';
import { changeTitle, isLoading } from '#/redux/slice/uiSlice';
import { savingRecourse, updatingRecourse } from '#/services/recourse.services';
import { GLOBAL_TYPES_RECOURSE } from '#/config/globalConstantes';
import FormView from './FormView';

const validateFunctionsFormInputs = {
  name: validateName,
  source: validateSource,
  author: validateAuthor,
  editorial: validateEditorial,
  typeId: validateTypeId,
  unitMeasureProgressId: validateUnitMeasureProgressId,
  totalVideos: validateTotalVideos,
  totalHours: validateTotalHours,
  totalPages: validateTotalPages,
  totalChapters: validateTotalChapters
};

interface Props {
  isShow?: boolean;
}
export const FormContainer: React.FC<Props> = ({ isShow = false }) => {
  const dispatch = useAppDispatch();
  const [comboTypeData, setComboTypeData] = useState<Settings[]>([]);
  const [comboUnitMeasureProgressData, setComboUnitMeasureProgressData] = useState<Settings[]>([]);
  const { recourseError, addValidationError, recourseActive, resetValidationError, cleanSelectedRecourse } = useRecourse();
  const { settingsType, settingsUnitMeasureProgress } = useAppSelector((state: RootState) => state.settings);
  const [disabledButton, setDisabledButton] = useState(false);
  console.log("Desde FormContainer", recourseActive);
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  // TODO Los valores diferentes al tipo de recurso salen como false en el formulario de show
  // TODO QUeda cargar las etiquetas del recurso
  // recourseType usado en las funciones de validaciones del formulario
  const initialState = {
    id: recourseActive?.id ?? 0,
    name: recourseActive?.name ?? '',
    source: recourseActive?.source ?? '',
    author: recourseActive?.author ?? '',
    editorial: recourseActive?.editorial ?? '',
    typeId: recourseActive?.typeId ?? settingsType[0]?.id ?? 0,
    unitMeasureProgressId: recourseActive?.unitMeasureProgressId ?? settingsUnitMeasureProgress[0]?.id ?? 0,
    totalVideos: recourseActive?.totalVideos ?? 0,
    totalHours: recourseActive?.totalHours ?? "00:00:00",
    totalPages: recourseActive?.totalPages ?? 0,
    totalChapters: recourseActive?.totalChapters ?? 0,
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
    unitMeasureProgressId,
    totalVideos,
    totalHours,
    totalPages,
    totalChapters
  } = formValues;
  const recourseErrorRef = useRef<Record<string, string | null>>({});

  useEffect(() => {
    if (settingsType !== null) {
      setComboTypeData(settingsType);
      // setComboUnitMeasureProgressData(settingsUnitMeasureProgress);
      reset();
    }
  }, [settingsType]);

  useEffect(() => {
    recourseErrorRef.current = recourseError;
  }, [recourseError]);

  useEffect(() => {
    addValidationError({ totalVideos: null });
    addValidationError({ totalHours: null });
    addValidationError({ totalChapters: null });
    addValidationError({ totalPages: null });
    // TODO Al momento de cambiar el tipoId, los valores cambiados de totalXXXXX no se reinicializan
    // Cambiar los valores de unidad de medida segun el typeId 
    // TODO ver una forma de no usar datos quemados en el filtrado de la unidad de medida de progreso
    let dataUnitMeasureProgres: Settings[] = [];
    if (
      parseInt(typeId) ===
      settingsType.find((val) => val.key === GLOBAL_TYPES_RECOURSE.RECOURSE_TYPE_LIBRO)?.id) {
      dataUnitMeasureProgres = settingsUnitMeasureProgress.filter((unit) => unit.key === 'UNIT_PAGES' || unit.key === 'UNIT_CHAPTERS');
    } else {
      dataUnitMeasureProgres = settingsUnitMeasureProgress.filter((unit) => unit.key === 'UNIT_HOURS' || unit.key === 'UNIT_VIDEOS');
    }
    setComboUnitMeasureProgressData(dataUnitMeasureProgres);
    // TODO Existe problema al cambiar el typeId visiblmente el componente cambia, pero internamente el valor de unitMeasureProgressId se mantiene pegado
  }, [typeId]);

  // TODO Probar esta funcionalidad
  useEffect(() => {
    reset();
    if (recourseActive !== null) {
      setSelectedTags(recourseActive.tags?.map((tag: Tag) => tag.id));
    }
  }, [recourseActive]);

  useEffect(() => {
    dispatch(changeTitle(recourseActive !== null ? 'Edición de Recurso' : "Registro de Recurso"));
    return () => {
      resetValidationError();
    }
  }, []);

  const handleSubmit = async (): Promise<void> => {
    console.log(formValues.unitMeasureProgressId);
    try {
      dispatch(isLoading(true));
      setDisabledButton(true);
      await validatedSubmitForm();
      const existValidationMessage = Object.keys(recourseErrorRef.current).every(
        (el) => recourseErrorRef.current[el] === null
      );

      if (existValidationMessage) {
        if (
          parseInt(formValues.typeId) ===
          settingsType.find((val) => val.key === GLOBAL_TYPES_RECOURSE.RECOURSE_TYPE_LIBRO)?.id
        ) {
          formValues.totalVideos = null;
          formValues.totalHours = null;
        } else {
          formValues.totalPages = null;
          formValues.totalChapters = null;
        }

        const recourseToSend = {
          recourse_id: formValues.id,
          name: formValues.name,
          source: formValues.source,
          author: formValues.author,
          editorial: formValues.editorial,
          type_id: formValues.typeId,
          unit_measure_progress_id: formValues.unitMeasureProgressId,
          total_pages: formValues.totalPages,
          total_chapters: formValues.totalChapters,
          total_videos: formValues.totalVideos,
          total_hours: formValues.totalHours,
          tags: selectedTags ?? [],
        }
        console.log(recourseToSend);

        let response;
        if (recourseActive === null) {
          response = await savingRecourse(recourseToSend);
        } else {
          let resultDialog = true;

          if (recourseActive.typeId !== formValues.typeId) {
            resultDialog = await toastNotifications().modalCustomDialogQuestion(
              'Se modificó el tipo del Recurso',
              'Si cambio el tipo del recurso, los progresos existentes se resetearan a 0\n¿desea continuar con la actualización?'
            )
          } else if (recourseActive.unitMeasureProgressId !== formValues.unitMeasureProgressId) {
            resultDialog = await toastNotifications().modalCustomDialogQuestion(
              'Se modificó la unidad de medida de progreso Recurso',
              'Si cambio la unidad de medida de progreso del recurso, los progresos existentes se resetearan a 0\n¿desea continuar con la actualización?'
            )
          } else {
            const isTypeLibro = parseInt(formValues.typeId) ===
              settingsType.find((val) => val.key === GLOBAL_TYPES_RECOURSE.RECOURSE_TYPE_LIBRO)?.id;
            const $totalAmount = isTypeLibro
              ? formValues.totalPages - recourseActive.totalPages
              : formValues.totalVideos - recourseActive.totalVideos;
            if ($totalAmount !== 0) {
              resultDialog = await toastNotifications().modalCustomDialogQuestion(
                `Se modificó el valor total de ${isTypeLibro ? 'Páginas' : 'Videos'} del Recurso`,
                'Si este valor es menor al total ingresado anteriormente, es probable que el último registro existente del progreso se elimine, \n¿desea continuar con la actualización?'
              )
            }
          }
          if (!resultDialog) throw new Error("Se cancelo la actualización");
          response = await updatingRecourse(recourseToSend);
        }

        if ('data' in response) {
          const message =
            recourseActive === null
              ? 'Se registró el recurso correctamente .'
              : 'Se actualizó el recurso';
          reset();
          resetValidationError();
          toastNotifications().toastSuccesCustomize(message);
          cleanSelectedRecourse();
          navigate('/app/recourse');
        } else if ('error' in response) {
          const errorsDetail = response.error.detail;
          Object.keys(errorsDetail).forEach((key) => {
            if (key !== 'apiResponseMessageError') {
              addValidationError({ [key]: errorsDetail[key] });
            }
          });

          if ('apiResponseMessageError' in errorsDetail) {
            if (errorsDetail.apiResponseMessageError !== null)
              throw new Error(errorsDetail.apiResponseMessageError);
          }
        }
      }
    } catch (error: any) {
      toastNotifications().notificationError(error.message);
    } finally {
      setDisabledButton(false);
      dispatch(isLoading(false));
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
      unitMeasureProgressId={unitMeasureProgressId}
      editorial={editorial}
      totalPages={totalPages}
      totalVideos={totalVideos}
      totalChapters={totalChapters}
      author={author}
      totalHours={totalHours}
      source={source}
      recourseError={recourseError}
      dataSelectType={comboTypeData}
      dataSelectUnitMeasureProgressData={comboUnitMeasureProgressData}
      isShow={isShow}
      selectedTags={selectedTags}
      setSelectedTags={setSelectedTags}
      recourseSelected={recourseActive}
      submitIsDisabled={disabledButton}
    />
  );
};
