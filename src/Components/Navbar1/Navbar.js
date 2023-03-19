import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md" style={{ backgroundColor: '#161B22' }}>
            <div className="container-fluid p-2">
                <div className="col-7 col-md-10">
                    <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>IF Quiz</Link>
                </div>
                <div className="col-2.5 col-md-1 d-flex justify-content-center">
                    <Link to='/Login' style={{ textDecoration: 'none', color: 'white' }}>Login</Link>
                </div>
                <div className="col-2.5 col-md-1 d-flex justify-content-center" >
                    <Link to='/Signup' style={{ textDecoration: 'none', color: 'white' }}>Signup</Link>
                </div>
            </div>
        </nav >
    )
}

export default Navbar