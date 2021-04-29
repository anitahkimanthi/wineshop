import React, { useState } from 'react';
import { withRouter } from "react-router";
import {Link, NavLink} from "react-router-dom"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {
    List, 
    ListItem, 
    ListItemText,
    Popover,
    Box,
    Toolbar,
} from "@material-ui/core";
import {connect} from "react-redux"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Header (props) {
    const [openCategories, setOpenCategories] = useState(null)
    const [openOrderBY, setOpenOrderBY] = useState(null)

    const {count,addToCart} = props

    const wineCategory = (e) =>{
        // e.currentTarget.id
        const id = e.currentTarget.id.toString()
        console.log(id)
        props.history.push(`/categories/?tag=${id}`)
    }
    
    const openAllCategories = () => {
        setOpenCategories(true)
        setOpenOrderBY(null)
    };

    const openOrderByPopup = () => {
        setOpenOrderBY(true)
        setOpenCategories(null)
    };
    
    const handleClose = () => {
        setOpenOrderBY(!openOrderBY)
        setOpenCategories(!openCategories)
    };
    
    
    return(
        <div className="row justify-content-center header" onClose={handleClose} >
            <div className="col-12 col-md-10">
                <div className="row">
                    <div className="col-12 text-center topheader">
                        <Link to="/">
                            <h3 className="brand"><b>WineShop</b></h3>
                            <small>wineshop.com</small>
                        </Link>
                    </div>
                </div>
            </div>
            <hr className="col-12"/>

            <div className="col-12 col-md-9 productHeader">
                <Toolbar className="productHeader">
                    <List className="filter">
                        <NavLink to="/filter" activeClassName="active" onClick={openAllCategories}>
                            All Catergories {openCategories ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                        </NavLink>
                        <NavLink to="/orderby" activeClassName="active" onClick={openOrderByPopup}> 
                            Order by {openOrderBY ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                        </NavLink>

                        {openCategories &&
                        <div
                            className="popupmodal"
                        >
                            <Box p={2} className="morecontent">
                            <div className="row">
                                <List className="category list-unstyled col-12">
                                    <ListItem>
                                        <ListItemText id="red" className="modalItems" primary="Red" onClick={wineCategory}/>
                                    </ListItem>

                                    <ListItem>
                                        <ListItemText id="white" className="modalItems" primary="White" onClick={wineCategory}/>
                                    </ListItem>

                                    <ListItem>
                                        <ListItemText id="sparkling" className="modalItems" primary="Sparkling" onClick={wineCategory}/>
                                    </ListItem>
                                </List>
                            </div>
                            </Box>
                        </div>
                        }

                        {openOrderBY &&
                        <div
                            className="popup popupmodal"
                        >
                            <Box p={2} className="morecontent">
                            <div className="row">
                                <List className="orderby list-unstyled col-12">
                                    <ListItem>
                                        <ListItemText id="price" className="modalItems" primary="Price" onClick={wineCategory}/>
                                    </ListItem>

                                    <ListItem>
                                    <ListItemText id="vintage" className="modalItems" primary="Vintage" onClick={wineCategory}/>
                                    </ListItem>
                                </List>
                            </div>
                            </Box>
                        </div>
                        }
                    </List>

                    <List className="cartdiv">
                            <Link to="/cart">
                                <span className="cart">
                                    <Badge badgeContent={count} color="secondary">
                                        <ShoppingCartIcon/> 
                                    </Badge>
                                    <label>Cart</label>
                                </span>
                            </Link>

                            <Link to="/orders">
                                <span className="order">
                                    <ListAltIcon/> 
                                    <label>Orders </label>
                                </span>
                            </Link>
                    </List>
                </Toolbar>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>({
    count: state.cart.cartproducts.length,
    
})

export default withRouter( connect(mapStateToProps)(Header))