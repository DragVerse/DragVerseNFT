import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBModal,
  MDBModalBody,
  MDBModalFooter
} from 'mdbreact';
import SectionContainer from '../sectionContainer';

const Landing = ({}) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <MDBContainer className='mt-5'>
      <SectionContainer header='Sign in' noBorder>
        <MDBRow>
          <MDBCol md='6'>
            <SectionContainer>
              <form>
                <p className='h5 text-center mb-4'>Sign in</p>
                <div className='grey-text'>
                  <MDBInput
                    label='Type your email'
                    icon='envelope'
                    group
                    type='email'
                    validate
                    error='wrong'
                    success='right'
                  />
                  <MDBInput
                    label='Type your password'
                    icon='lock'
                    group
                    type='password'
                    validate
                  />
                </div>
                <div className='text-center'>
                  <MDBBtn>Login</MDBBtn>
                </div>
              </form>
            </SectionContainer>
          </MDBCol>
          <MDBCol md='6'>
            <SectionContainer>
              <form>
                <p className='h5 text-center mb-4'>Sign in</p>
                <label
                  htmlFor='defaultFormLoginEmailEx'
                  className='grey-text'
                >
                  Your email
                </label>
                <input
                  type='email'
                  id='defaultFormLoginEmailEx'
                  className='form-control'
                />
                <br />
                <label
                  htmlFor='defaultFormLoginPasswordEx'
                  className='grey-text'
                >
                  Your password
                </label>
                <input
                  type='password'
                  id='defaultFormLoginPasswordEx'
                  className='form-control'
                />
                <div className='text-center mt-4'>
                  <button className='btn btn-indigo' type='submit'>
                    Login
                  </button>
                </div>
              </form>
            </SectionContainer>
          </MDBCol>
        </MDBRow>
      </SectionContainer>

      <SectionContainer header='Register' className='row' noBorder>
        <MDBCol md='6'>
          <SectionContainer>
            <form>
              <p className='h5 text-center mb-4'>Sign up</p>
              <div className='grey-text'>
                <MDBInput
                  label='Your name'
                  icon='user'
                  group
                  type='text'
                  validate
                  error='wrong'
                  success='right'
                />
                <MDBInput
                  label='Your email'
                  icon='envelope'
                  group
                  type='email'
                  validate
                  error='wrong'
                  success='right'
                />
                <MDBInput
                  label='Confirm your email'
                  icon='exclamation-triangle'
                  group
                  type='text'
                  validate
                  error='wrong'
                  success='right'
                />
                <MDBInput
                  label='Your password'
                  icon='lock'
                  group
                  type='password'
                  validate
                />
              </div>
              <div className='text-center'>
                <MDBBtn color='primary'>Register</MDBBtn>
              </div>
            </form>
          </SectionContainer>
        </MDBCol>
        <MDBCol md='6'>
          <SectionContainer>
            <form>
              <p className='h5 text-center mb-4'>Sign up</p>
              <label
                htmlFor='defaultFormRegisterNameEx'
                className='grey-text'
              >
                Your name
              </label>
              <input
                type='text'
                id='defaultFormRegisterNameEx'
                className='form-control'
              />
              <br />
              <label
                htmlFor='defaultFormRegisterEmailEx'
                className='grey-text'
              >
                Your email
              </label>
              <input
                type='email'
                id='defaultFormRegisterEmailEx'
                className='form-control'
              />
              <br />
              <label
                htmlFor='defaultFormRegisterConfirmEx'
                className='grey-text'
              >
                Confirm your email
              </label>
              <input
                type='email'
                id='defaultFormRegisterConfirmEx'
                className='form-control'
              />
              <br />
              <label
                htmlFor='defaultFormRegisterPasswordEx'
                className='grey-text'
              >
                Your password
              </label>
              <input
                type='password'
                id='defaultFormRegisterPasswordEx'
                className='form-control'
              />
              <div className='text-center mt-4'>
                <button className='btn btn-unique' type='submit'>
                  Register
                </button>
              </div>
            </form>
          </SectionContainer>
        </MDBCol>
      </SectionContainer>
    </MDBContainer>
  );
}

export default Landing;
