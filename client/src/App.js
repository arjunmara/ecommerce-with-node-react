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
import ProductForm from "./components/products/ProductForm";
import Cart from "./components/cart/Cart";
import ProductSingle from "./components/products/ProductSingle";
// Redux

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
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
        <PersistGate persistor={persistor}>
          <Fragment>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <section className='container'>
              <Alert />
              <Switch>
                <PrivateRoute exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/products' component={Products} />
                <Route exact path='/checkout' component={Cart} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute
                  exact
                  path='/product-add'
                  component={ProductForm}
                />
                <Route exact path='/products' component={Products} />
                <Route
                  exact
                  path='/products/:title'
                  component={ProductSingle}
                />
                <PrivateRoute exact path='/posts' component={Posts} />
                <PrivateRoute exact path='/posts/:id' component={Post} />
              </Switch>
            </section>
          </Fragment>
        </PersistGate>
      </Router>
    </Provider>
  );
};

export default App;
