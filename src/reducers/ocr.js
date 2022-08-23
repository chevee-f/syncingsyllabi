import { GET_SYLLABUS_OCR_RESULT } from './../actions/ocr';

const initialState = {
  ocrResults: [],
};

function ocrReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SYLLABUS_OCR_RESULT:
      return {...state, ocrResults: action.payload};
    case 'RESET':
      return {...state, ocrResults: []};
    default:
      return state;
  }
}
export default ocrReducer;