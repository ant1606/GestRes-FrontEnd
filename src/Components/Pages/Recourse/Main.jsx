import { useContext, useEffect  } from 'react'
import TitleContext from '../../../Context/TitleContext'
import { mdiMagnify} from '@mdi/js';
import Icon from '@mdi/react'
import RecourseTable from '../../Organisms/RecourseTable';
import Field from '../../Atoms/Field';
import Combobox from '../../Atoms/Combobox';
import { Link } from 'react-router-dom';
import RecourseForm from '../../Organisms/Recourse/Form';
import Modal from '../../Molecules/Modal';

const Recursos = () => {

  const {changeTitle} = useContext(TitleContext);

  useEffect(()=>{
    changeTitle("Recursos Educativos");
  }, []);

  return (
    <>
      <Modal title="Modal de Registro" />

      {/* //TODO Cuando se accede directamente a la ruta colocandola en la url, los assets del sidebar no son cargados */}
      <Link to="/recursos/new">
        <button className='bg-gray-900 rounded-xl text-white py-2 px-5 text-2xl font-medium
        hover:bg-gray-800 mb-4'>
          Registrar nuevo
        </button>
      </Link>
      

      {/* Filtros */}
      <div className='shadow-2xl p-4 rounded-xl flex flex-col gap-6 mb-16'>
        <p>Filtros</p>
        <div className='flex justify-between items-center gap-12'>
          <div className='basis-1/4 items-end'>
            <Field type="text" label="Nombre" id="nombre"/>
          </div>
          <div className='basis-1/4 items-end'>
            <Combobox name="tipo" label="Tipo" options={["VIDEO TUTORIAL", "LIBRO ELECTRÓNICO"]} filter={true}/>
          </div>
          <div className='basis-1/4 items-end'>
            <Combobox name="estado" label="Estado" filter={true} options={["REGISTRADO", "POR EMPEZAR","EN PROCESO" ]}/>
          </div>
          <div className='basis-1/4 items-end'>
            <Combobox name="etiqueta" label="Etiqueta" filter={true} options={["VIDEO TUTORIAL", "LIBRO ELECTRÓNICO"]}/>
          </div>
          <button className='bg-gray-900 hover:bg-gray-800 text-white font-bold p-1 rounded-md'>
            <Icon path={mdiMagnify}
                    title="Search"
                    size={1.25}
                    color="white"
                    />
          </button>
        </div>
      </div>

      <RecourseTable />
      
    </>
  )
}

export default Recursos