import { getAPIBaseUrl } from "../config/env";
import { Alert } from 'react-native';
export const GET_SYLLABUS_OCR_RESULT = 'GET_SYLLABUS_OCR_RESULT';

export const scanSyllabi = (userId, ocrTypeEnum, OcrUploadTypeEnum, token, base64Array) => {
    return async dispatch => {
      try{
        const formData = new FormData();
        formData.append('UserId', userId)
        formData.append('OcrTypeEnum', ocrTypeEnum)
        formData.append('OcrUploadTypeEnum', OcrUploadTypeEnum)
        for(let i = 0; i < base64Array.length; i++)
          formData.append('PdfFile', base64Array[i]);
          let res = await fetch(`${getAPIBaseUrl()}Syllabus/OcrScan`,{
                    method: 'post',
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      "Authorization" : `Bearer ${token}`
                    },
                    body: formData
                })
        let responseJson = await res.json();  
        //alert(JSON.stringify(responseJson.data))
        dispatch({
          type: GET_SYLLABUS_OCR_RESULT,
          payload: responseJson.data,
        });
      }catch (error) {
        alert(error.message)
        dispatch({ type: 'HAS_ERROR', payload: error.message });
      }
    };
};