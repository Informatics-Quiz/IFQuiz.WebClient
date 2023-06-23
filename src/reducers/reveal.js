import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quiz: null,
    answers: null,
    selectedId: null
}

const revealSlice = createSlice({
    name: 'reveal',
    initialState,
    reducers: {
        setReveal: (state, action) => {
            const {quiz, answers} = action.payload
            state.quiz = quiz
            state.answers = answers
        },
        setSelectedRevealQuestionId: (state, action) => {
            state.selectedId = action.payload
        }
    }
})

export default revealSlice.reducer
export const { setReveal, setSelectedRevealQuestionId } = revealSlice.actions