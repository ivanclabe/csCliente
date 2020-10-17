import React, { useState, useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col, FormGroup, Input, CustomInput, Label } from 'reactstrap';

import Divider from '../common/Divider';
import SocialAuthButtons from './SocialAuthButtons';
import withRedirect from '../../hoc/withRedirect';
import { login, logout } from '../../redux/actions/auth';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  loginUser: credentials => dispatch(login(credentials)),
  logoutUser: () => dispatch(logout())
});

const LoginForm = ({ setRedirect, hasLabel, layout, auth, loginUser, logoutUser }) => {
  // State
  const [username, setUsername] = useState('cmvt');
  const [password, setPassword] = useState('123');
  const [remember, setRemember] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  // Handler
  const handleSubmit = async e => {
    e.preventDefault();
    if (username && password) {
      loginUser({ username, password });
    }
  };

  if (isLoggedIn) {
    toast.success(`Logged in as ${username}`);
    setRedirect(true);
  }

  useEffect(() => {
    setIsDisabled(!username || !password);
  }, [username, password]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        {hasLabel && <Label>Username</Label>}
        <Input
          placeholder={!hasLabel ? 'Username' : ''}
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        {hasLabel && <Label>Password</Label>}
        <Input
          placeholder={!hasLabel ? 'Password' : ''}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
        />
      </FormGroup>
      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <CustomInput
            id="customCheckRemember"
            label="Recordar"
            checked={remember}
            onChange={({ target }) => setRemember(target.checked)}
            type="checkbox"
          />
        </Col>
        <Col xs="auto">
          <Link className="fs--1" to={`/authentication/${layout}/forget-password`}>
            ¿Olvidaste tu contraseña?
          </Link>
        </Col>
      </Row>
      <FormGroup>
        <Button color="primary" block className="mt-3" disabled={isDisabled}>
          Log in
        </Button>
      </FormGroup>
      <Divider className="mt-4">or log in with</Divider>
      <SocialAuthButtons />
    </Form>
  );
};

LoginForm.propTypes = {
  setRedirect: PropTypes.func.isRequired,
  layout: PropTypes.string,
  hasLabel: PropTypes.bool,
  auth: PropTypes.shape({
    isLoggendIn: PropTypes.bool.isRequired,
    user: PropTypes.string
  }).isRequired,
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

LoginForm.defaultProps = {
  layout: 'basic',
  hasLabel: false
};

export default withRedirect(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginForm)
);
