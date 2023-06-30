import { useEffect, useState } from "react";
import "./style.css";
import { current } from "@reduxjs/toolkit";
export default function DatePicker({
	show,
	quizId,
	setHandler,
	showNotify,
	deployHandler,
}) {
	const [currentTime, setCurrentTime] = useState(getCurrentTime());
	const [currentDate, setCurrentDate] = useState(getCurrentDate());

	useEffect(() => {
		const interval = setInterval(() => {
			validateSelectedTime();
		}, 1000); // Check every second

		return () => {
			clearInterval(interval);
		};
	}, [currentTime]);

	// Function to get the current date in the format yyyy-MM-dd
	function getCurrentDate() {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, "0");
		const day = String(now.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	// Function to handle date change
	function handleDateChange(element) {
		const startDate = element.target.value;
		const start = new Date(startDate);
		const now = new Date();
		now.setHours(0, 0, 0, 0);

		if (start < now) {
			showNotify(
				"time_up",
				"Are you from the future?",
				"Please select a future or present date"
			);
			return;
		}

		setCurrentDate(element.target.value);
	}

	// Function to get the current time in the format HH:mm
	function getCurrentTime() {
		const now = new Date();
		const hours = String(now.getHours()).padStart(2, "0");
		const minutes = String(now.getMinutes()).padStart(2, "0");
		return `${hours}:${minutes}`;
	}

	function handleTimeChange(e) {
		const selectedTime = e.target.value;
		const selectedDate = new Date(currentDate);
		const now = new Date();

		if (selectedDate.toDateString() === now.toDateString()) {
			// Present day is selected
			const selectedDateTime = new Date(`${currentDate}T${selectedTime}`);
			if (selectedDateTime < now) {
				showNotify(
					"time_up",
					"Are you from the future?",
					"Please select a hour in the future or pesent"
				);
				// Handle the validation error
				return;
			}
		}

		setCurrentTime(selectedTime);
	}

	function validateSelectedTime() {
		const selectedDate = new Date(currentDate);
		const now = new Date();

		if (selectedDate.toDateString() === now.toDateString()) {
			// Present day is selected
			const selectedDateTime = new Date(`${currentDate}T${currentTime}`);
			if (selectedDateTime < now) {
				setCurrentTime(now.toTimeString().slice(0, 5)); // Set the current time
			}
		}
	}

	return show ? (
		<>
			<div
				className="bg-focus"
				onClick={() => {
					setHandler((current) => {
						return { ...current, show: false, quizId: null };
					});
				}}
			></div>
			<div className="date-picker-container">
				<div className="date-period-content">
					<div className="input__with__label">
						<p>Date</p>
						<input
							type="date"
							defaultValue={currentDate}
							onChange={handleDateChange}
							value={currentDate}
						/>
					</div>
					<div className="input__with__label">
						<p>Time</p>
						<input
							type="time"
							defaultValue={currentTime}
							value={currentTime}
							min={currentTime}
							max="23:59"
							onChange={handleTimeChange}
						/>
					</div>
				</div>
				<div className="date-confirm-content">
					<button
						className="picker-button active-button margin-right-8px"
						onClick={() => {
							deployHandler({
								quizId: quizId,
								date: currentDate,
								time: currentTime,
							});
						}}
					>
						Deploy
					</button>
					<button
						className="picker-button unactive-button"
						onClick={() => {
							setHandler((current) => {
								return {
									...current,
									show: false,
									quizId: null,
								};
							});
						}}
					>
						Close
					</button>
				</div>
			</div>
		</>
	) : null;
}
