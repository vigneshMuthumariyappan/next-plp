"use client";

import React, { useEffect } from 'react'
import {Row, Col, Card, Button, Container} from 'react-bootstrap'
import { fetchCategory } from '@store';
import { useThunk } from '@hooks/handle-thunks';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Slidbar from '@components/Slidbar/Slidbar';
import PaginatedItems from '@components/Pagination/Pagination';

const page = ({params}) => {

    const id = params.categoryId;
    const [getCategory, isLoading, categoryError] = useThunk(fetchCategory);
    const {categoryData, total_count, isLoadingCategory, categoryErrors} = useSelector((state) => {
        return state.category.category.data?{'categoryData':state.category.category.data.products.items, 
        'total_count': state.category.category.data.products.total_count, 'isLoadingCategory': state.category.isLoading,
        'categoryErrors': state.category.error}:{};
    })
    const filteredArray = useSelector((state) => {
        return state.category.filter;
    });
    
    useEffect(() => {
        getCategory({'id': id, filteredArray: filteredArray, currentPage: 1});
    }, [getCategory, id, filteredArray])

    const handlePageClick = (event) => {
        const currentPage = event.selected + 1;
        getCategory({'id': id, filteredArray: filteredArray, currentPage: currentPage});
    };
  return (
    <div className='flex'>
            <Slidbar id={id} filteredArray={filteredArray} />
            <Container>
                {isLoadingCategory && <h4 className='text-center p-4'>Loading...</h4>}
                {!isLoadingCategory && !categoryErrors && 
                <>
                {total_count !== undefined && total_count !==0 && <div className="header">
                    <h2>Total - {`(${total_count})`}</h2>
                </div>}

                {total_count === 0 && <div className="header">
                    <h2>Product not available in a category</h2>
                </div>}
                <Row xs={1} md={2} lg={3} className='plp p-2'>
                    {
                        categoryData && categoryData.map((product) => (
                            <Col className='d text-center'>
                                <Card style={{ width: '17rem' }}>   
                                    <Card.Img variant="top" src={product.small_image.url} />
                                    <Card.Body>
                                        <Card.Title className='title'>{product.name}</Card.Title>
                                        <Card.Text>
                                            {'Price: $'+ product.price_range.minimum_price.final_price.value}
                                        </Card.Text>
                                        <Button variant='dark'><Link href={`/${product.url_rewrites[0].url}`} className='text-black'>View Detail</Link></Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                </>
                }
                <div className="pagination">
                    <PaginatedItems itemsPerPage={20} total_count={total_count} handlePageClick={handlePageClick}/>
                </div>
                </Container>
                {categoryErrors && <h4 className='text-center p-4'>Something went wrong, please reload the page</h4>}
    </div>
  )
}

export default page