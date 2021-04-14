import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import Header from "./components/others/header";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./components/others/allwines";
import SingleWine from "./components/others/singlewine";
import Authentication from "./components/others/personalDetails";
import Cart from "./components/others/cart";
import store from "./components/redux/store";

// import Error from "./components/others/error";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Grid
} from "@material-ui/core";

const history = createBrowserHistory();

const App = () => {
    return (
        <Grid xs={12}>
            <Router  history={history}>
            <Header/>
            <Grid container xs={12} sm={11} ml={10}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/single-wine" component={SingleWine}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/checkout/requirements" component={Authentication}/>
                    <Route component={Error}/>
                </Switch>
            </Grid>
            </Router>
        </Grid>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
  
  document.getElementById("root")
)