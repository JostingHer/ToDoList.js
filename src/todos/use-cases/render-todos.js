//RENDERIZAR = VISUALIZAR
import { Todo } from '../models/todo.model';
import { createTodoHtml } from './create-todo-html';


let element;

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementId, todos = []) =>{

    if(!element) element = document.querySelector(elementId);

    if(!element) throw new Error(`element ${elementId} not found`);
  
    element.innerHTML = "";


    //TODO: referencia
    todos.forEach(todo => {
        element.append(createTodoHtml(todo));
    });
    

}