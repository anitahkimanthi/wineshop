import { fetchWines } from "../redux/actions/actions";
import {connect} from "react-redux";

const Wines = (props) =>{
    return(
        <div>
            {props.wines}
        </div>
    )
}
 
const mapStateToProps = (state) =>({
    wines: state.allWines
})

export default connect(mapStateToProps, {fetchWines})(Wines)