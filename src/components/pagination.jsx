import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';


export default class Pagination extends Component {
    render() {

        const { itemsCount, pageSize, currentPage } = this.props;
        console.log(currentPage)
        const pagesCount = Math.ceil(itemsCount / pageSize);
        if (pagesCount === 1) return null;
        console.log(pagesCount)
        const pages = _.range(1, pagesCount + 1);

        return (
            <ul className="pagination">
                {pages.map(page => (
                    <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
                        <a onClick={() => this.props.onPageChange(page)} className="page-link">
                            {page}
                        </a>
                    </li>
                )
                )}
            </ul>
        )
    }
}
Pagination.PropTypes = {
    itemsCount: PropTypes.number.isRequires,
    pageSize: PropTypes.number.isRequires,
    currentPage: PropTypes.number.isRequires
};