import React from 'react'
import SignIn from '../../components/sign-in/signin.component'
import SignUp from '../../components/sign-up/sign-up.component'
import './signinandsingup.styles.scss'

const SignInAndSignUpPage = () => (
  <div className='sign-in-and-sign-up'>
    <SignIn />
    <SignUp />
  </div>
)

export default SignInAndSignUpPage