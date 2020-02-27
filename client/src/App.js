import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' exact component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <PrivateRoute exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/products' component={Products} />
              <Route exact path='/cart' component={Cart} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <Switch>
                <Route exact path='/products' component={Products} />
              </Switch>
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/posts/:id' component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
