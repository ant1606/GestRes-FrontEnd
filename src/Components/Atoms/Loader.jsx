import React from 'react';
import ReactLoading from 'react-loading';

const Loader = () => {
    return (
        <div className="modal_background_color h-full w-full absolute
            top-0 left-0 z-40 flex justify-center items-center">
            <ReactLoading
                type="spinningBubbles"
                height={150}
                width={150}
                color="#111827"
            />
        </div>
    )
};

export default Loader