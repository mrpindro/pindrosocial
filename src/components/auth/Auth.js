import React, { useEffect, useRef, useState } from 'react';
import { AiFillLock } from 'react-icons/ai';
// import { GoogleLogin } from '@react-oauth/google';
import Input from '../Input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import { API } from '../../api';
import useTitle from '../../hooks/useTitle';

// function navigate(url) {
//   window.location.href = url;
// }

// async function auth() {
//   const response = await fetch(`http://127.0.0.1:5500/request`, {method: 'post'});
//   const data = await response.json();

//   navigate(data.url);
// }

const initialState = {
  email: '', password: ''
}

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pswdIcon, setPswdIcon] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setformData] = useState(initialState);

  const title = isSignUp ? 'Pindro Social: Register' : 'Pindro Social: Login';
  useTitle(title);


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');

  const emailRef = useRef(null);

  const clear = () => {
    emailRef.current.value = '';
  }

  useEffect(() => {
    if(!pswdIcon) {
      setPswdIcon(true);
    }
  }, [pswdIcon])

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: {result, token} });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  // const login = useGoogleLogin({
  //   onSuccess: googleSuccess,
  //   onError: err => console.log(err)
  // })

  const googleError = () => {console.log('Google login failed')}

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    dispatch(signin(formData, navigate));
  }

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !imageUrl || !password) {
      setMsg('All fields required');
      return;
    }
    
    const signUpformData = new FormData();

    signUpformData.append('first_name', firstName);
    signUpformData.append('last_name', lastName);
    signUpformData.append('email', email);
    signUpformData.append('imageUrl', imageUrl);
    signUpformData.append('password', password);
    signUpformData.append('confirm_password', confirmPassword);

    try {
      const res = await API.post('/user/signup', signUpformData);

      console.log(res.data);
      if(res.data) {
        setMsg('Sign up successful');
        clear();
        setIsSignUp(false);
      }
    } catch (error) {
      setMsg('Failed to sign up, try again!');
      console.error(error);
    }

    // dispatch(signin(formData, navigate));
  }

  const signUpSpan = (
    <p>Don't have an account?
      <span onClick={() => setIsSignUp(true)}> Sign Up</span>
    </p>
  );
  const signInSpan = (
    <p>Already have an account?
      <span onClick={() => setIsSignUp(false)}> Sign In</span>
    </p>
  );

  return (
    <div className='main-con'>
      <div className="reg-log-con">
        <div className="form-con">
          <form className="reg-log-form">
            <AiFillLock className='reg-log-lock' color='#fff' size={40} />
            <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
            {isSignUp ? (
              <>
                <div className="double-form-group">
                  <div className="half-form-group">
                    <Input 
                      placeholder='First Name'
                      htmlFor='first_name'
                      inputId='first_name'
                      handleChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="half-form-group">
                    <Input 
                      placeholder='Last Name'
                      htmlFor='last_name'
                      inputId='last_name'
                      handleChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <Input 
                  placeholder='Enter your email address'
                  htmlFor='email'
                  inputId='email'
                  type='email'
                  useRef={emailRef}
                  handleChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                  type='file'
                  label="Select a profile image"
                  htmlFor='image-url'
                  inputId='image-url'
                  accept='image/*'
                  handleChange={(e) => setImageUrl(e.target.files[0])}
                />
                <Input 
                  placeholder='Enter a password'
                  pswdIcon={pswdIcon}
                  inputId='password'
                  htmlFor='password'
                  type='password'
                  handleChange={(e) => setPassword(e.target.value)}
                />
                <Input 
                  placeholder='Confirm password'
                  pswdIcon={pswdIcon}
                  inputId='confirm_password'
                  htmlFor='confirm_password'
                  type='password'
                  handleChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button 
                  type='button' className='form-btn' onClick={handleSignUpSubmit}
                >
                  Sign Up
                </button>
                {
                  msg && <span>{msg}</span>
                }
              </>
            ) : (
              <>
                <Input 
                  placeholder='Enter your email address'
                  inputName='email'
                  htmlFor='email'
                  inputId='email'
                  type='email'
                  handleChange={handleChange}
                />
                <Input 
                  placeholder='Enter a password'
                  pswdIcon={pswdIcon}
                  inputName='password'
                  inputId='password'
                  htmlFor='password'
                  type='password'
                  handleChange={handleChange}
                />
                <button 
                  type='button' className='form-btn' onClick={handleLoginSubmit}
                >
                  Sign In
                </button>
              </>
            )}
          
            {/* {isSignUp && (
              <div className='form-group form-img'>
                <label className='img-label'>Profile Image</label>
                <FileBase 
                  type='file'
                  multiple={false}
                  onDone={({base64}) => setformData({ ...formData, imageUrl: base64})} 
                />
              </div>
            )} */}

            {/* <div className="form-group">
              <GoogleLogin 
                onSuccess={googleSuccess}
                onError={googleError}
              />
            </div> */}
            {/* <button type='button' onClick={login}>
              Login with google
            </button> */}

            <div className="toggle-reg-log">
              { isSignUp ? signInSpan: signUpSpan }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;