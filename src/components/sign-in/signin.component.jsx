import React from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import './signin.styles.scss'
import { signInWithEmailAndPassword } from "firebase/auth";

class SignIn extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault()

    const {email, password} = this.state

    try{
      await signInWithEmailAndPassword(auth, email, password)
      this.setState({email:'', password: ''})
    } catch(error){
      console.log(error)
    }

    this.setState({email: '', password: ''})
  }

  handleChange = event => {
    const {name, value} = event.target

    this.setState({[name]: value})
  }

  render(){
    return(
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Sign in with your email and password </span>

        <form onSubmit={this.handleSubmit}>
          <FormInput 
            name="email" 
            type='email'
            label="email" 
            value={this.state.email} 
            handleChange={this.handleChange}
            required 
          />
          <FormInput 
            name="password" 
            type='password' 
            label="password"
            value={this.state.password} 
            handleChange={this.handleChange}
            required 
          />

          <div className="buttons">
            <CustomButton type="submit"> 
              Sign In
            </CustomButton>
            <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn > 
              Sign In with Google
            </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn