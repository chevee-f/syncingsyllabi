import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const method = (classSyllabi,setClassSyllabi) => {
    const { syllabus } = useSelector(state => state.syllabusReducer);
    useEffect(() => {
        if(classSyllabi.classCode !== ''){
            let classCode = classSyllabi.classCode.replace(/[ )(]/g,'');
            let syllabi = syllabus.find(x => x.classCode === classCode)
            if(syllabi !== undefined) setClassSyllabi({...classSyllabi, id: syllabi.id})
        }
    }, [syllabus]);

    return{

    }
}

export default method;