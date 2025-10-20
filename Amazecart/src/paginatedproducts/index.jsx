import React from 'react'
import UseApi from '../useAPi'
import { AxiosInstance, END_POINTS, REQUEST_TYPE } from '../axiosinstance'
import { useEffect } from 'react';
import Products from '../Products';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import Loader from '../loader/loader';

const PaginatedProduct = () => {
    const [pages, setPages] = useState(1);
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 10;
    useEffect(() => {
        const abortController = new AbortController();
        (async () => {
            try {
                setLoading(true);
                const { data } = (await AxiosInstance.get(END_POINTS.PRODUCTS.PAGINATED, {
                    params: { limit, pages },
                    signal: abortController.signal
                })).data
                const { totalCount, updatedData } = data
                setProducts(updatedData);
                setPageCount(Math.ceil(totalCount / limit));
            } catch (err) {
                console.log("error in paginated async", err);
            } finally {
                setLoading(false)
            }
        })()

        return () => {
            abortController.abort();
        }
    }, [pages])

    const handlePageClick = (e) => {
        const page = e.selected + 1;
        setPages(page);
    }

    return (
        <>
            <Products products={products} />
            <Loader isLoadingProp={loading} />
            {pageCount && products.length ?
                <section className='d-flex justify-content-center'>
                    <ReactPaginate
                        previousClassName='page-item'
                        previousLinkClassName='page-link'
                        pageClassName='page-item'
                        pageLinkClassName='page-link'
                        breakLabel="..."
                        breakClassName='page-item'
                        breakLinkClassName='page-link'
                        nextClassName='page-item'
                        nextLinkClassName='page-link'
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        pageCount={pageCount}
                        containerClassName='pagination'
                        activeClassName='active'

                    /> </section> : null}
        </>
    )
}

export default PaginatedProduct
