import React from 'react';
import ReactLoading from 'react-loading';

const Loader = () => {
    //TODO Arreglar que cuando existe scroll hacia abajo, el fondo del loader no abarca toda la altura de la pagina
    return (
        <div
            className='modal_background_color absolute h-full w-full
            top-0 left-0 z-40 flex justify-center items-center'
        >
            <ReactLoading
                type='spinningBubbles'
                height={150}
                width={150}
                color='#111827'
            />
        </div>
    );
};

export default Loader;
