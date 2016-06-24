import { FETCH_EXPENDITURE, FETCH_ONE_EXPENDITURE, ADD_EXPENDITURE } from '../actions/actionCreators';

const INITIAL_STATE = { all: [], expenditure: null };

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_ONE_EXPENDITURE:
			return { ...state, expenditure: action.payload.data };
		case FETCH_EXPENDITURE:
			return { ...state, all: action.payload.data };
		case ADD_EXPENDITURE:
			return { data: action.data }
		
	}
	return state;
}