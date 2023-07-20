import { svgMap } from '../../../../config/constraints';
import Instructor from '../instructor/instructor';
import './analysis.percent.css';
import '../title.value/title.value.css'

export default function AnalysisPercent({ name, description , values }) {
	return (
		<div className="avg-prog-left-content">
			<div className="average_item">
				<div className="avg_header">
					<div className="avg_header_title">{name}</div>
				</div>
			</div>
			<div className="avg-pass-instructor">
                <Instructor color={values[0].color} description={values[0].description} />
                <Instructor color={values[1].color} description={values[1].description} />
			</div>
			<div className="progress-bar-percent">
				<div className="prog-per-left-side" style={{width: values[0].percent}}>{values[0].percent}</div>
				<div className="prog-per-right-side" style={{width: values[1].percent}}>{values[1].percent}</div>
			</div>
		</div>
	);
}
