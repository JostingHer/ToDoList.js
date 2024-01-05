import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending  } from './use-cases';

const ElementIDs = {
    ClearCompletedButton: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count'
    // deleteLI: '.destroy'
}
 
/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCountLabel);
    }


    //cuando la funcion app() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);   
        displayTodos();
    })();


    //refencias html
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const TodoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompleteButton = document.querySelector(ElementIDs.ClearCompletedButton);
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);


    // const deleteLI = document.querySelectorAll(ElementsIDS.deleteLI);

    newDescriptionInput.addEventListener('keyup', (event) => {
        // console.log(e.target.value)

        if(event.keyCode !== 13) return;
        if(event.target.value.trim().length === 0) return;
        
        todoStore.addTodo(event.target.value);
        
        displayTodos();
        event.target.value = '';
    });

    TodoListUL.addEventListener('click', (event) =>{
        //console.log(event.target);
        //con esta sintaxis buscamos al elemento padre mas cercano con ese atributo = '[data-id]'
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    })

    TodoListUL.addEventListener('click', (event) =>{
         const isDestroyElement = event.target.className === 'destroy';
         const element = event.target.closest('[data-id]');
       
         if(!element || !isDestroyElement) return;
        
         todoStore.deleteTodo(element.getAttribute('data-id'));
         displayTodos();
    })

    clearCompleteButton.addEventListener('click', () =>{
        todoStore.deleteCompleted();
        displayTodos();
    })


    filtersLIs.forEach( element => {

        element.addEventListener('click', (element) => {
            filtersLIs.forEach( el => el.classList.remove('selected') );
            element.target.classList.add('selected');

            // console.log(element.target.getAttribute('id'));
            switch( element.target.getAttribute('id') ){
                case 'Todos':
                    todoStore.setFilter( Filters.All )
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending )
                break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed )
                break;
            }

            displayTodos();

        });


    });

    
    //con forEach() a cada deleteLI
    // deleteLI.addEventListener('click', (event) => {
    //     const element = event.target.closest('[data-id]');
    //     todoStore.deleteTodo(element.getAttribute('data-id'));
    //     displayTodos(); 
    // })
} 