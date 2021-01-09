import React from 'react';
import { Col, Row } from 'reactstrap';
import { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar } = Search;

const SearchCustomBar = searchProps => {
  // const onSearch = searchText => {
  //   if (typeof searchText !== 'undefined') {
  //     setQuery([{ field: 'nombre', operator: 'SUBSTRING', value: searchText }]);
  //   }
  //   return false;
  // };

  return (
    <Row noGutters className="px-1 py-3">
      <Col sm={{ size: 'auto' }}>
        <SearchBar {...searchProps} />
      </Col>
    </Row>
  );
};

export default SearchCustomBar;
