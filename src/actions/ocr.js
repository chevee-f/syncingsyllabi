import { getAPIBaseUrl } from "../config/env";

export const GET_SYLLABUS_OCR_RESULT = 'GET_SYLLABUS_OCR_RESULT';

export const scanSyllabi = (userId, ocrTypeEnum, token, base64String) => {
    return async dispatch => {
      try{
        const formData = new FormData();
        formData.append('UserId', userId)
        formData.append('OcrTypeEnum', ocrTypeEnum)
        formData.append('OcrUploadTypeEnum', 1)
        formData.append('PdfFile', base64String)
        
        let res = await fetch(`${getAPIBaseUrl()}Syllabus/OcrScan`,{
                  method: 'post',
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization" : `Bearer ${token}`
                  },
                  body: formData
               })
        let responseJson = await res.json();  
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