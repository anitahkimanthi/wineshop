import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { List,ListItem, ListItemText } from '@material-ui/core';

const header = () =>{
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
                        <li className="category list-unstyled">
                            All categories
                        </li>
                        <li className="orderby list-unstyled">
                            Order by
                        </li>
                    </ul>

                </div>
                <div className="col-12 col-md-6 text-right cartdiv">
                    <span className="cart">
                        <Badge badgeContent={4} color="secondary">
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

export default header