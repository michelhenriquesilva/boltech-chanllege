import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "../screens/Login"
import SignUp from "../screens/SignUp"

export function AuthRoutes(){
    return(
        <Router>
            <Switch>        
                <Route exact path="/" component={Login} />
                <Route exact path="/signin" component={Login} />
                <Route exact path="/signup" component={SignUp} />
            </Switch>
        </Router>
    )
}