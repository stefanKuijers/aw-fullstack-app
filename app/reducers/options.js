// @flow
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/options';

export default function options(state: number = 0, action: Object) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}
