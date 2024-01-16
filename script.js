let DAYS_TASKS = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
}

let HISTORY_TASKS = []

const taskBlocks = document.querySelectorAll('.tasks__block')
const dayBlocks = document.querySelectorAll('[data-day]')
const modal = document.querySelector('.modal')
const taskHistoryBlock = document.querySelector('.tasks-history__content')

window.addEventListener('load', () => {
    DAYS_TASKS = JSON.parse(localStorage.getItem('tasks'))
    HISTORY_TASKS = JSON.parse(localStorage.getItem('history'))

    if(HISTORY_TASKS !== null) generateHistoryTasks()
    else {
        HISTORY_TASKS = []
    }

    if(DAYS_TASKS !== null) generateDayTasks()
    else{
        DAYS_TASKS = {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
        }
    }
})

window.addEventListener('click', e => {
    if(e.target.id == 'add') addTask()
    if(e.target.id == 'tasks-block-show') openDayPage(e.target.parentElement)
    if(e.target.id == 'close') closeModal(e.target.closest('.modal'))
    if(e.target.id == 'remove') removeItems(e.target.parentElement)
    if(e.target.id == 'remove-history-item') removeHistoryItems(e.target.parentElement.parentElement)
    if(e.target.id == 'clear') clearAll()
    if(e.target.id == 'add-history-task') addToDayTask(e.target.parentElement)

})

function removeHistoryItems(item){
    const id = item.dataset['id']
    count = 0
    for(let el in HISTORY_TASKS){
        if(HISTORY_TASKS[el].id == id) HISTORY_TASKS.splice(count, 1)
        count += 1
    }
    localStorage.setItem('history', JSON.stringify(HISTORY_TASKS))
    generateHistoryTasks()
}

function generateHistoryTasks (){
    if(HISTORY_TASKS.length == 0) taskHistoryBlock.innerHTML = '<div class="empty">EMPTY</div>'
    else{
        taskHistoryBlock.innerHTML = ''
    }
    for(let i = 0; i < HISTORY_TASKS.length; i++){
        taskHistoryBlock.innerHTML += `
        <div data-id='${HISTORY_TASKS[i].id}' class='task__options'>
            <div class='task__options__text'>
                <h3 id='time'>${HISTORY_TASKS[i].time}</h3>
                <div>
                    <select>
                        <option>--CHOOSE-DAY---</option>
                        <option data-select='monday'>MONDAY</option>
                        <option data-select='tuesday'>TUESDAY</option>
                        <option data-select='wednesday'>WEDNESDAY</option>
                        <option data-select='thursday'>THURSDAY</option>
                        <option data-select='friday'>FRIDAY</option>
                        <option data-select='saturday'>SATURDAY</option>
                        <option data-select='sunday'>SUNDAY</option>
                    </select>
                    <button class='add two' id='add-history-task'>ADD</button>
                </div>
                <i id='remove-history-item' class="fa-solid fa-xmark"></i>
            </div>
            <p id='task'>${HISTORY_TASKS[i].task}</p>
        </div>
    `
    }
}

window.addEventListener('change', e => {
    const item = e.target.parentElement.parentElement.parentElement.dataset['id']
    const taskHistoryBlockItems = taskHistoryBlock.querySelectorAll('.task__options')
    taskHistoryBlockItems.forEach(task => {
        if(task.dataset['id'] == item){
            const btn = task.querySelector('.add.two')
            btn.classList.add('active')
        }
    })
})

function addToDayTask(item){
    item = item.parentElement.parentElement
    const checkedDay = item.querySelector('[data-select]:checked').dataset['select']
    const id = item.dataset['id']
    const taskName = item.querySelector('#task').textContent
    const taskTime = item.querySelector('#time').textContent
    let timeArr = taskTime.split('').map(el => {
        if(el == ':') return el = '.'
        return el
    }).join('')
    timeArr = parseFloat(timeArr)

    let count = 0
    for(let i = 0; i < HISTORY_TASKS.length; i++){
        if(HISTORY_TASKS[i].id == id) {
            switch(checkedDay){
                case 'monday':
                    addTaskToStorage(taskName, taskTime, DAYS_TASKS.monday, timeArr)
                    HISTORY_TASKS.splice(count, 1)
                    break;
                case 'tuesday':
                    addTaskToStorage(taskName, taskTime, DAYS_TASKS.tuesday, timeArr)
                    HISTORY_TASKS.splice(count, 1)
                    break;
                case 'wednesday':
                    addTaskToStorage(taskName, taskTime, DAYS_TASKS.wednesday, timeArr)
                    HISTORY_TASKS.splice(count, 1)
                    break;
                case 'thursday':
                    addTaskToStorage(taskName, taskTime, DAYS_TASKS.thursday, timeArr)
                    HISTORY_TASKS.splice(count, 1)
                    break;
                case 'friday':
                    addTaskToStorage(taskName, taskTime, DAYS_TASKS.friday, timeArr)
                    HISTORY_TASKS.splice(count, 1)
                    break;
                case 'saturday':
                    addTaskToStorage(taskName, taskTime, DAYS_TASKS.saturday, timeArr)
                    HISTORY_TASKS.splice(count, 1)
                    break;
                case 'sunday':
                    addTaskToStorage(taskName, taskTime, DAYS_TASKS.sunday, timeArr)
                    HISTORY_TASKS.splice(count, 1)
                    break;
                default: break;
            }
        }
        count += 1
    }

    localStorage.setItem('history', JSON.stringify(HISTORY_TASKS))
    generateHistoryTasks()
}


