import React, { useContext } from 'react';
import Posts from './posts/Posts';
import { useNavigate, useLocation } from 'react-router-dom';
import Paginate from './Pagination';
import Search from './Search';
import DataContext from '../context/ContextProvider';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    // const [currentId, setCurrentId ] = useState(null);
    const { setCurrentId } = useContext(DataContext);
    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const createPost = () => {
        navigate('/add');
    }

    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [dispatch, currentId])

    return (
        <div className='main-con'>
            <div className='home-posts-form'>
                <button 
                    className='create-post'
                    onClick={createPost}
                >
                    Create Posts
                </button>
                <div className='posts'>
                    <Posts setCurrentId={setCurrentId} />
                </div>
                {!searchQuery && (
                    <div className="home-pagination">
                        <Paginate page={page} />
                    </div>
                )}
            </div>
            <div className="home-search">
                <Search />
            </div>
        </div>
    );
}

export default Home;