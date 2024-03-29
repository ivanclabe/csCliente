/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col, FormGroup, Input, CustomInput, Label } from 'reactstrap';

// import Divider from '../common/Divider';
// import SocialAuthButtons from './SocialAuthButtons';
import withRedirect from '../../hoc/withRedirect';
import { login } from '../../redux/actions/auth';

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  loginUser: credentials => dispatch(login(credentials))
});

const LoginForm = ({ setRedirect, hasLabel, layout, auth, loginUser }) => {
  // State
  const [username, setUsername] = useState('cmvt');
  const [password, setPassword] = useState('123');
  const [remember, setRemember] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  // const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(auth);

  useEffect(() => {
    setIsDisabled(!username || !password);
  }, [username, password]);

  // Handler
  const handleSubmit = async e => {
    e.preventDefault();
    if (username && password) {
      toast.success(`Logged in as ${username}`);
      await loginUser({ username, password });
      console.log(auth.isLoggendIn);
      if (auth.isLoggedIn) {
        setRedirect(true);
      }
    }
  };

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
      {/* <Divider className="mt-4">or log in with</Divider>
      <SocialAuthButtons /> */}
    </Form>
  );
};

LoginForm.propTypes = {
  setRedirect: PropTypes.func.isRequired,
  layout: PropTypes.string,
  hasLabel: PropTypes.bool,
  auth: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
    user: PropTypes.string
  }).isRequired,
  loginUser: PropTypes.func.isRequired
  // logoutUser: PropTypes.func.isRequired
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
