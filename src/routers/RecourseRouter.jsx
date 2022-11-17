import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {RecourseProvider} from "../Context/RecourseContext";
import RecourseScreenForm from "../Components/Pages/Recourse/RecourseScreenForm.jsx";
import RecourseScreenShow from "../Components/Pages/Recourse/RecourseScreenShow.jsx";
import RecourseScreenMain from "../Components/Pages/Recourse/RecourseScreenMain.jsx";

const RecourseRouter = () => {
    return (
        <RecourseProvider>
            <Routes>
                <Route path="recursos" element={<RecourseScreenMain/>}/>
                <Route path="recursos/new" element={<RecourseScreenForm />}/>
                <Route path="recursos/show" element={<RecourseScreenShow />}/>
            </Routes>
        </RecourseProvider>
    );
};

export default RecourseRouter;