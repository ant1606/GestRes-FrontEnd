import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {RecourseProvider} from "../Context/RecourseContext";
import RecourseScreenNew from "../Components/Pages/Recourse/RecourseScreenNew.jsx";
import RecourseScreenShow from "../Components/Pages/Recourse/RecourseScreenShow.jsx";
import RecourseScreenMain from "../Components/Pages/Recourse/RecourseScreenMain.jsx";

const RecourseRouter = () => {
    return (
        <RecourseProvider>
            <Routes>
                <Route path="recursos" element={<RecourseScreenMain/>}/>
                <Route path="recursos/new" element={<RecourseScreenNew />}/>
                <Route path="recursos/show" element={<RecourseScreenShow />}/>
            </Routes>
        </RecourseProvider>
    );
};

export default RecourseRouter;