import { svgMap } from "../../config/constraints";


export function ActivityHeader({svg, label}) {

    return (
        <div className="activity__header__container">
            <div className="img">
                {svgMap[svg]}
            </div>
            <div className="label">
              {label}
            </div>
        </div>
    )
}