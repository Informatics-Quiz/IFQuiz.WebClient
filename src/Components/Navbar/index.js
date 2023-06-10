import { FaHome } from "react-icons/fa";
import { TbRotateClockwise2 } from "react-icons/tb";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Reducers/userReducer";
import { MdLogout } from "react-icons/md";

const Navbar2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated =
    useSelector((state) => state.user.authUser) === null ? false : true;

  function handleClickLogout() {
    dispatch(setUser(null));
    navigate("/");
  }

  if (window.location.pathname === "/Quiz/Take") return null;

  return (
    <nav
      className="navbar navbar-expand-md"
      style={{ backgroundColor: "#161B22" }}
    >
      {isAuthenticated ? (
        <div className="container-fluid py-2 px-4">
          <div className="d-flex align-items-center">
            <Link
              to="/Home"
              className="d-flex align-items-center mx-2"
              style={{ textDecoration: "none", color: "white" }}
            >
              <svg
                width="15"
                height="12"
                viewBox="0 0 30 27"
                fill="none"
              >
                <g clip-path="url(#clip0_57_170)">
                  <path
                    d="M29.9896 13.3073C29.9896 14.2448 29.2083 14.9792 28.3229 14.9792H26.6562L26.6927 23.3229C26.6927 23.4635 26.6823 23.6042 26.6667 23.7448V24.5833C26.6667 25.7344 25.7344 26.6667 24.5833 26.6667H23.75C23.6927 26.6667 23.6354 26.6667 23.5781 26.6615C23.5052 26.6667 23.4323 26.6667 23.3594 26.6667H21.6667H20.4167C19.2656 26.6667 18.3333 25.7344 18.3333 24.5833V23.3333V20C18.3333 19.0781 17.5885 18.3333 16.6667 18.3333H13.3333C12.4115 18.3333 11.6667 19.0781 11.6667 20V23.3333V24.5833C11.6667 25.7344 10.7344 26.6667 9.58333 26.6667H8.33333H6.67188C6.59375 26.6667 6.51562 26.6615 6.4375 26.6562C6.375 26.6615 6.3125 26.6667 6.25 26.6667H5.41667C4.26562 26.6667 3.33333 25.7344 3.33333 24.5833V18.75C3.33333 18.7031 3.33333 18.651 3.33854 18.6042V14.9792H1.66667C0.729167 14.9792 0 14.25 0 13.3073C0 12.8385 0.15625 12.4219 0.520833 12.0573L13.875 0.416667C14.2396 0.0520833 14.6562 0 15.0208 0C15.3854 0 15.8021 0.104167 16.1146 0.364583L29.4167 12.0573C29.8333 12.4219 30.0417 12.8385 29.9896 13.3073Z"
                    fill="#C9D1D9"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_57_170">
                    <rect width="30" height="26.6667" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <button className="mx-xl-1">Home</button>
            </Link>
            <div className="d-flex align-items-center mx-2">
              {/* <TbRotateClockwise2 /> */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 25 25"
                fill="none"
              >
                <g clip-path="url(#clip0_57_162)">
                  <path
                    d="M3.66211 3.66211L2.00195 2.00195C1.26465 1.26465 0 1.78711 0 2.82715V8.20312C0 8.85254 0.522461 9.375 1.17188 9.375H6.54785C7.59277 9.375 8.11523 8.11035 7.37793 7.37305L5.87402 5.86914C7.56836 4.1748 9.91211 3.125 12.5 3.125C17.6758 3.125 21.875 7.32422 21.875 12.5C21.875 17.6758 17.6758 21.875 12.5 21.875C10.5078 21.875 8.66211 21.2549 7.14355 20.1953C6.43555 19.7021 5.46387 19.873 4.96582 20.5811C4.46777 21.2891 4.64355 22.2607 5.35156 22.7588C7.38281 24.1699 9.84863 25 12.5 25C19.4043 25 25 19.4043 25 12.5C25 5.5957 19.4043 0 12.5 0C9.04785 0 5.92285 1.40137 3.66211 3.66211ZM12.5 6.25C11.8506 6.25 11.3281 6.77246 11.3281 7.42188V12.5C11.3281 12.8125 11.4502 13.1104 11.6699 13.3301L15.1855 16.8457C15.6445 17.3047 16.3867 17.3047 16.8408 16.8457C17.2949 16.3867 17.2998 15.6445 16.8408 15.1904L13.667 12.0166V7.42188C13.667 6.77246 13.1445 6.25 12.4951 6.25H12.5Z"
                    fill="#C9D1D9"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_57_162">
                    <rect width="25" height="25" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <button className="mx-xl-1">Activity</button>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <MdLogout />
            <button onClick={handleClickLogout} className="mx-xl-1">
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="container-fluid py-2 px-4">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            IF Quiz
          </Link>
          <div className="d-flex align-items-center">
            <Link
              to="/Login"
              className="mx-2"
              style={{ textDecoration: "none", color: "white" }}
            >
              Login
            </Link>
            <Link
              to="/Signup"
              className="mx-2"
              style={{ textDecoration: "none", color: "white" }}
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar2;
