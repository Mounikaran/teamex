import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/' });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const signIn = (profile) => API.post('/user/signin', profile);
export const signUp = (profile) => API.post('/user/signup', profile);
export const microsoftSignup = (profile) => API.post('/user/microsoftsignup', profile);

export const fetchEvent = (id) => API.get(`/events/${id}`);
export const fetchEventByCreatorIdDate = (date) => API.get(`/events/${date}/getEvent`);
export const fetchEvents = () => API.get('/events');
export const createEvent = (newEvent) => API.post('/events', newEvent);
export const updateEvent = (id, event) => API.patch(`/events/${id}`, event);
export const updateEventByCreatorIdDate = (date, event) => API.patch(`/events/${date}/updateEvent`, event);
export const deleteEvent = (id) => API.delete(`/events/${id}`);
export const deleteEventByCreatorIdDate = (date) => API.delete(`/events/${date}/delEvent`);

export const getUsers = () => API.get('/users');
export const getUsersBySearch = (searchQuery) => API.get(`/users/search?searchQuery=${searchQuery}`);

export const sendMessage = (message, id) => API.post(`/events/${id}/eventMsg`, message);

export const fetchConversations = () => API.get('/conversations');
export const fetchConversation = (id) => API.get(`/conversations/${id}`);
export const updateConversation = (value, id) => API.patch(`/conversations/message/${id}`, value);
export const createConversation = (newConversation) => API.post('/conversations/conversation', newConversation);

// projects API urls
export const getAllProjects = () => API.get('/projects');
export const getProjectById = (id)=> API.get(`/projects/project/${id}`);
export const createProject = (newProject) => API.post('/projects/project', newProject);
export const updateProject = (id, project) => API.post(`/projects/project/${id}`, project);
export const deleteProject = (id) => API.delete(`/projects/project/${id}`);

// tasks API urls
export const getTaskById = (id) => API.get(`/tasks/task/${id}`);
export const filterTasks = (fields) => API.post(`/tasks/filter`, fields);

export const updateTask = (id, task) => API.post(`/tasks/task/${id}`, task);
export const createTask = (newTask) => API.post('/tasks/task', newTask);
export const deleteTask = (id) => API.delete(`/tasks/task/${id}`);

export const fetchTaskStausList = () => API.get('/tasks/status');
