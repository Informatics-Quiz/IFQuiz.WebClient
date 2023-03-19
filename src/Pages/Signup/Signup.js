import Google from '../../Images/google-logo-9808.png'
import Email from '../../Images/email (3).png'
import { Link } from 'react-router-dom'

const Signup = () => {
	return (
		<div className="ContainerLogin">
			<div className="content">
				<div className="section-1">
					<div className="text-1">
						<div className="col-sm-12 ">
							<p id="text1">Welcome to IF Quiz</p>
							<p id="text2">Create a free in 2 steps</p>
						</div>
					</div>
					<div className="text-2">
						<div className="col-sm-12 col-md-6 col-xl-4">
							<Link
								to=""
								style={{
									textDecoration: 'none',
									color: 'white',
									backgroundColor: '#238636',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: '3px',
								}}
							>
								<img
									src={Google}
									alt="Email logo"
									width={'22.5px'}
									height={'22.5px'}
									style={{ margin: '4px', marginRight: '10px' }}
								></img>
								Signup with Google
							</Link>
						</div>
						<div className="col-sm-12 col-md-6 col-xl-4 mt-2">
							<Link
								to="/Register"
								style={{
									textDecoration: 'none',
									color: 'white',
									backgroundColor: '#238636',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: '3px',
								}}
							>
								<img
									src={Email}
									alt="Email logo"
									width={'25px'}
									height={'25px'}
									style={{ margin: '4px', marginRight: '10px' }}
								></img>
								Signup with Email
							</Link>
						</div>
					</div>
				</div>
				<div className="section-2">
					<p>Already have an account ?</p>
					<Link to={'/Login'}>
						<button>Login</button>
					</Link>
				</div>
			</div>
		</div>
	)
}
export default Signup
