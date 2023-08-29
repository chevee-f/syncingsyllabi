import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const method = (props) => {
   
    const { ocrResults } = useSelector(state => state.ocrReducer);
    const [classSyllabi, setClassSyllabi] = useState({
        id:'',
        className: '',
        classCode: '',
        teacherName: '',
        schedule: '',
        scheduleList: [],
        scheduleStartTime: new Date(),
        scheduleEndTime: new Date(),
        colorInHex: 0
    });

    const syllabusItems = [
        {
            title: `What's the name of your teacher?`,
            field: 'teacherName'
        },
        {
            title: 'Input the Class Code',
            field: 'classCode'
        },
        {
            title: 'Input the Class Name',
            field: 'className'
        },
        {
            title: `What's your schedule?`,
            field: 'classSchedule'
        },
    ];

    const assignmentsItems = [
        {
            title: `Assignment Title or Subject`,
            field: 'subjectTitle'
        },
        {
            title: 'Assignment Due Date',
            field: 'dueDate'
        },
        {
            title: 'Class Assigned',
            field: 'classAssigned'
        }
    ];

    const assignments = {
        subjectTitle: [
            {
                name: "Computer Essentials Summary",
                confidenceScore: 79
            },
            {
                name: "Computer Programming Essentials Summary",
                confidenceScore: 91
            }
        ],
        dueDate: [
            {
                name: "May 26. 2022 5:00PM",
                confidenceScore: 95
            },
            {
                name: "5:00pm - 6:00pm",
                confidenceScore: 72
            }
        ],
        classAssigned: [
            {
                name: "IS130-02",
                confidenceScore: 95
            },
            {
                name: "ENTR153-01",
                confidenceScore: 72
            }
        ],
    }

    const [activeTab, setActiveTab] = useState(0);
    const onSelect = (value) => {
        setActiveTab(value)
    }

    return {
       ocrResults,
       syllabusItems,
       assignmentsItems,
       assignments,
       onSelect,
       activeTab,
       classSyllabi,
       setClassSyllabi,
       setActiveTab
    };
  };
  
  export default method;