import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppBar from './components/AppBar';
import CreatePost from './components/CreatePost';
import Home from './components/Home';
import Auth from './components/auth/Auth';
import EditPost from './components/EditPost';
import PostPage from './components/PostPage';
import { ContextProvider } from './context/ContextProvider';
import Footer from './components/Footer';
import useTitle from './hooks/useTitle';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  const title = user ? `Pindro Social: ${user?.result?.name}` : 'Pindro Social: Posts';
  useTitle(title);

  return (
    <ContextProvider>
      <Router>
        <AppBar />
        <Routes>
          <Route path='/' Component={() => <Navigate to="/posts" /> } />
          <Route path='/posts'  element={<Home />} />
          <Route path='/posts/search'  element={<Home />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/add' element={<CreatePost />} />
          <Route path='/edit' element={<EditPost  />} />
          <Route path='/auth' Component={() => (!user ? <Auth /> : <Navigate to='/posts' />)} />
        </Routes>
        <Footer />
      </Router>
    </ContextProvider>
  );
}

export default App;
