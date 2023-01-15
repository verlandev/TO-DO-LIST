const date$$        = document.querySelector('#date')
const input$$       = document.querySelector('#addTask__input')       
const enterButton$$ = document.querySelector('#EnterButton')         
const ul$$          = document.querySelector('#taskList__ul') 
const check$$       = 'fa-check-circle'
const uncheck$$     = 'fa-circle'
const lineThrough$$ = 'lineThrough'
let   id            = 0
        

function addTask (writtenTask, id, done, remove) {

    if(remove){
        return
    }

    const statusTask = done ? check$$ : uncheck$$
    const styleTask  = done ? lineThrough$$ : ''

    const li$$ = `  <li class="taskList__li" id="taskList__li">
                        <i class="far ${statusTask} taskList__i" data="done" id="${id}"></i>
                        <p class="taskList__p ${styleTask}" id="taskList__p">${writtenTask}</p>
                        <i class=" fas fa-trash de taskList__i" data-="remove" id="${id}"></i>
                    </li>
                 `
    
    ul$$.insertAdjacentHTML('beforeend', li$$)
}

// Función tarea realizada

function taskDone(checkingElement){
    checkingElement.classList.toggle(check$$)
    checkingElement.classList.toggle(uncheck$$)
    checkingElement.parentNode.querySelector('.taskList__p').classList.toggle('taskList__p--lineThrough') 
}

// Función tarea eliminada

function taskRemove(checkingElement){
    checkingElement.querySelector('.addTask').removeChild(checkingElement.parentNode)
}



enterButton$$.addEventListener('click', () => {
    const writtenTask = input$$.value;
    if (writtenTask){
        addTask(writtenTask, id, false, false)
    }
    input$$.value = ''; // con esto nos aseguramos que se limpie el input
    id++
}) 

// enterButton$$.addEventListener('click', addTask) <-- Esto no funciona
// Ejecuta bien la función, pero no entiende que hay que añadir, por
// eso debemos hacer uso de input.value y crear un función de callback
// para asegurarnos que para realizar el eventListener, primero tiene que 
// completar el callback
// que será: que entienda que si el elemento está escrito, se ejecuta el
// evento

document.addEventListener('keyup', function(confirmation){
    if(confirmation.key === 'Enter'){
        const writtenTask = input$$.value;
    if (writtenTask){
        addTask(writtenTask, id, false, false)
    }
    input$$.value = '';
    id++
    }
   
})

ul$$.addEventListener('click', function(checking){
    const checkingElement       = checking.target
    const checkingElementData   = checkingElement.attributes.data.value
    if(checkingElementData === 'done'){
        taskDone(checkingElement)
    } else if (checkingElementData === 'remove'){
        taskRemove(checkingElement)
    }
})