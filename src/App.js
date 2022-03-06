import React from 'react';
import HomePage from './pages/homepage/homepage.compoent';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import CheckOut from './pages/checkout/checkout.component';
import { selectCurrentUser } from './redux/user/user.selector';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/signinsingup.component';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { auth, createUserProfile } from './firebase/firebase.utils';
import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import { setCurrentUser } from './redux/user/user.actions'

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props
    this.unsubscribeFromAuth = onAuthStateChanged(auth, async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfile(userAuth)

        onSnapshot(userRef, (snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
          // console.log(this.state)
        })
      } else {
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckOut} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const dispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, dispatchToProps)(App);
