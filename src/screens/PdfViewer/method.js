import React, { useState } from 'react';
import * as RNFS from 'react-native-fs'
import { PDFDocument } from 'pdf-lib';
import { useNavigation } from '@react-navigation/native';

const method = (props) => {
    const navigation = useNavigation();

    const [activeTab, setActiveTab] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pdfPage, setPdfPage] = useState(1);
    const [includedPagesInSyllabi, setIncludedPagesInSyllabi] = useState([]);

    const onSelect = (value) => {
        setActiveTab(value)
    }

    const includePageInSyllabi = (isInclude) => {
        let pages = includedPagesInSyllabi;
        isInclude ? pages.push(currentPage) : pages.splice((currentPage - 1), 1)
        setIncludedPagesInSyllabi(pages);
    }

    const scanPdf = async(uri) => {
        try{
            const pdfData = await RNFS.readFile(uri, 'base64');
            const pdfDoc = await PDFDocument.load(pdfData);
            let pages = includedPagesInSyllabi;
            pages.sort();
            pages.reverse();
            for(let i = totalPages-1; i >= 0; i--) {
              if(includedPagesInSyllabi.indexOf(i+1) < 0) {
                pdfDoc.removePage(i);
              }
            }
            const base64String = await pdfDoc.saveAsBase64(); 
            navigation.navigate('LoadingScreen', {previousScreen: 'Syllabus', base64String: base64String})
        }catch(e){
            alert(JSON.stringify(e.message))
        }
    }

    return {
       pdfPage,
       currentPage,
       totalPages,
       includedPagesInSyllabi,
       includePageInSyllabi,
       onSelect,
       activeTab,
       setPdfPage,
       setTotalPages,
       setCurrentPage,
       scanPdf
    };
  };
  
  export default method;