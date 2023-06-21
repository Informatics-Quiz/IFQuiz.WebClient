import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	quiz: null,
}

const quizSlice = createSlice({
	name: 'take',
	initialState,
	reducers: {
		setTakingQuiz: (state, action) => {
			state.quiz = action.payload
		},
		setSelectedQuestionId: (state, action) => {
			state.quiz.selectedQuestionId = action.payload
		},
		setSelectedChoiceId: (state, action) => {
			state.quiz.answers[state.quiz.selectedQuestionId].selectedId = action.payload
		},
		setSelectedMultipleChoice: (state, action) => {
			const { handler, selectId } = action.payload
			if (handler === 'select') {
				state.quiz.answers[state.quiz.selectedQuestionId].selectedIds.push(selectId)
			} else if (handler === 'unselect') {
				state.quiz.answers[state.quiz.selectedQuestionId].selectedIds = state.quiz.answers[state.quiz.selectedQuestionId].selectedIds.filter(
					id => id !== selectId
				)
				console.log(state.quiz.answers[state.quiz.selectedQuestionId].selectedIds)
			}
		},
		setFillChoice: (state, action) => {
			state.quiz.answers[state.quiz.selectedQuestionId].matchString = action.payload
		}
	},
})

export default quizSlice.reducer
export const { setTakingQuiz, setSelectedQuestionId, setSelectedChoiceId, setSelectedMultipleChoice, setFillChoice } = quizSlice.actions
