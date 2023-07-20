import './user.value.css'
export default function UserValue({ fullname, profileUrl, value }) {

	return (
		<div className="profile_value_box">
			<div className="profile_value_box_image">
				<img
					src={profileUrl}
					alt="ProfileImage"
				/>
			</div>
			<div className="profile_value_box_content">
				<div className="profile_value_box_content_name">
					{fullname}
				</div>
				<div className="profile_value_box_content_value">{value}</div>
			</div>
		</div>
	);
}
