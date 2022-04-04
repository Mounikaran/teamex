import * as api from '../api/index';
import { FETCH_PROJECTS } from '../constants/actionTypes';

export const getProjects = () => async (dispatch) => {
    try {
        const { data } = await api.getAllProjects();
        dispatch({ type: FETCH_PROJECTS, payload: data })
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}