import React, { useState } from 'react';
import { withRouter } from "react-router";
import {Link} from "react-router-dom"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import store from '../redux/store';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Header (props) {
    const [categoryDropDown, setCategoryDropDown] = useState(false)
    const [orderDropDown, setOrderDropDown] = useState(false)

    const wineCategory = (e) =>{
        // e.currentTarget.id

        const id = e.currentTarget.id

        props.filterWines()
        if(id === 1){
            var category = "red"
        } else if(id === 2){
            var category = "white"
        } else{
            var category = "sparkling"
        }

        props.filterWines(category)
        props.history.push(`/wines-categories/${category}`)
    }

    const dropDown = () => {
        
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
            <div className="col-12 col-md-10 productHeader">
            <div className="row">
                <div className="col-12 col-md-6 ">
                    <ul className="filter">
                        <li className="category list-unstyled" onClick={dropDown}>
                            All categories {categoryDropDown ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                        </li>
                        <li className="orderby list-unstyled">
                            Order by {orderDropDown ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                        </li>
                    </ul>

                    {categoryDropDown &&
                    <ul className="category-list" >
                        <li id="1" className="category-list-item" onClick={wineCategory}>Red</li>
                        <li id="2" className="category-list-item" onClick={wineCategory}>White</li>
                        <li id="3" className="category-list-item" onClick={wineCategory}>Spakrling</li>
                    </ul>
                    }

                </div>
                <div className="col-12 col-md-6 text-right cartdiv">
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

export default Header