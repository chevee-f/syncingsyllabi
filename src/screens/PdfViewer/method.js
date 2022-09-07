import React, { useState, useEffect } from 'react';
import * as RNFS from 'react-native-fs'
import { PDFDocument } from 'pdf-lib';
import { useNavigation } from '@react-navigation/native';

const method = (props) => {
    const navigation = useNavigation();

    const [activeTab, setActiveTab] = useState(0);
    const [syllabiPagesCount, setSyllabiPagesCount] = useState(0);
    const [assignmentPagesCount, setAssignmentPagesCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pdfPage, setPdfPage] = useState(1);
    const [includedPagesInSyllabi, setIncludedPagesInSyllabi] = useState([]);
    const [includedPagesInAssignment, setIncludedPagesInAssignment] = useState([]);
    const [pdfData, setPdfData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSelect = (value) => {
        setActiveTab(value)
        setCurrentPage(1)
        setPdfPage(0)
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
        setIsLoading(true)
        readPdf()
        // console.log("new file")
        setCurrentPage(1)
        setPdfPage(0)
        setActiveTab(0)
    }, [props.route.params.file]);

    const readPdf = async() => {
        const pdfData = await RNFS.readFile(decodeURI(props.route.params.file.uri), 'base64');
        setPdfData(pdfData)
        setIsLoading(false)
    }

    const scanPdf = async() => {
        try{

            const pdfDocSyllabi = await PDFDocument.load(pdfData);
            const pdfDocAssignment = await PDFDocument.load(pdfData);

            let base64ArraySyllabi = [];
            let base64ArrayAssignment = [];
            // console.log("includedPagesInAssignment")
            // console.log(includedPagesInAssignment)
            // console.log("includedPagesInSyllabi")
            // console.log(includedPagesInSyllabi)
            // const indices = pdfDocAssignment.getPageIndices()
            // console.log("indices=============")
            // console.log(indices)
            for(let i = totalPages-1; i >= 0; i--) {
                if(includedPagesInSyllabi.length > 0) {
                    if(includedPagesInSyllabi.indexOf(i+1) < 0) {
                        console.log("removing s " + i) 
                        pdfDocSyllabi.removePage(i);
                    }
                }
                if(includedPagesInAssignment.length > 0) {
                    if(includedPagesInAssignment.indexOf(i+1) < 0) {
                        console.log("removing a " + i) 
                        pdfDocAssignment.removePage(i);
                    }
                }
            }

            // console.log("NEW !!!!!!! indices=============")
            // console.log(pdfDocAssignment.getPageIndices())
            if(activeTab == 0) {
                for(let i = 0; i < includedPagesInSyllabi.length; i++) {
                    let newPdfDoc = await PDFDocument.create();
                    const [copiedPages] = await newPdfDoc.copyPages(pdfDocSyllabi, [i])
                    newPdfDoc.addPage(copiedPages)

                    const base64 = await newPdfDoc.saveAsBase64(); 
                    base64ArraySyllabi.push(base64);
                }
            }

            if(activeTab == 1) {
                for(let i = 0; i < includedPagesInAssignment.length; i++) {
                    let newPdfDoc = await PDFDocument.create();
                    const [copiedPages] = await newPdfDoc.copyPages(pdfDocAssignment, [i])
                    newPdfDoc.addPage(copiedPages)
                    // console.log(pdfDocAssignment.getPageCount())
                    // const base64 = await newPdfDoc.saveAsBase64(); 
                    const base64 = await pdfDocAssignment.saveAsBase64(); 
                    // console.log(base64)
                    base64ArrayAssignment.push(base64);
                }
            }
            // return;
            // console.log(base64ArrayAssignment)
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
       pdfPage,
       currentPage,
       totalPages,
       includedPagesInSyllabi,
       includePages,
       includedPagesInAssignment,
       onSelect,
       activeTab,
       isLoading,
       setPdfPage,
       setTotalPages,
       setCurrentPage,
       scanPdf
    };
  };
  
  export default method;