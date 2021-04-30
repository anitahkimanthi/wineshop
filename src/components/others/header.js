import React from 'react';
import { withRouter } from "react-router";
import { Link, NavLink } from "react-router-dom"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {
    List,
    ListItem,
    ListItemText,
    Toolbar,
} from "@material-ui/core";
import { connect } from "react-redux"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Header(props) {

    const { count } = props

    const goHome = () => {
        props.history.push("/")
    }
    const wineCategory = (e) => {
        // e.currentTarget.id
        const id = e.currentTarget.id.toString()
        props.history.push(`/categories/?tag=${id}`)
    }


    return (
        <div className="row justify-content-center header" >
            <div className="col-12 col-xl-10">
                <div className="row">
                    <div className="col-12 text-center topheader">
                        <Link to="/">
                            <h3 className="brand"><b>WineShop</b></h3>
                            <small>wineshop.com</small>
                        </Link>
                    </div>
                </div>
            </div>
            <hr className="col-12" />
            
            <div className="col-12 col-xl-10 productHeader">
                <Toolbar className="productHeader">
                    <List className="filter">
                        <div className="navItem1">
                            <NavLink to="/filter" 
                                activeClassName="active" 
                                id="popup1" 
                                data-toggle="dropdown" 
                                aria-haspopup="true" 
                                aria-expanded="false"
                            >
                                All Catergories <ExpandMoreIcon />
                            </NavLink>

                            <div
                                className="dropdown-menu" 
                                aria-labelledby="popup1"
                            >
                                <div className="morecontent">
                                    <div className="row">
                                        <List className="category list-unstyled col-12">
                                            <ListItem>
                                                <ListItemText 
                                                    id="red" 
                                                    className="modalItems" 
                                                    primary="All" 
                                                    onClick={goHome}
                                                />
                                            </ListItem>

                                            <ListItem>
                                                <ListItemText 
                                                    id="red" 
                                                    className="modalItems" 
                                                    primary="Red" 
                                                    onClick={wineCategory} 
                                                />
                                            </ListItem>

                                            <ListItem>
                                                <ListItemText 
                                                    id="white" 
                                                    className="modalItems" 
                                                    primary="White" 
                                                    onClick={wineCategory}
                                                />
                                            </ListItem>

                                            <ListItem>
                                                <ListItemText 
                                                    id="sparkling" 
                                                    className="modalItems" 
                                                    primary="Sparkling" 
                                                    onClick={wineCategory}
                                                />
                                            </ListItem>
                                        </List>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="navItem2">
                            <NavLink 
                                to="/orderby" 
                                activeClassName="active" 
                                id="popup2" 
                                data-toggle="dropdown" 
                                aria-haspopup="true" 
                                aria-expanded="false"
                            >
                                Order by <ExpandMoreIcon />
                            </NavLink>
                            <div
                                className="dropdown-menu" 
                                aria-labelledby="popup2"
                            >
                                <div className="morecontent">
                                    <div className="row">
                                        <List className="orderby list-unstyled col-12">
                                            <ListItem>
                                                <ListItemText 
                                                    id="price" 
                                                    className="modalItems" 
                                                    primary="Price" 
                                                    onClick={wineCategory}
                                                />
                                            </ListItem>

                                            <ListItem>
                                                <ListItemText 
                                                    id="vintage" 
                                                    className="modalItems" 
                                                    primary="Vintage" 
                                                    onClick={wineCategory}
                                                />
                                            </ListItem>
                                        </List>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </List>

                    <List className="cartdiv">
                        <Link to="/cart">
                            <span className="cart">
                                <Badge badgeContent={count} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                                <label>Cart</label>
                            </span>
                        </Link>

                        <Link to="/orders">
                            <span className="order">
                                <ListAltIcon />
                                <label>Orders </label>
                            </span>
                        </Link>
                    </List>
                </Toolbar>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    count: state.cart.cartproducts.length,

})

export default withRouter(connect(mapStateToProps)(Header))