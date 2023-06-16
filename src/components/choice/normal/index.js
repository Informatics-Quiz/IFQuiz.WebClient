import { BsImage, BsTrashFill, BsPlus } from 'react-icons/bs'

export default function NormalChoice({
	choiceType,
	selectedChoices,
	setSelectedChoices,
}) {
	function handleClickChecked(index) {
		const newSelectedChoices = [...selectedChoices]
		newSelectedChoices[index].checked = !newSelectedChoices[index].checked
		setSelectedChoices(newSelectedChoices)
	}

	function handleClickAddChoice() {
		setSelectedChoices([...selectedChoices, { explain: '', checked: false }])
	}

	function handleChangeInput(e, index) {
		const newSelectedChoices = [...selectedChoices]
		newSelectedChoices[index].explain = e.target.value
		setSelectedChoices(newSelectedChoices)
	}

	function handleClickRemoveChoice(index) {
		if (selectedChoices.length === 1) {
			alert('Answer must be at least 1')
			return
		}
		const newSelectedChoices = [...selectedChoices]
		newSelectedChoices.splice(index, 1)
		setSelectedChoices(newSelectedChoices)
	}

	return (
		<div className="flex items-center mt-2">
			{selectedChoices &&
				selectedChoices.map((choice, index) => {
					const condition =
						choiceType === 'single-choice' &&
						selectedChoices.filter((choice) => choice.checked).length >= 1

					return (
						<NormalChoiceCard
							answer={choice.explain}
							disabled={condition && !choice.checked}
							checked={choice.checked}
							handleClickChecked={() => handleClickChecked(index)}
							handleClickRemoveChoice={() => handleClickRemoveChoice(index)}
							handleChangeInput={(e) => handleChangeInput(e, index)}
							key={index}
						/>
					)
				})}
			<div className="ml-4">
				<div
					className="bg-[#161B22] mr-10 p-1. 5 rounded cursor-pointer"
					onClick={handleClickAddChoice}
				>
					<BsPlus className="text-3xl" />
				</div>
			</div>
		</div>
	)
}

function NormalChoiceCard({
	answer,
	disabled,
	checked,
	handleClickChecked,
	handleClickRemoveChoice,
	handleChangeInput,
}) {
	return (
		<div className="flex-col first:ml-0 ml-4">
			<div className="flex justify-between mb-2">
				<div className="flex items-center">
					<div className="p-2 bg-[#161B22] rounded">
						<BsImage />
					</div>
					<input
						type="checkbox"
						className="ml-2 w-7 h-7 rounded accent-[#238636]"
						checked={checked}
						disabled={disabled}
						onChange={handleClickChecked}
					/>
				</div>
				<div
					className="p-2 bg-[#161B22] rounded cursor-pointer"
					onClick={handleClickRemoveChoice}
				>
					<BsTrashFill />
				</div>
			</div>
			<div className="w-[255px] h-[255px] bg-[#161B22] rounded-xl flex items-center justify-center">
				<input
					type="text"
					value={answer}
					className="w-4/5 text-2xl bg-inherit text-center border-none outline-none"
					placeholder="Type an answer..."
					onChange={handleChangeInput}
				/>
			</div>
		</div>
	)
}
