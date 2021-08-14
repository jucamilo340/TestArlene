import React,{Fragment} from 'react';
import { Switch, Route,Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
//Components
import Login from './components/Login/Login'
import Home from './components/Home'
//Auth
import auth from './Helpers/auth'

function App() {
  return (
    <Router>
    <Switch>
       <Route exact path="/login" component={Login} />
       <Fragment>        
         <PrivateRoute exact path="/" component={Home} />
       </Fragment>                
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
