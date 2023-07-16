import React, { useContext, useEffect } from 'react';
import Button from '../../../components/Button.js';
import RecourseForm from '../../../components/Components/Organisms/Recourse/RecourseForm.js';
import { Link } from 'react-router-dom';
import TitleContext from '../../../Context/TitleContext.js';
import useRecourse from '../../../Context/RecourseContext.js';
import useSettings from '../../../Context/SettingsContext.js';

const RecourseScreenForm = () => {
  const { changeTitle } = useContext(TitleContext);
  const { recourseActive, cleanRecourseActive } = useRecourse();

  useEffect(() => {
    console.log(recourseActive);
    changeTitle(`Recursos Educativos / ${recourseActive === null ? 'Nuevo' : 'Editar'} `);
    return () => {
      cleanRecourseActive();
    };
  }, []);

  return (
    <>
      <RecourseForm endpoint={'http://localhost/api/recourses'}>
        <div className="flex justify-around">
          <Button type="submit" text="Registrar" />

          <Link to="/recursos">
            <Button btnType="danger" text="Cancelar" />
          </Link>
        </div>
      </RecourseForm>
    </>
  );
};

export default RecourseScreenForm;
