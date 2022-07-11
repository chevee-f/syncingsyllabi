import React, { useState, useEffect } from 'react';
import * as RNFS from 'react-native-fs'
import { useNavigation } from '@react-navigation/native';

const method = (props) => {
    const navigation = useNavigation();

    const [activeTab, setActiveTab] = useState(0);
    const [syllabiPagesCount, setSyllabiPagesCount] = useState(0);
    const [assignmentPagesCount, setAssignmentPagesCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [includedPagesInSyllabi, setIncludedPagesInSyllabi] = useState([]);
    const [includedPagesInAssignment, setIncludedPagesInAssignment] = useState([]);

    const onSelect = (value) => {
        setActiveTab(value)
        setCurrentPage(1)
    }

    const includePages = () => {
        let pages = activeTab === 0 ? includedPagesInSyllabi : includedPagesInAssignment;
        if(((includedPagesInSyllabi).includes(currentPage) && activeTab === 0) || ((includedPagesInAssignment).includes(currentPage) && activeTab === 1)){
            var index = pages.indexOf(currentPage)
            pages.splice(index, 1)
        }else{
            pages.push(currentPage) 
        }
        activeTab === 0 ? setIncludedPagesInSyllabi(pages) : setIncludedPagesInAssignment(pages);
        activeTab === 0 ? setSyllabiPagesCount(includedPagesInSyllabi.length) : setAssignmentPagesCount(includedPagesInAssignment.length)
    }

    useEffect(() => {
        setTotalPages(props.route.params.file.length)
    }, [props.route.params.file]);

    const scanImage = async() => {
        try{

            let base64ArraySyllabi = [];
            let base64ArrayAssignment = [];

            for(let i = 0; i < includedPagesInSyllabi.length; i++) {
                let imgBase64 = await RNFS.readFile(decodeURI(props.route.params.file[includedPagesInSyllabi[i] - 1].uri), 'base64');
                base64ArraySyllabi.push(imgBase64);
            }

            setIncludedPagesInSyllabi([])
            setIncludedPagesInAssignment([])
            setSyllabiPagesCount(0)
            setAssignmentPagesCount(0)

            navigation.navigate('LoadingScreen', 
                {previousScreen: 'Syllabus', 
                 base64StringSyllabi: base64ArraySyllabi,
                 base64StringAssignment: base64ArrayAssignment})

        }catch(e){
            alert(JSON.stringify(e.message))
        }
    }

    return {
       currentPage,
       totalPages,
       includedPagesInSyllabi,
       includePages,
       includedPagesInAssignment,
       onSelect,
       activeTab,
       setCurrentPage,
       scanImage
    };
  };
  
  export default method;