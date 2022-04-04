import { GET_SYLLABUS_BY_USER, ADD_SYLLABUS, GET_SYLLABUS_DETAIL } from './../actions/syllabus';

const initialState = {
  syllabus: [],
};

function syllabusReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SYLLABUS_BY_USER:
      return {...state, syllabus: action.payload};
    case GET_SYLLABUS_DETAIL:
      return {...state, syllabus: action.payload};
    case ADD_SYLLABUS:
      return {...state, syllabus: action.payload};
    default:
      return state;
  }
}
export default syllabusReducer;