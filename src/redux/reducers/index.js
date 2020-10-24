import { combineReducers } from 'redux';
import auth from './auth';
import proveedor from './proveedor';

export default combineReducers({
  auth,
  proveedor
});
