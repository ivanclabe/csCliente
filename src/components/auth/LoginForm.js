import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col, FormGroup, Input, CustomInput, Label } from 'reactstrap';

import Divider from '../common/Divider';
import SocialAuthButtons from './SocialAuthButtons';
// import withRedirect from '../../hoc/withRedirect';
import { loginUser } from '../../redux/actions/auth';

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  loginUser: credentials => dispatch(loginUser(credentials))
});

const LoginForm = ({ setRedirect, hasLabel, layout, auth, loginUser }) => {
  // State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    toast.success(`Logged in as ${username}`);

    if (username && password) {
      loginUser({ username, password });
    }

    // setRedirect(true);
  };

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
  auth: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  loginUser: PropTypes.func.isRequired
};

LoginForm.defaultProps = {
  layout: 'basic',
  hasLabel: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
// export default withRedirect(LoginForm);
