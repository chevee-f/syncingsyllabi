import { GET_SYLLABUS, ADD_SYLLABUS } from './../actions/syllabus';

const initialState = {
  syllabus: [],
};

function syllabusReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SYLLABUS:
      return {...state, syllabus: action.payload};
    case ADD_SYLLABUS:
      return {...state, syllabus: action.payload};
    default:
      return state;
  }
}
export default syllabusReducer;