function clearAll(){
    DAYS_TASKS = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    }
    localStorage.setItem('tasks', JSON.stringify(DAYS_TASKS))
    generateDayTasks()
    HISTORY_TASKS = []
    localStorage.setItem('history', JSON.stringify(HISTORY_TASKS))
    generateHistoryTasks()
}

function removeItems(item){
    const id = item.dataset['id']
    const parent = item.closest('.modal-content');
    const h1 = parent.querySelector('h1').textContent.toLowerCase();
    item.parentElement.removeChild(item)

    switch(h1){
        case 'monday':
                removeItem(DAYS_TASKS.monday, id)
                break;
            case 'tuesday':
                removeItem(DAYS_TASKS.tuesday, id)
                break;
            case 'wednesday':
                removeItem(DAYS_TASKS.wednesday, id)
                break;
            case 'thursday':
                removeItem(DAYS_TASKS.thursday, id)
                break;
            case 'friday':
                removeItem(DAYS_TASKS.friday, id)
                break;
            case 'saturday':
                removeItem(DAYS_TASKS.saturday, id)
                break;
            case 'sunday':
                removeItem(DAYS_TASKS.sunday, id)
                break;
            default: break;
    }
    generateDayTasks()
}

function removeItem (day, id){
    count = 0
    for(let el in day){
        if(day[el].id == id) day.splice(count, 1)
        count += 1
    }
    localStorage.setItem('tasks', JSON.stringify(DAYS_TASKS))
}

function addTask (){
    let checkedDays = document.querySelectorAll('[data-check]:checked')
    let taskName = document.querySelector('#task').value
    let taskTime = document.querySelector('#time').value
    let timeArr = taskTime.split('').map(el => {
        if(el == ':') return el = '.'
        return el
    }).join('')
    timeArr = parseFloat(timeArr)
    if(taskName == '' && taskTime == '') return
    if(checkedDays.length == 0) addToHistory (taskName, taskTime)

    checkedDays.forEach(day => {
        switch(day.value){
            case 'monday':
                addTaskToStorage(taskName, taskTime, DAYS_TASKS.monday, timeArr)
                break;
            case 'tuesday':
                addTaskToStorage(taskName, taskTime, DAYS_TASKS.tuesday, timeArr)
                break;
            case 'wednesday':
                addTaskToStorage(taskName, taskTime, DAYS_TASKS.wednesday, timeArr)
                break;
            case 'thursday':
                addTaskToStorage(taskName, taskTime, DAYS_TASKS.thursday, timeArr)
                break;
            case 'friday':
                addTaskToStorage(taskName, taskTime, DAYS_TASKS.friday, timeArr)
                break;
            case 'saturday':
                addTaskToStorage(taskName, taskTime, DAYS_TASKS.saturday, timeArr)
                break;
            case 'sunday':
                addTaskToStorage(taskName, taskTime, DAYS_TASKS.sunday, timeArr)
                break;
            default: break;
        }
    })
    document.querySelector('#task').value = ''
    document.querySelector('#time').value = ''
}

function addToHistory(task, time){
    const id = Math.floor(Math.random() * 100000)
    HISTORY_TASKS.push({id: id, task: task, time: time})
    localStorage.setItem('history', JSON.stringify(HISTORY_TASKS))
    generateHistoryTasks()
}

function addTaskToStorage(task, time, day, timeArr){
    day.push({id: Math.floor(Math.random() * 10000), task: task, timeArr: timeArr, time: time})
    day.sort((a, b) => {
        return a.timeArr - b.timeArr
    })
    localStorage.setItem('tasks', JSON.stringify(DAYS_TASKS))
    generateDayTasks()
}


function generateDayTasks (){
    dayBlocks.forEach(day => {
        switch(day.dataset['day']){
            case 'monday':
                placeItems(day, DAYS_TASKS.monday)
                break;
            case 'tuesday':
                placeItems(day, DAYS_TASKS.tuesday)
                break;
            case 'wednesday':
                placeItems(day, DAYS_TASKS.wednesday)
                break;
            case 'thursday':
                placeItems(day, DAYS_TASKS.thursday)
                break;
            case 'friday':
                placeItems(day, DAYS_TASKS.friday)
                break;
            case 'saturday':
                placeItems(day, DAYS_TASKS.saturday)
                break;
            case 'sunday':
                placeItems(day, DAYS_TASKS.sunday)
                break;
            default: break;
        }
    })
}


function placeItems (day, tasks){
    day.innerHTML = `<div id="tasks-block-show"></div>`
    
    for(let i in tasks){
     day.innerHTML += `
        <div data-id='${tasks[i].id}' class='task'>
            <h3 class='task__time'>${tasks[i].time}</h3>
            <p class='task__text'>${tasks[i].task}</p>
            <i id='remove' class="fa-solid fa-xmark"></i>
        </div>
     `   
    }
}

function openDayPage(target){
    modal.classList.add('active')
    const h1 = modal.querySelector('h1')
    h1.textContent = target.dataset['day'].toUpperCase()
    const tasks = target.querySelectorAll('.task')
    const modalContent = modal.querySelector('.modal-tasks')
    modalContent.innerHTML = ''
    for(let i = 0; i < tasks.length; i++){
        modalContent.innerHTML += tasks[i].outerHTML
    }

    const modalTasks = modal.querySelectorAll('.task')
    modalTasks.forEach(task => {
        task.addEventListener('click', () => {
            task.classList.toggle('active')
        })
    })
}

function closeModal (modal){
    const tasks = modal.querySelectorAll('.task.active')
    tasks.forEach(task => {
        removeItems(task)
    })
    modal.classList.remove('active')
}
