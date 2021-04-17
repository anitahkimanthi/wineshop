import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import Header from "./components/others/header";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./components/others/allwines";
import WineDetail from "./components/others/wineDetail";
import Cart from "./components/others/cart";
import Filter from "./components/others/filtered";
import store from "./components/redux/store";
import Error from "./components/others/notfound";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js"
import "./static/app.css"

const history = createBrowserHistory();

const App = () => {
    return (
        <div className="row justify-content-center App">
            <Router  history={history}>
            <div className="col-12 header">
                <br/>
                <Header/>
            </div>
            
            <div className="col-12 col-lg-11 col-xl-9 wrapper">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/filter" component={Home}/>
                    <Route path="/wines" component={WineDetail}/>
                    <Route path="/categories" component={Filter}/>
                    <Route path="/cart" component={Cart}/>
                    <Route component={Error}/>
                </Switch>
            </div>
            </Router>
        </div>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
  
  document.getElementById("root")
)