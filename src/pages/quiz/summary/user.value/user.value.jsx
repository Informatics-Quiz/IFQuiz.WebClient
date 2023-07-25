import './user.value.css'
export default function UserValue({ user, fullname, profileUrl, value }) {
	return user ? (
		<div className="profile_value_box">
			<div className="profile_value_box_image">
				<img
					src={user.user.imageUrl}
					alt="ProfileImage"
				/>
			</div>
			<div className="profile_value_box_content">
				<div className="profile_value_box_content_name">
					{user.user.fullname}
				</div>
				<div className="profile_value_box_content_value">{user.score}</div>
			</div>
		</div>
	) : (
		<div className="profile_value_box">
			<div className='anm_user_cant_analysis'>
				Participants have less than 2 users. <br/>
				Can't analysis.
			</div>
		</div>
	)
}
