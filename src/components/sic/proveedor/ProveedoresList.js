/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { createRef, Fragment, useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Card, CardBody, Col, CustomInput, InputGroup, Row } from 'reactstrap';
import { useQuery } from '@apollo/client';
import ButtonIcon from '../../common/ButtonIcon';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FalconCardHeader from '../../common/FalconCardHeader';
import { getPaginationArray } from '../../../helpers/utils';
import { GET_PROVEEDORES } from '../../../data/proveedor';

const orderFormatter = (dataField, { id, nombre }) => (
  <Fragment>
    <Link to="/e-commerce/order-details">
      <strong>#{id}</strong>
    </Link>{' '}
    - <strong>{nombre}</strong>
  </Fragment>
);

const columns = [
  {
    dataField: 'id',
    text: 'Nombre',
    classes: 'py-2 align-middle',
    formatter: orderFormatter,
    sort: true
  }
];

const options = {
  custom: true,
  sizePerPage: 10
};

const SelectRowInput = ({ indeterminate, rowIndex, ...rest }) => (
  <div className="custom-control custom-checkbox">
    <input
      className="custom-control-input"
      {...rest}
      onChange={() => {}}
      ref={input => {
        if (input) input.indeterminate = indeterminate;
      }}
    />
    <label className="custom-control-label" />
  </div>
);

const selectRow = onSelect => ({
  mode: 'checkbox',
  classes: 'py-2 align-middle',
  clickToSelect: false,
  // eslint-disable-next-line react/display-name
  selectionHeaderRenderer: ({ mode, ...rest }) => {
    return <SelectRowInput type="checkbox" {...rest} />;
  },
  selectionRenderer: ({ mode, ...rest }) => <SelectRowInput type={mode} {...rest} />,
  onSelect: onSelect,
  onSelectAll: onSelect
});

export default () => {
  const table = createRef();
  const { loading, error, data } = useQuery(GET_PROVEEDORES, {
    variables: { query: [], first: 20 }
  });
  console.log(loading);

  // State
  const [proveedores, setProveedores] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  // // Effect
  useEffect(() => {
    if (!data) return;
    setProveedores(data.getProveedores.edges);
  }, [data]);

  const handleNextPage = ({ page, onPageChange }) => () => {
    onPageChange(page + 1);
  };

  const handlePrevPage = ({ page, onPageChange }) => () => {
    onPageChange(page - 1);
  };

  const onSelect = () => {
    setImmediate(() => {
      setIsSelected(!!table.current.selectionContext.selected.length);
    });
  };

  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

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
              New
            </ButtonIcon>
            <ButtonIcon
              icon="filter"
              transform="shrink-3 down-2"
              color="falcon-default"
              size="sm"
              className="mx-2"
            >
              Filter
            </ButtonIcon>
            <ButtonIcon
              icon="external-link-alt"
              transform="shrink-3 down-2"
              color="falcon-default"
              size="sm"
            >
              Export
            </ButtonIcon>
          </Fragment>
        )}
      </FalconCardHeader>
      <CardBody className="p-0">
        <PaginationProvider
          pagination={paginationFactory({ ...options, totalSize: data.getProveedores.totalCount })}
        >
          {({ paginationProps, paginationTableProps }) => {
            const lastIndex = paginationProps.page * paginationProps.sizePerPage;

            return (
              <Fragment>
                <div className="table-responsive">
                  <BootstrapTable
                    ref={table}
                    bootstrap4
                    keyField="id"
                    data={proveedores}
                    columns={columns}
                    selectRow={selectRow(onSelect)}
                    bordered={false}
                    classes="table-dashboard table-striped table-sm fs--1 border-bottom mb-0 table-dashboard-th-nowrap"
                    rowClasses="btn-reveal-trigger"
                    headerClasses="bg-200 text-900"
                    {...paginationTableProps}
                  />
                </div>
                <Row noGutters className="px-1 py-3 flex-center">
                  <Col xs="auto">
                    <Button
                      color="falcon-default"
                      size="sm"
                      onClick={handlePrevPage(paginationProps)}
                      disabled={paginationProps.page === 1}
                    >
                      <FontAwesomeIcon icon="chevron-left" />
                    </Button>
                    {getPaginationArray(paginationProps.totalSize, paginationProps.sizePerPage).map(
                      pageNo => (
                        <Button
                          color={
                            paginationProps.page === pageNo ? 'falcon-primary' : 'falcon-default'
                          }
                          size="sm"
                          className="ml-2"
                          onClick={() => paginationProps.onPageChange(pageNo)}
                          key={pageNo}
                        >
                          {pageNo}
                        </Button>
                      )
                    )}
                    <Button
                      color="falcon-default"
                      size="sm"
                      className="ml-2"
                      onClick={handleNextPage(paginationProps)}
                      disabled={lastIndex >= paginationProps.totalSize}
                    >
                      <FontAwesomeIcon icon="chevron-right" />
                    </Button>
                  </Col>
                </Row>
              </Fragment>
            );
          }}
        </PaginationProvider>
      </CardBody>
    </Card>
  );
};
