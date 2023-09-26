import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { /*useLocation,*/ useNavigate } from 'react-router-dom';
import { getPostBySearch } from '../actions/posts';

// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }

const Search = () => {
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [tags, setTags] = useState([]);
    const [isTags, setIsTags] = useState(false);

    // const query = useQuery();
    // const page = query.get('page') || 1;
    // const searchQuery = query.get('searchQuery');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSearchTagsChange = (e) => {
        setTags([e.target.value.split(',')])
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }

    const searchPost = () => {
        if(search.trim() || tags) {
            dispatch(getPostBySearch({ search, tags: tags.join(',')}))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/')
        }
    }

    return (
        <div className='search-con'>
            <div className="search-title-tags">
                <div className="search-title">
                    <label htmlFor='search'></label>
                    <input 
                        type="text" 
                        value={search}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        name='search'
                        id='search' 
                        placeholder='title...'
                        onFocus={() => {setIsSearch(true); setIsTags(false)}}
                        className={isSearch ? 'search-control-title' : 'search-input'}
                    />
                </div>

                <div className="search-tags">
                    <label htmlFor='tags'></label>
                    <input 
                        type="text" 
                        value={tags}
                        onChange={handleSearchTagsChange}
                        onKeyDown={handleKeyDown}
                        name='tags'
                        id='tags' 
                        onFocus={() => {setIsSearch(false); setIsTags(true)}}
                        placeholder='tags...'
                        className={isTags ? 'search-control-tags' : 'search-input'}
                    />
                </div>
            </div>
            <div className="search-btn">
                <button
                    onClick={searchPost}
                >
                    Search
                </button>
            </div>
        </div>
    );
}

export default Search;