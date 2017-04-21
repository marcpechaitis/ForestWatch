import type { Action } from '../actions/types';
import { SET_INDEX } from '../actions/list';

export type State = {
  list: string
};

const initialState = {
  list: [
    'Observation Report 1',
    'Observation Report 2',
    'Observation Report 3',
    'Observation Report 4',
    'Observation Report 5',
    'Observation Report 5'
  ],
  selectedIndex: undefined
};

export default function(state: State = initialState, action: Action): State {
  if (action.type === SET_INDEX) {
    return {
      ...state,
      selectedIndex: action.payload
    };
  }
  return state;
}
