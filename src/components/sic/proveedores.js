import React, { Fragment, useState } from 'react';
import { Button, Card, CardBody, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FalconCardHeader from '../common/FalconCardHeader';
import PageHeader from '../common/PageHeader';

const ProveedorForm = () => {
  const [pageTitle] = useState('Proveedor');
  const [formTitle] = useState('Nuevo Proveedor');

  return (
    <Fragment>
      <PageHeader
        title={pageTitle}
        description="Examples and usage guidelines for form control styles, layout options, and custom components for creating a wide variety of forms."
        className="mb-3"
      >
        <Button
          tag="a"
          href="https://reactstrap.github.io/components/form"
          target="_blank"
          color="link"
          size="sm"
          className="pl-0"
        >
          Forms on reactstrap
          <FontAwesomeIcon icon="chevron-right" className="ml-1 fs--2" />
        </Button>
      </PageHeader>
      <Card className="mb-3">
        <FalconCardHeader title={formTitle} light={false} />
        <CardBody className="bg-light">
          <Form>
            <FormGroup>
              <Label for="proveedorNombre">Nombre</Label>
              <Input
                type="text"
                name="nombre"
                id="proveedorNombre"
                placeholder="Nombre del Proveedor"
              />
            </FormGroup>

            {/* Address */}
            <FormGroup>
              <Label for="exampleAddress">Direccion</Label>
              <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St" />
            </FormGroup>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleSelect">Pais</Label>
                  <Input type="select" name="select" id="exampleSelect">
                    <option>-</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleSelect">Departamento</Label>
                  <Input type="select" name="select" id="exampleSelect">
                    <option>-</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleSelect">Ciudad</Label>
                  <Input type="select" name="select" id="exampleSelect">
                    <option>-</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary">Guardar</Button>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default ProveedorForm;
