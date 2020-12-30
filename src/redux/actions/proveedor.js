import { PROVEEDOR_LOADING, PROVEEDOR_FAILED, PROVEEDOR_ADDS } from '../types';
import { proveedoresList } from '../../services/proveedor.service';

export const proveedorRequest = () => ({
  type: PROVEEDOR_LOADING
});

export const proveedorAdds = proveedores => ({
  type: PROVEEDOR_ADDS,
  payload: { proveedores }
});

export const proveedorFailed = errMessage => ({
  type: PROVEEDOR_FAILED,
  payload: { errMessage }
});

/** ****** */
export const fecthProveedores = () => dispatch => {
  dispatch({ type: PROVEEDOR_LOADING });
  return proveedoresList()
    .then(response => {
      // console.log(response);
      dispatch(proveedorAdds(response));
      // Promise.resolve();
    })
    .catch(error => {
      dispatch(proveedorFailed(error.message));
    });
};
