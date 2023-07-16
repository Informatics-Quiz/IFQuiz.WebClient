
import { svgMap } from '../../../../config/constraints';
import './header.css'
export default function SummaryHeader({ svgName, title, description }) {
    
	return (
		<div className="summary__header">
            <div className="summary__title">
			    <div className="summary__image">
                    {svgMap[svgName]}
                </div>
			    <div className="summary__title__text">
                    {title}
                </div>
            </div>
			<div className="summary__description">
                {description}
            </div>
		</div>
	);
}
