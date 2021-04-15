import React, { useState } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import store from '../redux/store';

function Header (props) {
    const [open, setOPen] = useState(false)

    const wineCategory = (e) =>{
        // e.currentTarget.id
    }

    const dropDown = () => {
        
    }

    const goToCart = () =>{
        props.history.push("/cart")
    }

    const cartCount = store.getState().cart.cartproducts.length
    console.log(cartCount)

    return(
        <div className="row justify-content-center">
            <div className="col-12 col-md-10">
                <div className="row">
                    <div className="col-12 text-center">
                        <h3 className="brand"><b>WineShop</b></h3>
                        <small>wineshop.com</small>
                    </div>
                </div>
            </div>
            <hr className="col-12"/>
            <div className="col-12 col-md-10 productHeader">
            <div className="row">
                <div className="col-12 col-md-6 ">
                    <ul className="filter">
                        <li className="category list-unstyled" onClick={dropDown}>
                            All categories
                        </li>
                        <li className="orderby list-unstyled">
                            Order by
                        </li>
                    </ul>

                    {open &&
                    <ul className="category-list" >
                        <li id="Red" className="category-list-item" onClick={wineCategory}>Red</li>
                        <li id="whine" className="category-list-item" onClick={wineCategory}>White</li>
                        <li id="Spakrling" className="category-list-item" onClick={wineCategory}>Spakrling</li>
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