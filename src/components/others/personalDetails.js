import React, {useState} from 'react';
import {connect} from "react-redux"
import {withRouter} from "react-router"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Alert from '@material-ui/lab/Alert';
import {ordersAction,checkoutRequiredInfo} from "../redux/actions/actions";
import {Link} from "react-router-dom"


const modalStyles =() =>{
   
    const top = 50 ;
    const left = 50 ;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function PersonalDetails(props) {

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(modalStyles);
  
  const [state, setstate] = useState({
      fullname : "",
      estate : "",
      phonenumber : "",
      address : "",
      order_notes : "",
      showSuccess : false,
      hideAlert : false,
  })

  const handleInput = (e) =>{
      const {name, value} = e.target
      setstate({
          ...state,
          [name] : value
      })
  }

  const handleSubmit = e =>{
      e.preventDefault();

      setstate({
          ... state,
          showSuccess : true,
          hideAlert : true
      })

      const userInfo = {
            name : fullname,
            estate : estate,
            phone: phonenumber,
            address : address,
            orderno: 123456
        }

      props.ordersAction(props.cartItem)
      props.checkoutRequiredInfo(userInfo)
  }

    const goToOrders = () => {
        setstate({
            ...state,
            showSuccess: false,
        })
        props.history.push("/orders")
    }

  const hide = () =>{
      setstate({
          ... state,
        hideAlert : false,
      })
  }
    const {fullname, address,phonenumber,estate, showSuccess, hideAlert} = state

    const deliverynot = [
        {
            name : fullname,
            estate : estate,
            phone: phonenumber,
            address : address,
            orderno: 123456
        }
    ]
  const body = (
    <div style={modalStyle} xs={12} md={6} className={classes.paper}>
    {!showSuccess ?
      <form onSubmit={handleSubmit} className="checkoutForm row ">
        <div className="col-12 nopadding">
            <h6><b>Please fill in the detail to continue</b></h6>
        </div>
        <hr className="col-12 line"/>
        <input text="text" required className="col-12" name="fullname" value={fullname} onChange={handleInput} placeholder="Enter fullname"/>
       
        <input text="text" required className="col-12" name="estate" value={estate} onChange={handleInput} placeholder="Enter estate"/>
       
        <input text="text" required className="col-12" name="phonenumber" value={phonenumber} onChange={handleInput} placeholder="Enter your phone number"/>
        
        <input text="text" required className="col-12" name="address" value={address} onChange={handleInput} placeholder="Enter your address"/>
       
        <button className="col-12" >CHECKOUT</button>
        </form>
        :
        
        <div className="col-12 ordernote checkoutForm">
            <div className="row">
                {hideAlert &&
                    <Alert severity="success" className="alert" onClick={hide}>Thank you for shopping wiht us!</Alert>
                }
                <h6><b>Check your delivery information :</b></h6>
        
                {deliverynot.map((d,i) =>
                <div className="col-12 deliverInfo">
                    <p key={i}>Order name : <b>{d.name}</b></p>
                    <p key={i}>Address : <b>{d.address}</b></p>
                    <p key={i}>Your phone number : <b>{d.phone}</b></p>
                    <p key={i}>Your estate : <b>{d.estate}</b></p>
                    <br/>

                    Order no : {d.orderno}
                    <br/>
                    <small>For more information about the order <Link to="/orders">go to orders</Link></small>
                </div>
                )}
            </div>
            <div className="row">
                <button className="col-12" onClick={goToOrders}>Okay</button>
            </div>
            </div>
            }
        <br/>
    </div>
  );

  return (
    <div className="row">
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
} 

const mapStateToProps = (state) =>({
    orders : state.orders.orders
})
    

export default withRouter(connect(mapStateToProps, {ordersAction,checkoutRequiredInfo})(PersonalDetails))