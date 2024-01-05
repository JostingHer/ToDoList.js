import { Todo } from '../todos/models/todo.model'
//+++++++++++ESTADO GLOBAL+++++++++++++++++++++++

export const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos:[
        new Todo('PIEDRA DEL ALMA'),
        new Todo('PIEDRA DEL ALMSA'),
        new Todo('PIEDRA DEL ALMSA'),
        new Todo('PIEDRA DEL cueva'),
    ],
    filter: Filters.All,
}

const initStore = () =>{
    // console.log(state);
    loadStore();
    console.log('iniciando app initstore');
  
}


const loadStore = () =>{
    if(!localStorage.getItem('state')) return;

      // console.log(localStorage.getItem('state')); nos da una cadena
      //para tratarlo como array podemos hacer JSON.parse

      const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') );
      state.todos = todos;
      state.filter = filter;
}

const saveStateToLocalStorage = () => {
    // localStorage.setItem('state', 'hola mundo');
    // console.log(JSON.stringify(state));
    localStorage.setItem('state', JSON.stringify(state));
}



/**
 * 
 * @param {String} filter 
 * @returns All: 'All',
            Completed: 'Completed',
            Pending: 'Pending'
 */
const getTodos = (filter = Filters.All) => {
    switch(filter){
        case Filters.All: 
            return [...state.todos];
        case Filters.Completed: 
            return state.todos.filter(todo => todo.done);
        case Filters.Pending: 
            return state.todos.filter(todo => !todo.done);
        default: 
            throw new Error(`option ${filter} is not valid`);    
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description) => {
    if(!description) throw new Error('NO HAS PUESTO DESCRIPCION');

    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
}
/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    });
    saveStateToLocalStorage();

}

/**
 * 
 * @param {string} todoId 
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id != todoId);
    saveStateToLocalStorage();

}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();

}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All)=>{
    state.filter = newFilter;
    saveStateToLocalStorage();

}

const getCurrentFilter = () =>{
   return state.filter;
}









export default {
    initStore,
    loadStore ,
    addTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
    getTodos,
    toggleTodo,
}