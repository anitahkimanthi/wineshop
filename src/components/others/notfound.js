import { Link } from "react-router-dom"

const Error = () => {
    return(
        <div className="row justify-content-center">
            <div className="col-12 text-center">
                <h1>404</h1>
                <p>Ooops, the page you are looking for is not found<Link to="/"> go home</Link></p>
            </div>
        </div>
    )
}

export default Error