import { svgMap } from '../../../../config/constraints';
import './instructor.css'
export default function Instructor({  svgName, color, description }) {
	return (
		<div className="instructor__item">
			<div className="instructor__svg" style={{background: color}}>
				{svgMap[svgName]}
			</div>
			<div className="instructor__description">
                {description}
            </div>
		</div>
	);
}
