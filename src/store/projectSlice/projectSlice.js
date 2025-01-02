import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    isExist: false,
    projectId: null
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjectDetails: (state, action) => {
            console.log("Payload:", action.payload);
            state.isExist = true;
            state.projectId = action.payload
        },
        clearProjectDetails: (state) => {
            state.isExist = false;
            state.projectId = null;
        }
    }
})

export const {
    setProjectDetails,
    clearProjectDetails
} = projectSlice.actions;
export default projectSlice.reducer;