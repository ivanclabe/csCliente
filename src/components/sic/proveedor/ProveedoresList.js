/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CustomInput, InputGroup } from 'reactstrap';

import ButtonIcon from '../../common/ButtonIcon';
import FalconCardHeader from '../../common/FalconCardHeader';
import BaseTable from '../common/BaseTable';
import { GET_PROVEEDORES } from '../../../data/proveedor';

const orderFormatter = (dataField, { did, nombre, email }) => (
  <Fragment>
    <Link to="/e-commerce/order-details">
      <strong>{did}</strong>
    </Link>
    {' - '}
    <strong>{nombre}</strong>
    <br />
    <a href={`mailto:${email}`}>{email}</a>
  </Fragment>
);

const ciudadFormatter = (dataField, { ciudad }) => (
  <Fragment>
    {ciudad.nombre}
    {', '}
    {ciudad.depto.nombre}
  </Fragment>
);

const columns = [
  {
    dataField: 'did',
    text: 'NIT',
    classes: 'py-2 align-middle',
    formatter: orderFormatter
  },
  {
    dataField: 'telefono',
    text: 'Telefono',
    classes: 'py-2 align-middle'
  },
  {
    dataField: 'ciudad.nombre',
    text: 'Ciudad',
    classes: 'py-2 align-middle',
    formatter: ciudadFormatter
  }
];

export default () => {
  // State
  const [isSelected] = useState(false);

  return (
    <Card className="mb-3">
      <FalconCardHeader title="Proveedores" light={false}>
        {isSelected ? (
          <InputGroup size="sm" className="input-group input-group-sm">
            <CustomInput type="select" id="bulk-select">
              <option>Bulk actions</option>
              <option value="Refund">Refund</option>
              <option value="Delete">Delete</option>
              <option value="Archive">Archive</option>
            </CustomInput>
            <Button color="falcon-default" size="sm" className="ml-2">
              Apply
            </Button>
          </InputGroup>
        ) : (
          <Fragment>
            <ButtonIcon icon="plus" transform="shrink-3 down-2" color="falcon-default" size="sm">
              Nuevo
            </ButtonIcon>
            <ButtonIcon
              icon="filter"
              transform="shrink-3 down-2"
              color="falcon-default"
              size="sm"
              className="mx-2"
            >
              Filtrar
            </ButtonIcon>
            <ButtonIcon
              icon="external-link-alt"
              transform="shrink-3 down-2"
              color="falcon-default"
              size="sm"
            >
              Exportar
            </ButtonIcon>
          </Fragment>
        )}
      </FalconCardHeader>
      <CardBody className="p-0">
        <BaseTable columns={columns} graphQLQuery={GET_PROVEEDORES} />
      </CardBody>
    </Card>
  );
};
