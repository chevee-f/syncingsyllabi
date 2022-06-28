import React, { useState } from 'react';

const method = (props) => {
    const syllabus = [
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

    const assignment = [
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
                subjectTitle: "Computer Essentials Summary",
                confidenceScore: 79
            },
            {
                subjectTitle: "Computer Programming Essentials Summary",
                confidenceScore: 91
            }
        ],
        dueDate: [
            {
                dueDate: "May 26. 2022 5:00PM",
                confidenceScore: 95
            },
            {
                dueDate: "5:00pm - 6:00pm",
                confidenceScore: 72
            }
        ],
        classAssigned: [
            {
                classAssigned: "IS130-02",
                confidenceScore: 95
            },
            {
                classAssigned: "ENTR153-01",
                confidenceScore: 72
            }
        ],
    }

    const [activeTab, setActiveTab] = useState(0);
    const onSelect = (value) => {
        setActiveTab(value)
    }

    return {
       syllabus,
       assignment,
       assignments,
       onSelect,
       activeTab,
       setActiveTab
    };
  };
  
  export default method;