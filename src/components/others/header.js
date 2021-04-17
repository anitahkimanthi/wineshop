import React, { useState } from 'react';
import { withRouter } from "react-router";
import {Link, NavLink} from "react-router-dom"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import store from '../redux/store';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {connect} from "react-redux"

function Header (props) {
    const [open, setOpen] = useState(false)

    const wineCategory = (e) =>{
        // e.currentTarget.id
        const id = e.currentTarget.id.toString()
        props.history.push(`/categories/?tag=${id}`)
    }

    const dropDown = () => {
        setOpen(!open)
        console.log(open)
    }

    const goToCart = () =>{
        props.history.push("/cart")
    }

    const cartCount = store.getState().cart.cartproducts.length

    return(
        <div className="row justify-content-center header">
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
            <div className="row">
                <div className="col-12 col-md-4 ">
                    <ul className="filter row">
                        <li className="filterheader list-unstyled col-12 nopadding" >
                           <NavLink to="/filter" activeClassName="active" className="showme col-6" onClick={dropDown}>
                               Show me {open ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                            </NavLink>
                           <NavLink to="/all-wines" activeClassName="active" className="showall col-6">Show all</NavLink>
                        </li>

                        {open && 
                        <div className="row">
                            <li className="category list-unstyled col-12">
                                <button id="red" className="category-list-item" onClick={wineCategory}>Red</button>
                                <button id="white" className="category-list-item" onClick={wineCategory}>White</button>
                                <button id="sparkling" className="category-list-item" onClick={wineCategory}>Spakrling</button>
                            </li>

                            <li className="orderby list-unstyled col-12">
                                <span className="orderbytitle">Order by </span>
                                <button id="price" className="category-list-item" onClick={wineCategory}>price</button>
                                <button id="vintage" className="category-list-item" onClick={wineCategory}>Vintage</button>
                            </li>
                        </div>
                        }

                    </ul>
                </div>
                <div className="col-12 col-md-8 text-right cartdiv">
                    <span className="cart" onClick={goToCart}>
                        <Badge badgeContent={cartCount} color="secondary">
                            <ShoppingCartIcon/> 
                        </Badge>
                        <label>Cart </label>
                    </span>
                </div>
            </div>
            </div>
        </div>
    )
}
export default withRouter (Header)