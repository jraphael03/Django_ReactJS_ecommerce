import React from 'react'
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ pages, page, keyword='', isAdmin=false }) {     // Add isAdmin for admin products screen

    if(keyword){
        keyword = keyword.split('?keyword=')[1].split('&')[0]       // Split out the keyword so you can search multiple pages
    }

    console.log('KEYWORD', keyword)

    return (
      pages > 1 && (
        <Pagination>
          {[...Array(pages).keys()].map((x) => (
            <LinkContainer
              key={x + 1}
              to={
                !isAdmin        // If not admin return regular page, if isadmin return admin products
                  ? `/?keyword=${keyword}&page=${x + 1}`
                  : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
              } // keyword if we searched using keyword, pages x + 1 so we start at one and move by one
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      )
    );
}

export default Paginate
