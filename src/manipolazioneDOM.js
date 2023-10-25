import progetto from "./Progetto";
import todo from "./Todo";
import storage from "./Storage";

const caricaPagina = (() => {

    const body = document.body;

    body.innerHTML = `<style>

    body {
        min-height: 100vh;
        max-height: 100%;
        display: flex;
        flex-flow: column wrap;
        justify-content: space-between;
        margin: 0px;
    }
    
    nav {
        display: flex;
        padding: 1rem;
        column-gap: 5rem;
        background: aquamarine;
    }
    
    .menu {
        height: 40px;
        width: 40px;
        background-image: url(../src/media/menu.svg);
        background-size: 100% 100%;
        border: none;
        outline: none;
        background-color: white;
        border-radius: 16px;
        cursor: pointer;
    }
    
    .menu-active {
        background-image: url(../src/media/menu-open.svg);
        background-size: 100% 100%;
    }
    
    .titolo {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        column-gap: 2rem;
    }
    
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        gap: 2rem;
        font-size: 2rem;
        position: relative;
    }
    
    .aggiungiTask {
        display: flex;
        align-items: center;
        column-gap: 1rem;
        cursor: pointer;
    }
    
    .footer {
        font-size: 2rem;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        display: flex;
        gap: 5px;
        background-color: #DACC3E;
        justify-content: center;
        z-index: 3;
    }
    
    a{
        text-decoration: none;
    }
    
    a img {
        height: 2.1rem;
        width: 2rem;
        filter:brightness(0) invert(1);
    }
    
    .nome-github {
        color: rgb(255, 255, 255);
    }
    
    textarea {
        resize: none;
        width: 100%;
    }
    
    .action {
        text-align: center;
        margin: 0px;
    }
    
    .add-task {
        position: fixed;
        top: 50%;
        left: 50%;
        max-width: 70%;
        background-color: rgb(243 185 24 / 80%);
        overflow-y: auto;
        transition: opacity 0.3s ease;
        transform: translate(-50%, -50%);
        z-index: 3;
        padding: 2.4rem;
        display: none;
        flex-direction: column;
        row-gap: 15px;
        border-radius: 32px;
    }
    
    form > p {
        margin: 0px;
    }
    
    .add-project {
        text-align: center;
        position: fixed;
        top: 50%;
        left: 50%;
        max-width: 70%;
        background-color: rgb(243 185 24 / 80%);
        overflow-y: auto;
        transition: opacity 0.3s ease;
        transform: translate(-50%, -50%);
        z-index: 3;
        padding: 1.4rem;
        display: none;
        flex-direction: column;
        row-gap: 15px;
        border-radius: 32px;
    }
    
    .input {
        display: flex;
        gap: 6px;
        flex-flow: column wrap;
    }
    
    input {
        font-size: 1.0rem;
        background: #00000075;
        outline: none;
        border: none;
        border-radius: 32px;
        color: white;
        padding: 10px;
    }
    
    .input > button {
        height: 1.5rem;
        border-radius: 32px;
        border: 0;
        margin: 5px;
        cursor: pointer;
    }
    
    .input > button:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .modal-container {
        position: fixed;
        left: -300px;
        min-width: 16rem;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        overflow-y: auto;
        transition: left 0.3s ease;
        z-index: 2;
    }
    
    .modal-content {
        padding: 20px;
        color: white;
    }
    
    .modal-content h2 {
        margin-bottom: 10px;
    }
    
    .modal-item {
        padding: 10px;
        background-color: rgba(255, 255, 255, 0.1);
        margin-bottom: 10px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        display: flex;
        JUSTIFY-CONTENT: space-between;
        align-items: center;
    }
    
    .modal-item:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .modal-open {
        left: 0;
    }
    
     .menu-aperto {
        background-image:url(../src/media/menu-open.svg);
    }

    .pulsanti, .checkbox {
        width: 30px;
        height: 30px;
        border-radius: 8px;
        border: none;
        cursor:pointer;
    }

    .checkbox {
        border: 2px solid black;
    }

    .inbox {
        background-image:url(../src/media/inbox.svg);
    }

    .today {
        background-image:url(../src/media/today.svg);
    }

    .week {
        background-image:url(../src/media/week.svg);
    }

    .add {
        background-image:url(../src/media/plus-circle.svg);
    }

    .trash {
        background-image:url(../src/media/delete.svg);
    }

    .todoBox {
        display: flex;
        width: clamp(280px, 60%, 1000px);
        justify-content: space-between;
        border: solid black 2px;
        padding: 0.6rem;
        align-items: center;
        border-radius: 16px;
        position: relative;
        gap: 1rem;
        font-size: clamp(16px, 5vw, 24px);
        cursor: pointer;
    }

    .firstHalf {
        align-items: center;
        display: flex;
        gap: 1rem;
        flex: 1;
    }

    .secondHalf {
        align-items: center;
        display: flex;
        flex: 1;
        justify-content: space-around;
    }

    .linea {
        position: absolute;
        left: 60px;
        border: 2px solid black;
        width: calc(100% - 140px);
        padding-left: 30px;
    }

    .descrizione {
        display: flex;
        flex-direction: column;
        width: clamp(280px, 60%, 1000px);
        padding: 0.6rem;
        border: solid 2px black;
        border-radius: 16px;
        text-align: center;
        font-size: clamp(16px, 5vw, 24px);
        position: fixed;
        background-color: aqua;
        top: 50%;
        left: 50%;
        overflow-y: auto;
        transition: opacity 0.3s ease;
        transform: translate(-50%, -50%);
    }


    </style>

    <nav>
        <button type="menu" class="menu"></button>
        <div class="titolo">
            <span>Todo-List</span>
            <img src="../src/media/logo.svg" alt="webpage logo" height="40px" width="40px">
        </div>
    </nav>

    <div class="main">

        <div id="modalContainer" class="modal-container">
            <div class="modal-content">
                <div class="modal-item" id='0'>inBox
                    <button class="pulsanti inbox"></button>
                </div>
                <div class="modal-item">Today
                    <button class="pulsanti today"></button>
                </div>
                <div class="modal-item">This Week
                    <button class="pulsanti week"></button>
                </div>
                <h2>Projects</h2>
                <div class="modal-item" id="aggiungiProgetto">Add project
                    <button class="pulsanti add"></button>
                </div>
            </div>
        </div>

        <p class="nomeProgetto"></p>
        <div class="aggiungiTask">
            <img src="../src/media/plus.svg" alt="icona aggiungi task" height="30px" width="30px">
            <span>Add Task</span>
        </div>

        <form class="add-task" action="#" method="get">
            <p class="action">Add todo</p>
            <div class="input">
                <label for="titolo">Titolo:</label>
                <input type="text" id="titolo" name="titolo" required autocomplete="off">
            </div>

            <div class="input">
                <label for="descrizione">Descrizione:</label>
                <textarea id="descrizione" name="descrizione" rows="4" cols="50">Fare bla con il blabla. Capitoh?!</textarea>
            </div>

            <div class="input">
                <label for="priorità">Priorità:</label>
                <input type="number" id="priorità" name="priorità" min="1" max="5" required autocomplete="off">
            </div>

            <label for="data">Data:</label>

            <input type="date" id="data" name="data-inizio" value="2023-10-09" min="2023-10-09"/>

            <div class="input">
                <button type="submit" id="add">Add</button>
                <button id="cancel">Cancel</button>
            </div>
        </form>

        <form class="add-project" action="#" method="get">
            <p class="action-project">Add Project</p>
            <div class="input">
                <label for="nome-progetto">Nome:</label>
                <input type="text" id="nome-progetto" name="nome-progetto" required autocomplete="off">
            </div>

            <div class="input">
                <button type="submit" id="addProgetto">Add</button>
                <button id="cancel-project">Cancel</button>
            </div>
        </form>


    </div>


    <div class="footer">

        <a href="https://github.com/ReXerses" target="_blank">
            <img src="../src/media/github.svg" alt="Personal Github link">
        </a>
        <a class='nome-github' href="https://github.com/ReXerses" target="_blank">ReXerses</a>

    </div>
    `;

    let progetti = storage.loadDataFromLocalStorage();
    let progettoAttuale=0;

    const inboxBox = document.getElementById('0');              //Verra sistemata
    inboxBox.addEventListener('click' , () => {
        nomeProgetto.textContent=progetti[inboxBox.id].nome;
        progettoAttuale = 0;

            caricaTodoDom(progetti[progettoAttuale].todos, progetti[progettoAttuale].todos.length-1);

        console.log('si ci sono')
    })

    const nomeProgetto = document.querySelector('.nomeProgetto');

    nomeProgetto.textContent=progetti[progettoAttuale].nome;
    if (progetti[0] && progetti[0].nome == "Inbox") {

        for( let i= 1; i <= progetti.length -1; i++) {
            const contenuto_modale = document.querySelector('.modal-content');
            const box = document.createElement("div");
            box.textContent = progetti[i].nome;
            box.classList.add('modal-item');
            box.setAttribute('id', i);

            const eliminaProgettoBtn = document.createElement('button');
            eliminaProgettoBtn.classList.add('pulsanti');
            eliminaProgettoBtn.classList.add('trash');
            eliminaProgettoBtn.addEventListener('click', () => {
                progetto.eliminaProgetto(box.id,progetti);
                storage.saveDataToLocalStorage(progetti);
                box.remove();
                removeAllTodoBoxDom();
                progettoAttuale=0;
                nomeProgetto.textContent=progetti[0].nome;
            })
            box.appendChild(eliminaProgettoBtn);
            contenuto_modale.appendChild(box);
            box.addEventListener('click' , (e) => {
                if(e.target !== eliminaProgettoBtn) {
                    nomeProgetto.textContent=progetti[box.id].nome;
                    progettoAttuale= box.id;

                    if(progetti[progettoAttuale].todos[0]) {
                        caricaTodoDom(progetti[progettoAttuale].todos, progetti[progettoAttuale].todos.length-1);
                    } else {
                        removeAllTodoBoxDom();// controllo
                    }

                }

                console.log('si ci sono')

                //DA TRASFORMARE IN FUNZIONE
                //Carica tutti i todo del progetto
            })
        }
        // Inserire codice per caricare nel DOM i progetti presenti
    } else {
        progetti = [progetto.creaProgetto('Inbox')];
    }

    function inserisciProgettoDOM (submit_progetto) {
        const contenuto_modale = document.querySelector('.modal-content');
        const box = document.createElement("div");
        box.textContent = submit_progetto;
        box.classList.add('modal-item');
        box.setAttribute('id', progetti.length - 1);


        const eliminaProgettoBtn = document.createElement('button');
        eliminaProgettoBtn.classList.add('pulsanti');
        eliminaProgettoBtn.classList.add('trash');
        eliminaProgettoBtn.addEventListener('click', () => {
            progetto.eliminaProgetto(box.id,progetti);
            storage.saveDataToLocalStorage(progetti);
            box.remove();
            removeAllTodoBoxDom();
            progettoAttuale=0;
            nomeProgetto.textContent=progetti[0].nome;
        })

      
        box.appendChild(eliminaProgettoBtn);
        contenuto_modale.appendChild(box);

        box.addEventListener('click' , (e) => {
            if(e.target !== eliminaProgettoBtn) {
                nomeProgetto.textContent=progetti[box.id].nome;
                progettoAttuale= box.id;

                if(progetti[progettoAttuale].todos[0]) {
                    caricaTodoDom(progetti[progettoAttuale].todos, progetti[progettoAttuale].todos.length-1);
                } else {
                    removeAllTodoBoxDom();// controllo
                }
            }
            console.log(progettoAttuale);
            console.log('si ci sono vediamo')
        })

    }

    function inserisciTodoDOM (progetti, id) {
        const mainContainer = document.querySelector('.main');
        const todoBox = document.createElement('div');

        const linea =document.createElement('div');
        linea.classList.add('linea');

        const firstHalf = document.createElement('div');
        firstHalf.classList.add('firstHalf');

        const secondHalf = document.createElement('div');
        secondHalf.classList.add('secondHalf');

        const checkBtn = document.createElement('button');
        checkBtn.classList.add('pulsanti');
        checkBtn.classList.add('checkbox');

        const descrizioneBox =document.createElement('div')
        descrizioneBox.classList.add("descrizione");
        const descrizioneSpan = document.createElement('p'); //cambiare nome
        descrizioneSpan.textContent = progetti[id].descrizione;
        //descrizioneSpan.classList.add("descrizione");

        const chiudiDescrizioneBtn = document.createElement('button');
        chiudiDescrizioneBtn.addEventListener('click' , () => {
            descrizioneBox.remove();
        })

        //event listener per cambiare il valore IsDone e di conseguenza sbarrare l'intero todoBox
        checkBtn.addEventListener('click', () => {
            if(progetti[id].isDone) {
                progetti[id].isDone = false;
                storage.saveDataToLocalStorage(progetti);
                linea.remove();
                //togliere la riga sull intero box
            } else {
                progetti[id].isDone = true;
                storage.saveDataToLocalStorage(progetti);
                todoBox.appendChild(linea);
                //mette la riga sull intero box
            }

            

        })
        firstHalf.appendChild(checkBtn);
        firstHalf.classList.add('firstHalf');
        //todoBox.appendChild(checkBtn);

        const titoloSpan = document.createElement('span');
        titoloSpan.textContent = progetti[id].titolo;
        firstHalf.appendChild(titoloSpan);
        //todoBox.appendChild(titoloSpan);
        todoBox.appendChild(firstHalf);

        const dataSpan = document.createElement('span');
        dataSpan.textContent = progetti[id].data;
        secondHalf.appendChild(dataSpan);
        //todoBox.appendChild(dataSpan);


        const prioritàSpan = document.createElement('span');
        prioritàSpan.textContent = progetti[id].priority;
        secondHalf.appendChild(prioritàSpan);
        //todoBox.appendChild(prioritàSpan);

        todoBox.classList.add('todoBox');

        const cancellaTodoBtn = document.createElement('button');
        cancellaTodoBtn.classList.add('pulsanti');
        cancellaTodoBtn.classList.add('trash');

        cancellaTodoBtn.addEventListener('click', () => {
            todo.rimuoviTodo(progetti,id);
            storage.saveDataToLocalStorage(progetti);
            todoBox.remove();
        })
        //secondHalf.appendChild(cancellaTodoBtn);

        //todoBox.appendChild(cancellaTodoBtn);
        todoBox.appendChild(secondHalf);
        todoBox.appendChild(cancellaTodoBtn);

        todoBox.addEventListener('click', (e) => {
            if (e.target !== checkBtn && e.target !== cancellaTodoBtn ) {
                descrizioneBox.appendChild(descrizioneSpan)
                descrizioneBox.appendChild(chiudiDescrizioneBtn);
                mainContainer.appendChild(descrizioneBox);
            }
        })

        mainContainer.appendChild(todoBox);

    }

    function caricaTodoDom (progetti, lunghezza) {
        removeAllTodoBoxDom();
        for(let i=0; i<=lunghezza; i++) {
            inserisciTodoDOM(progetti, i);
        }
    }

    function removeAllTodoBoxDom () {
        const todoBoxes = document.querySelectorAll('.todoBox');
        todoBoxes.forEach(todoBox => {
            todoBox.remove();
        });
    }



   // Listeners


    const openModalBtn = document.querySelector('.menu');
    const modalContainer = document.getElementById('modalContainer');
    const addTask = document.querySelector('.aggiungiTask');
    const cancelTaskBtn = document.getElementById('cancel');
    const modale_addTask = document.querySelector('.add-task');
    const addProject = document.getElementById('aggiungiProgetto')
    const modale_addProject = document.querySelector('.add-project');
    const cancelProjectBtn = document.getElementById('cancel-project');

    openModalBtn.addEventListener('click', () => {
        openModalBtn.classList.toggle('menu-aperto');
        modalContainer.classList.toggle('modal-open');

        
    });

    addTask.addEventListener('click', () => {
        modale_addTask.style.display = "flex";
        
    })

    cancelTaskBtn.addEventListener('click', () => {
        modale_addTask.reset();
        modale_addTask.style.display = "none";
    })

    addProject.addEventListener('click', () => {
        modale_addProject.style.display = "flex";
        
    })
    
    cancelProjectBtn.addEventListener('click', () => {
        modale_addProject.reset();
        modale_addProject.style.display = "none";
    })

    modale_addProject.addEventListener('submit', (e) => {
        e.preventDefault();

        const submit_progetto = document.getElementById('nome-progetto').value;

        const nuovo_progetto = progetto.creaProgetto(submit_progetto);

        progetti.push(nuovo_progetto);

        storage.saveDataToLocalStorage(progetti);
        modale_addProject.reset();
        modale_addProject.style.display = "none";

        //console.log(progetti);
        inserisciProgettoDOM(submit_progetto);

    })

    modale_addTask.addEventListener('submit' , (e) => {
        e.preventDefault();

        const titolo = document.getElementById('titolo').value;
        const descrizione = document.getElementById('descrizione').value;
        const priorità = document.getElementById('priorità').value;
        const data = document.getElementById('data').value;

        todo.aggiungiToProgetto(progetti[progettoAttuale], titolo, descrizione, priorità, data);

        storage.saveDataToLocalStorage(progetti);
        modale_addTask.reset();
        modale_addTask.style.display = "none";

        console.log(progetti);

        inserisciTodoDOM(progetti[progettoAttuale].todos, progetti[progettoAttuale].todos.length -1);


    })

    

    console.log(progetti);
    //console.log(progetti[3].todos[0].titolo);
    //console.log(progetti[3].todos.length-1);


});

export default caricaPagina;