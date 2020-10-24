import {
  PROVEEDOR_ADDS,
  PROVEEDOR_FAILED,
  PROVEEDOR_LOADING
} from '../../constants/proveedor.constants';

const initialState = {
  isLoading: false,
  errMessage: null,
  proveedores: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROVEEDOR_LOADING:
      return { ...state, isLoading: true, errMessage: null, proveedores: [] };
    case PROVEEDOR_ADDS:
      const { proveedores } = payload;
      return {
        ...state,
        isLoading: false,
        errMessage: null,
        proveedores
      };
    case PROVEEDOR_FAILED:
      const { errMessage } = payload;
      return { ...state, isLoading: false, errMessage, proveedores: [] };
    default:
      return state;
  }
};
