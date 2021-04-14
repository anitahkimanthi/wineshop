import { fetchWines } from "../redux/actions/allactions";
import {connect} from "react-redux";

const Wines = (props) =>{
    return(
        <div>
            {props.wines}
        </div>
    )
}
 
const mapStateToProps = (state) =>({
    wines: state.wineData.wines
})

export default connect(mapStateToProps, {fetchWines})(Wines)