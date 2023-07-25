import './profile.detail.css'
export default function ProfileDetail({user}) {
    return (
        <div className="prof_detail">
            <div className="prof_image">
                <img src={user.profileUrl} alt="ProfImage" />
            </div>
            <div className="prof_content">
                <div className="prof_content_fullname">
                    {user.fullname}
                </div>
                <div className="prof_content_email">
                    {user.email}
                </div>
            </div>
        </div>

    )
}
