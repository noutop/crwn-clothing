import React from 'react';
import HomePage from './pages/homepage/homepage.compoent';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/signinsingup.component';
import { Switch, Route } from 'react-router-dom'
import { auth, createUserProfile } from './firebase/firebase.utils';
import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = 0

  componentDidMount() {
    this.unsubscribeFromAuth = onAuthStateChanged(auth, async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfile(userAuth)

        onSnapshot(userRef, (snapShot) => {
          this.setState({
            currentUser: snapShot.id,
            ...snapShot.data()
          })
          console.log(this.state)
        })
      } else {
        this.setState({ currentUser: userAuth })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />

        </Switch>
      </div>
    );
  }
}

export default App;
