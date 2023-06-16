import { BsPlus, BsTrashFill } from 'react-icons/bs'

export default function FillBlankChoice({ selectedFillBlankChoice, setSelectedFillBlankChoice }) {
	const handleAddFillBlankChoice = () => {
		setSelectedFillBlankChoice([
			...selectedFillBlankChoice,
			{
				type: 'is-exactly',
				matchString: [],
			},
		])
	}

	const handleRemoveFillBlankChoice = (index) => {
		if (selectedFillBlankChoice.length === 1) {
			alert('Answer must be at least 1')
			return
		}
		const newSelectedFillBlankChoice = [...selectedFillBlankChoice]
		newSelectedFillBlankChoice.splice(index, 1)
		setSelectedFillBlankChoice(newSelectedFillBlankChoice)
	}

	const handleChangeFillBlankChoice = (e, index) => {
		const { name, value } = e.target
		const newSelectedFillBlankChoice = [...selectedFillBlankChoice]
		switch (name) {
			case 'type':
				newSelectedFillBlankChoice[index].type = value
				break
			case 'matchString':
				newSelectedFillBlankChoice[index].matchString = value.split(' ')
				break
			default:
				break
		}
		setSelectedFillBlankChoice(newSelectedFillBlankChoice)
	}

	return (
		<div className="flex-1 flex-col my-2 w-max mx-auto">
			{selectedFillBlankChoice.map(({ type, matchString }, index) => (
				<div className="flex justify-center my-3" key={index}>
					<select
						defaultValue={type}
						className="border p-1.5 rounded text-slate-300 bg-[#010409]"
						name="type"
						onChange={(e) => handleChangeFillBlankChoice(e, index)}
					>
						<option value={'is-exactly'}>Is Exactly</option>
						<option value={'contains'}>Contains</option>
					</select>
					<input
						type="text"
						value={matchString.join(' ')}
						name="matchString"
						onChange={(e) => handleChangeFillBlankChoice(e, index)}
						placeholder="Type an answer..."
						className="bg-[#161B22] py-2 px-3 mx-2 rounded border-none outline-none min-w-[350px]"
					/>
					<div
						className="flex items-center justify-center px-1.5 cursor-pointer rounded bg-[#161B22]"
						onClick={() => handleRemoveFillBlankChoice(index)}
					>
						<BsTrashFill className="text-xl" />
					</div>
				</div>
			))}

			<div className="flex justify-end">
				<div className="bg-[#161B22] mr-10 p-1. 5 rounded cursor-pointer" onClick={handleAddFillBlankChoice}>
					<BsPlus className="text-3xl" />
				</div>
			</div>
		</div>
	)
}
