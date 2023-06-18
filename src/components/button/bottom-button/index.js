import { svgMap } from "../../../config/constraints";

export default function BottomButton({svgName, position, cb}){
    
    return (
        <button
          className={position === 'left' ? "back__home__button" : "back__home__button__right"}
          onClick={cb}
        >
          {svgMap[svgName]}
          <p>Home</p>
        </button>
    )
}