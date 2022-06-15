import React, { useState,useContext, useEffect } from 'react';

const method = (navigation) => {
    const syllabus = [
        {
            item:{
                title: `What's the name of your teacher?`,
                scoreItems:[
                    {
                        key: 'JorgeCruz',
                        text: 'Jorge Cruz',
                        score: 71
                    },
                    {
                        key: 'ProfJorgeCruz',
                        text: 'Prof. Jorge Cruz',
                        score: 98
                    },
                    {
                        key: null,
                        text: '',
                        score: 0
                    }
                ]
            }
        },
        {
            item:{
                title: 'Input the Class Name or Class Code',
                scoreItems:[
                    {
                        key: 'IS130-02',
                        text: 'IS130-02',
                        score: 96
                    },
                    {
                        key: 'ENTR 153-01',
                        text: 'ENTR 153-01 (32161)',
                        score: 93
                    },
                    {
                        key: null,
                        text: null,
                        score: 0
                    }
                ]
            }
        },
        {
            item:{
                title: `What's your schedule?`,
                scoreItems:[
                    {
                        key: '3:00-5:50pm',
                        text: '3:00pm-5:50pm',
                        score: 96
                    },
                    {
                        key: null,
                        text: '',
                        score: 0
                    }
                ]
            }
        },
    ];

    const assignments = [
        {
            item:{
                title: 'Assignment Title or Subject',
                scoreItems:[
                    {
                        key: 'ComputerEssentials',
                        text: 'Computer Essentials Summary',
                        score: 79
                    },
                    {
                        key: 'ComputerProgramming',
                        text: 'Computer Programming Essentials Summary',
                        score: 91
                    },
                    {
                        key: null,
                        text: '',
                        score: 0
                    }
                ]
            }
        },
        {
            item:{
                title: 'Assignment Due Date',
                scoreItems:[
                    {
                        key: 'May26',
                        text: 'May 26. 2022 5:00PM',
                        score: 95
                    },
                    {
                        key: '5pm-6pm',
                        text: '5:00pm - 6:00pm',
                        score: 72
                    },
                    {
                        key: null,
                        text: '',
                        score: 0
                    }
                ]
            }
        },
        {
            item:{
                title: 'Class Assigned',
                scoreItems:[
                    {
                        key: 'IS1320',
                        text: 'IS130-02',
                        score: 96
                    },
                    {
                        key: 'ENTR15301',
                        text: 'ENTR153-01',
                        score: 96
                    },
                    {
                        key: null,
                        text: '',
                        score: 0
                    }
                ]
            }
        },
    ];

    const [activeTab, setActiveTab] = useState(0);
    const onSelect = (value) => {
        setActiveTab(value)
    }

    return {
       syllabus,
       assignments,
       onSelect,
       activeTab,
       setActiveTab
    };
  };
  
  export default method;