import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Projects } from "../screens/Projects"
import { ProjectDetails } from "../screens/Projects/details"

export function AppRoutes(){
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Projects}  />
                <Route exact path="/projects" component={Projects} /> 
                <Route path="/projects/:id" component={ProjectDetails} /> 
            </Switch>
        </Router>
    )
}