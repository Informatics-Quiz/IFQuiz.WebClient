import './style.css'

export default function QuizCard({ name, owner, numberOfTasks }) {
	return (
		<div className="quiz-card-container">
			<div className="quiz-card-image-container">
				<img
					src="https://img.freepik.com/free-vector/wild-nature-exploring-banner-template_23-2148943835.jpg"
					alt="quiz"
				></img>
			</div>
			<div className="quiz-card-content">
				<h5>{name}</h5>
				<p>By : {owner || '-'}</p>
				<span>{numberOfTasks} Tasks</span>
			</div>
		</div>
	)
}
