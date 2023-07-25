import "./action.sum.button.css";
export default function ActionSumButton({ text, onClick }) {
	return (
		<button className="action_sum_button">
			{text}
		</button>
	);
}
