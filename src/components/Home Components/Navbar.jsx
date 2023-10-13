import React, { useState } from 'react'
import { registerLogic, signinLogic } from '../../service/allapi'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { BASE_URL } from '../../service/baseurl'

const Navbar = () => {

  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    name: '',
    password: ''
  })

  const [signinData, setSignindata] = useState({
    username: '',
    password: ''
  })

  const [image, setImage] = useState('')

  const setProfile = (e) => {
    setImage(e.target.files[0])
  }

  // console.log(image);

  const register = async () => {

    const { username, email, name, password } = registerData

    const headerConfig = {
      "Content-Type": "multipart/form-data"
    }

    const data = new FormData()

    data.append('profilePic', image)
    data.append('username', username)
    data.append('email', email)
    data.append('name', name)
    data.append('password', password)

    const response = await registerLogic(data, headerConfig)

    if (response.status == 201) {
      // window.location.reload();
      window.location.href = `${BASE_URL}/home`;
      // console.log(response);
    }

    else {
      alert('Invalid Details')
    }

  }

  const signin = async () => {
    const response = await signinLogic(signinData);

    if (response.status < 300) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
    }

    if (response.status === 200) {

      // console.log(response);

      const responseUserObject = JSON.stringify(response.data.user);

      localStorage.setItem('user', responseUserObject);

      setTimeout(() => {

        window.location.href = `${BASE_URL}/home`;

      }, 1500)
    }
    else {
      alert('user not found');
    }
  }

  const responseUserObject = localStorage.getItem('user');

  if (responseUserObject) {
    const response = JSON.parse(responseUserObject);
    // console.log(response);
  }

  const responseUserObjectparsed = JSON.parse(localStorage.getItem('user'));


  const signupinput = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  const signininput = (e) => {
    setSignindata({ ...signinData, [e.target.name]: e.target.value })
  }


  const logoutFunct = () => {
    localStorage.clear()
    window.location.href = '/home';
  }

  // console.log(registerData);

  // console.log(signinData);

  return (
    <div>
      {responseUserObject ?

        <nav class="navbar navbar-expand-lg navbar-dark px-5 bg-dark">
          <div class="container-fluid justify-content-between">
            {/* <!-- Left elements --> */}
            <div class="d-flex">
              {/* <!-- Brand --> */}
              <Link to={'/'} class="navbar-brand me-2 mb-1 d-flex align-items-center">
                {/* <img
                  src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                  height="20"
                  alt="MDB Logo"
                  loading="lazy"
                  style={{ marginTop: '2px' }}
                /> */}
                <i class="fa-solid fa-book-open text-danger"></i>
              </Link>

              {/* <form class="input-group w-auto my-auto d-none d-sm-flex">
                <input
                  autocomplete="off"
                  type="search"
                  class="form-control rounded"
                  placeholder="Search"
                  style={{minWidth: '125px'}}
                />
                <span class="input-group-text border-0 d-none d-lg-flex"
                ><i class="fas fa-search"></i
                ></span>
              </form> */}

            </div>
            {/* <!-- Left elements --> */}

            {/* <!-- Center elements --> */}
            <ul class="navbar-nav flex-row d-none d-md-flex">
              <li class="nav-item">
                <h5 className='my-auto'>Hello {responseUserObjectparsed.name}</h5>
              </li>
            </ul>

            {/* <!-- Center elements --> */}

            {/* <!-- Right elements --> */}

            <ul class="navbar-nav flex-row">
              <li class="nav-item dropdown">
                <a
                  class="nav-link d-flex align-items-center"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={`${BASE_URL}/uploads/${responseUserObjectparsed.profilePic}`}
                    className="rounded-circle"
                    height="30"
                    loading="lazy"
                  />
                  <i class="fa-solid fa-caret-down ms-2"></i>
                </a>
                <ul class="dropdown-menu nav-drop-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <Link to={'/profile'} class="dropdown-item">My profile</Link>
                  </li>
                  <li>
                    <button class="dropdown-item text-primary" onClick={logoutFunct} >Logout</button>
                  </li>
                </ul>
              </li>
            </ul>
            {/* <!-- Right elements --> */}
          </div>
        </nav>

        :

        <div>
          {/* <!-- Navbar --> */}
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            {/* <!-- Container wrapper --> */}
            <div class="container">
              {/* <!-- Navbar brand --> */}
              <Link to={'/'} class="navbar-brand me-2" >
                {/* <img
                  src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                  height="16"
                  alt="MDB Logo"
                  loading="lazy"
                /> */}
                <i class="fa-solid fa-book-open text-danger"></i>
              </Link>

              {/* <!-- Toggle button --> */}
              <button
                class="navbar-toggler"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarButtonsExample"
                aria-controls="navbarButtonsExample"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i class="fas fa-bars"></i>
              </button>

              {/* <!-- Collapsible wrapper --> */}
              <div class="collapse navbar-collapse" id="navbarButtonsExample">
                {/* <!-- Left links --> */}
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  {/* <li class="nav-item">
                    <a class="nav-link" href="#">Dashboard</a>
                  </li> */}
                </ul>
                {/* <!-- Left links --> */}

                <div class="d-flex align-items-center">
                  <button type="button" class="btn btn-link px-3 me-2" data-mdb-toggle="modal" data-mdb-target="#loginModal">
                    Login
                  </button>
                  <button type="button" class="btn btn-primary me-3" data-mdb-toggle="modal" data-mdb-target="#signupModal">
                    Sign up for free
                  </button>
                </div>
              </div>
            </div>
          </nav>


          {/* <!-- Login Modal --> */}
          <div class="modal fade " id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content bg-dark p-4">
                <div class="modal-header border-0">
                  <h5 class="modal-title" id="loginModalLabel"></h5>
                  <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">


                  {/* <!-- Pills navs --> */}
                  <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li class="nav-item" role="presentation">
                      <a class="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                        aria-controls="pills-login" aria-selected="true">Login</a>
                    </li>
                    <li class="nav-item" role="presentation">
                      <a class="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                        aria-controls="pills-register" aria-selected="false">Register</a>
                    </li>
                  </ul>
                  {/* <!-- Pills navs --> */}

                  {/* <!-- Pills content --> */}
                  <div class="tab-content">
                    <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                      <form>
                        <div class="text-center mb-3">
                          <p>Sign in with:</p>
                          <button type="button" class="btn btn-link login-mods-btn btn-floating mx-1">
                            <i class="fab fa-facebook-f"></i>
                          </button>

                          <button type="button" class="btn btn-link login-mods-btn btn-floating mx-1">
                            <i class="fab fa-google"></i>
                          </button>

                          <button type="button" class="btn btn-link login-mods-btn btn-floating mx-1">
                            <i class="fab fa-x"></i>
                          </button>

                        </div>

                        <p class="text-center m-0 p-0">or:</p>

                        <div className='mb-4 mt-2'>
                          <input type="text" id='uname' className='form-control log-inputs' placeholder='Username' value={signinData.username} name='username' onChange={signininput} />
                        </div>

                        <div className='mb-4'>
                          <input type="password" id='pwd' className='form-control log-inputs' placeholder='Password' value={signinData.password} name='password' onChange={signininput} />
                        </div>

                        <div class="row mb-4">
                          <div class="col-md-6 d-flex justify-content-center">
                            {/* <!-- Checkbox --> */}
                            <div class="form-check mb-3 mb-md-0">
                              <input class="form-check-input" type="checkbox" value="" id="loginCheck" />
                              <label class="form-check-label" for="loginCheck"> Remember me </label>
                            </div>
                          </div>

                          <div class="col-md-6 d-flex justify-content-center">
                            {/* <!-- Simple link --> */}
                            <a href="#!">Forgot password?</a>
                          </div>
                        </div>

                        {/* <!-- Submit button --> */}
                        <button type="button" class="btn btn-primary btn-block mb-4" onClick={signin}>Sign in</button>

                        {/* <!-- Register buttons --> */}
                        <div class="text-center">
                          <p>Not a member? <a >Register</a></p>
                        </div>
                      </form>
                    </div>
                    <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                      <form>
                        <div class="text-center mb-3">
                          <p>Sign up with:</p>
                          <button type="button" class="btn btn-link btn-floating mx-1">
                            <i class="fab fa-facebook-f"></i>
                          </button>

                          <button type="button" class="btn btn-link btn-floating mx-1">
                            <i class="fab fa-google"></i>
                          </button>

                          <button type="button" class="btn btn-link btn-floating mx-1">
                            <i class="fab fa-twitter"></i>
                          </button>

                          <button type="button" class="btn btn-link btn-floating mx-1">
                            <i class="fab fa-github"></i>
                          </button>
                        </div>

                        <p class="text-center m-0 p-0">or:</p>

                        {/* <!-- Name input --> */}
                        <div className='mb-4'>
                          <input type="text" className='form-control log-inputs' placeholder='Name' value={registerData.name} name='name' onChange={signupinput} />
                        </div>

                        {/* <!-- Username input --> */}
                        <div className='mb-4'>
                          <input type="text" className='form-control log-inputs' placeholder='Username' value={registerData.username} name='username' onChange={signupinput} />
                        </div>

                        {/* <!-- Email input --> */}
                        <div className='mb-4'>
                          <input type="email" className='form-control log-inputs' placeholder='Email' value={registerData.email} name='email' onChange={signupinput} />
                        </div>

                        {/* <!-- Password input --> */}
                        <div className='mb-5'>
                          <input type="password" className='form-control log-inputs' placeholder='Password' value={registerData.password} name='password' onChange={signupinput} />
                        </div>

                        <div className='mb-5 d-flex'>
                          <label className='btn btn-outline-light mx-auto' htmlFor="profileInput">Select a Profile Picture</label>
                          <input type="file" id='profileInput' className='form-control visually-hidden log-inputs' onChange={setProfile} />
                        </div>

                        {/* <!-- Checkbox --> */}
                        <div class="form-check d-flex justify-content-center mb-4">
                          <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                            aria-describedby="registerCheckHelpText" />
                          <label class="form-check-label" for="registerCheck">
                            I have read and agree to the terms
                          </label>
                        </div>

                        {/* <!-- Submit button --> */}
                        <button onClick={register} type="button" class="btn btn-primary btn-block mb-3">Sign up</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* signup Modal */}

          <div class="modal fade " id="signupModal" tabindex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content bg-dark p-4">
                <div class="modal-header border-0">
                  <h5 class="modal-title" id="signupModalLabel"></h5>
                  <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">


                  {/* <!-- Pills navs --> */}
                  <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li class="nav-item" role="presentation">
                      <a class="nav-link " id="tab-signin" data-mdb-toggle="pill" href="#pills-signin" role="tab"
                        aria-controls="pills-signin" aria-selected="true">Login</a>
                    </li>
                    <li class="nav-item" role="presentation">
                      <a class="nav-link active" id="tab-signup" data-mdb-toggle="pill" href="#pills-signup" role="tab"
                        aria-controls="pills-signup" aria-selected="false">Register</a>
                    </li>
                  </ul>
                  {/* <!-- Pills navs --> */}

                  {/* <!-- Pills content --> */}
                  <div class="tab-content">
                    <div class="tab-pane fade" id="pills-signin" role="tabpanel" aria-labelledby="tab-signin">
                      <form>
                        <div class="text-center mb-3">
                          <p>Sign in with:</p>
                          <button type="button" class="btn btn-link login-mods-btn btn-floating mx-1">
                            <i class="fab fa-facebook-f"></i>
                          </button>

                          <button type="button" class="btn btn-link login-mods-btn btn-floating mx-1">
                            <i class="fab fa-google"></i>
                          </button>

                          <button type="button" class="btn btn-link login-mods-btn btn-floating mx-1">
                            <i class="fab fa-x"></i>
                          </button>

                        </div>

                        <p class="text-center m-0 p-0">or:</p>

                        <div className='mb-4 mt-2'>
                          <input type="text" id='uname' className='form-control log-inputs' placeholder='Username' value={signinData.username} name='username' onChange={signininput} />
                        </div>

                        <div className='mb-4'>
                          <input type="password" id='pwd' className='form-control log-inputs' placeholder='Password' value={signinData.password} name='password' onChange={signininput} />
                        </div>

                        <div class="row mb-4">
                          <div class="col-md-6 d-flex justify-content-center">
                            {/* <!-- Checkbox --> */}
                            <div class="form-check mb-3 mb-md-0">
                              <input class="form-check-input" type="checkbox" value="" id="loginCheck" />
                              <label class="form-check-label" for="loginCheck"> Remember me </label>
                            </div>
                          </div>

                          <div class="col-md-6 d-flex justify-content-center">
                            {/* <!-- Simple link --> */}
                            <a href="#!">Forgot password?</a>
                          </div>
                        </div>

                        {/* <!-- Submit button --> */}
                        <button type="button" class="btn btn-primary btn-block mb-4" onClick={signin}>Sign in</button>

                        {/* <!-- Register buttons --> */}
                        <div class="text-center">
                          <p>Not a member? <a >Register</a></p>
                        </div>
                      </form>
                    </div>
                    <div class="tab-pane fade show active" id="pills-signup" role="tabpanel" aria-labelledby="tab-signup">
                      <form>
                        <div class="text-center mb-3">
                          <p>Sign up with:</p>
                          <button type="button" class="btn btn-link btn-floating mx-1">
                            <i class="fab fa-facebook-f"></i>
                          </button>

                          <button type="button" class="btn btn-link btn-floating mx-1">
                            <i class="fab fa-google"></i>
                          </button>

                          <button type="button" class="btn btn-link btn-floating mx-1">
                            <i class="fab fa-twitter"></i>
                          </button>

                          <button type="button" class="btn btn-link btn-floating mx-1">
                            <i class="fab fa-github"></i>
                          </button>
                        </div>

                        <p class="text-center m-0 p-0">or:</p>

                        {/* <!-- Name input --> */}
                        <div className='mb-4'>
                          <input type="text" className='form-control log-inputs' placeholder='Name' value={registerData.name} name='name' onChange={signupinput} />
                        </div>

                        {/* <!-- Username input --> */}
                        <div className='mb-4'>
                          <input type="text" className='form-control log-inputs' placeholder='Username' value={registerData.username} name='username' onChange={signupinput} />
                        </div>

                        {/* <!-- Email input --> */}
                        <div className='mb-4'>
                          <input type="email" className='form-control log-inputs' placeholder='Email' value={registerData.email} name='email' onChange={signupinput} />
                        </div>

                        {/* <!-- Password input --> */}
                        <div className='mb-5'>
                          <input type="text" className='form-control log-inputs' placeholder='Password' value={registerData.password} name='password' onChange={signupinput} />
                        </div>

                        <div className='mb-5 d-flex'>
                          <label className='btn btn-outline-light mx-auto' htmlFor="profileInput">Select a Profile Picture</label>
                          <input type="file" id='profileInput' className='form-control visually-hidden log-inputs' onChange={setProfile} />
                        </div>

                        {/* <!-- Checkbox --> */}
                        <div class="form-check d-flex justify-content-center mb-4">
                          <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                            aria-describedby="registerCheckHelpText" />
                          <label class="form-check-label" for="registerCheck">
                            I have read and agree to the terms
                          </label>
                        </div>

                        {/* <!-- Submit button --> */}
                        <button onClick={register} type="button" class="btn btn-primary btn-block mb-3">Sign up</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }


    </div>
  )
}

export default Navbar