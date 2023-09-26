import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/posts';

const Paginate = ({page}) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (page) {
            dispatch(getPosts(page));
        }
    }, [page, dispatch]);

    return (
        <div className='pagination-con'>
            {numberOfPages && (
                <ul className='pagination'>
                    <li className='pagination-icons'>
                        <Link className='nav-links' to={`/posts?page=${page-1 || 1}`}>
                            <AiOutlineLeft />
                        </Link>
                    </li>
                    <li className={Number(page) === 1 ? 'active-pag' : ''}>
                        <Link 
                            className='nav-links'
                            to={`/posts?page=${1}`}>
                                1
                            </Link>
                    </li>
                    <li className={Number(page) === 2 ? 'active-pag' : ''}>
                        <Link className='nav-links' to={`/posts?page=${2}`}>2</Link>
                    </li>
                    <li className={Number(page) === 3 ? 'active-pag' : ''}>
                        <Link className='nav-links' to={`/posts?page=${3}`}>3</Link>
                    </li>
                    <li className='pagination-icons'>
                        <Link className='nav-links' to={`/posts?page=${Number(page)+1}`}>
                            <AiOutlineRight />
                        </Link>
                    </li>
                    {/* <li><Link className='nav-links' to={`/posts?page=${1}`}>1</Link></li>
                    <li><Link className='nav-links' to={`/posts?page=${1}`}>2</Link></li>
                    <li><Link className='nav-links' to={`/posts?page=${1}`}>3</Link></li>
                    <li><Link className='nav-links' to={`/posts?page=${1}`}>4</Link></li>
                    <li><Link className='nav-links' to={`/posts?page=${1}`}>5</Link></li>
                    <li className='pagination-icons'>
                        <Link className='nav-links' to={`/posts?page=${1}`}>
                            <AiOutlineRight />
                        </Link>
                    </li> */}
                </ul>
            )}
        </div>
    );
}

export default Paginate;