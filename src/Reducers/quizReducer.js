import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	current: null,
}

const quizSlice = createSlice({
	name: 'quiz',
	initialState,
	reducers: {
		setCurrentQuiz: (state, action) => {
			state.current = action.payload
		},
	},
})

export default quizSlice.reducer
export const { setCurrentQuiz } = quizSlice.actions
