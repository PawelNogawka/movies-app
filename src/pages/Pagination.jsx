import React from 'react'

import classes from './Pagination.module.scss'

const Pagination = ({totalMovies, moviesPerPage,setCurrentPage, currentPage}) => {
    
    let pages = []

    for(let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
        pages.push(i)
    }

    return (
        <div className={classes.pagination}>
            {pages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentPage(page)}
                    className={page == currentPage ? classes.active : ""}
                >
                    {page}
                </button>
            ))}
        </div>
    )
}

export default Pagination
