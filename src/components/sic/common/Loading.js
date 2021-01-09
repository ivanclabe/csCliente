import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

const loading = ({ type, color }) => (
  <ReactLoading type="bars" color="#5e6e82" width="100px" height="100px" />
);

loading.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string
};

export default loading;
