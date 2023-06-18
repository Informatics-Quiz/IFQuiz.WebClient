import { svgMap } from "../../../config/constraints";

export default function HomeButton({navigate}){
    return (
        <button
          className="back__home__button"
          onClick={() => navigate("/home")}
        >
          {svgMap.home}
          <p>Home</p>
        </button>
    )
}