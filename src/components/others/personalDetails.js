import React, {useState} from 'react';
import {connect} from "react-redux"
import {withRouter} from "react-router"
import Modal from '@material-ui/core/Modal';
import Alert from '@material-ui/lab/Alert';
import {ordersAction,checkoutRequiredInfo, emptyCart} from "../redux/actions/actions";
import {Link} from "react-router-dom"

function PersonalDetails(props) {

  // getModalStyle is not a pure function, we roll the style only on the first render
  
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
          ...state,
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
      
      props.emptyCart(props.cartItem.name)
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
          ...state,
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
    
    console.log(props.open)
    
  const body = (
    <div className="checkoutDetails row justify-content-center h-100">
    {!showSuccess ?
      <div className="col-12 col-md-4 my-auto">
      <form onSubmit={handleSubmit} className="checkoutForm ">
        <div className="col-12 nopadding">
            <h6><b>Please fill in the detail to continue</b></h6>
        </div>
        <hr className="col-12 line"/>
        <input 
          text="text" 
          required 
          className="col-12" 
          name="fullname" 
          value={state.fullname} 
          onChange={handleInput} 
          placeholder="Enter fullname"/>
       
        <input 
          text="text" 
          required 
          className="col-12" 
          name="estate" 
          value={state.estate} 
          onChange={handleInput} 
          placeholder="Enter estate"
        />
       
        <input 
          text="text" 
          required 
          className="col-12" 
          name="phonenumber" 
          value={state.phonenumber} 
          onChange={handleInput} 
          placeholder="Enter your phone number"
          />
        
        <input 
          text="text" 
          required 
          className="col-12" 
          name="address" 
          value={state.address} 
          onChange={handleInput} 
          placeholder="Enter your address"
        />
       
        <button className="col-12" >CHECKOUT</button>
        </form>
        </div>
        :
        
        <div className="col-12 col-md-4 ordernote checkoutForm my-auto">
            <div className="row">
                {hideAlert &&
                    <Alert severity="success" className="alert" onClick={hide}>Thank you for shopping wiht us!</Alert>
                }
                <h6><b>Check your delivery information :</b></h6>
        
                {deliverynot.map((d,i) =>
                <div className="col-12 deliverInfo" key={i}>
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
    

export default withRouter(connect(mapStateToProps, {ordersAction,emptyCart, checkoutRequiredInfo})(PersonalDetails))