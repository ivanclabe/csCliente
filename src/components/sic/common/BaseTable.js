/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { Fragment, createRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'reactstrap';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import { useQuery } from '@apollo/client';

import Loading from '../common/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPaginationArray } from '../../../helpers/utils';

const { SearchBar } = Search;

const options = {
  custom: true,
  sizePerPage: 10
};

const initialQueryParam = {
  query: [],
  first: 10,
  last: 0,
  before: null,
  after: null
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
  selectionHeaderRenderer: ({ mode, ...rest }) => {
    return <SelectRowInput type="checkbox" {...rest} />;
  },
  selectionRenderer: ({ mode, ...rest }) => {
    return <SelectRowInput type={mode} {...rest} />;
  },
  onSelect: onSelect,
  onSelectAll: onSelect
});

const BaseTable = ({ columns, graphQLQuery }) => {
  const table = createRef();

  // State
  const [queryParam, setQueryParam] = useState(initialQueryParam);

  const [edges, setEdges] = useState([]);
  const [count, setCount] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  const { loading, error, data } = useQuery(graphQLQuery, {
    variables: { query: [], first: 10 }
  });

  // // Effect
  useEffect(() => {
    if (!data) return;
    const { totalCount, edges } = data[Object.keys(data)[0]];

    setCount(totalCount);
    setEdges(edges.map(({ node }) => ({ ...node })));
  }, [data]);

  const onSelect = () => {
    setImmediate(() => {
      setIsSelected(!!table.current.selectionContext.selected.length);
    });
  };

  const handleNextPage = ({ page, onPageChange }) => () => {
    onPageChange(page + 1);
  };

  const handlePrevPage = ({ page, onPageChange }) => () => {
    onPageChange(page - 1);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mb-2">
        <div className="p-2">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const { first, last } = queryParam;

  return (
    <PaginationProvider
      pagination={paginationFactory({
        ...options,
        sizePerPage: first || last,
        totalSize: count
      })}
    >
      {({ paginationProps, paginationTableProps }) => {
        const lastIndex = paginationProps.page * paginationProps.sizePerPage;
        console.log(lastIndex);

        return (
          <Fragment>
            <ToolkitProvider keyField="id" columns={columns} data={edges} search>
              {toolkitprops => (
                <div>
                  <SearchBar {...toolkitprops.searchProps} />
                  <div className="table-responsive">
                    <BootstrapTable
                      ref={table}
                      bootstrap4
                      keyField="id"
                      data={edges}
                      columns={columns}
                      selectRow={selectRow(onSelect)}
                      bordered={false}
                      classes="table-dashboard table-striped table-sm fs--1 border-bottom mb-0 table-dashboard-th-nowrap"
                      rowClasses="btn-reveal-trigger"
                      headerClasses="bg-200 text-900"
                      {...paginationTableProps}
                    />
                  </div>
                </div>
              )}
            </ToolkitProvider>

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
                      color={paginationProps.page === pageNo ? 'falcon-primary' : 'falcon-default'}
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
  );
};

BaseTable.propTypes = {
  columns: PropTypes.array.isRequired,
  graphQLQuery: PropTypes.object.isRequired
};

export default BaseTable;
