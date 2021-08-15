import React, { Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Loader from './components/Utils/Loader'
//Auth
import auth from './Helpers/auth';
//Components
const Login = React.lazy(() => import('./components/Login/Login'));
const Home = React.lazy(() => import('./components/Home'));


function App() {
  return (
    <Router>
    <Switch>
     <Suspense fallback={<Loader/>}>
       <Route exact path="/login" component={Login} />      
       <PrivateRoute exact path="/" component={Home} /> 
      </Suspense>                 
    </Switch>
    </Router>
  );
}

//PRIVATE ROUTES
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.getToken()
      ? <Component {...props} />
      : <Redirect to='/Login' />
  )} />
)


export default App;