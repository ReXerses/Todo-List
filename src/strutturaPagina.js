const strutturaPagina = (() => {
    const body = document.body;

    body.innerHTML = `<style>
    @import url('https://fonts.googleapis.com/css2?family=Gentium+Book+Plus:ital@1&family=Lobster&display=swap');

    body {
        min-height: 100vh;
        max-height: 100%;
        display: flex;
        flex-flow: column wrap;
        justify-content: space-between;
        margin: 0px;
        font-family: 'Lobster', sans-serif;
        letter-spacing: 4px;
    }
    
    nav {
        display: flex;
        padding-left: 1rem;
        column-gap: 2.5rem;
        background: #b5b5b5;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 4;
    }
    
    .menu {
        height: 40px;
        width: 40px;
        background-image: url(../src/media/menu.svg);
        background-size: 100% 100%;
        border: none;
        outline: none;
        background-color: #ffffff00;
        border-radius: 16px;
        cursor: pointer;
        filter: brightness(0) invert(1);
    }
    
    .menu-active {
        background-image: url(../src/media/menu-open.svg);
        background-size: 100% 100%;
    }
    
    .titolo {
        display: flex;
        align-items: center;
        font-size: 2.5rem;
        column-gap: 2rem;
        filter: brightness(0) invert(1);
        padding: 5px;
    }
    
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        gap: 2rem;
        font-size: 2rem;
        position: relative;
        padding-bottom: 20px;
    }
    
    .aggiungiTask {
        display: flex;
        cursor: pointer;
        height: 3rem;
        width: 9rem;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        border-radius: 16px;
        border: none;
        font-family: inherit;
        align-self: center;
    }

    .aggiungiTask:hover {
        color: white;
        background-color: black;
    }
    
    .footer {
        font-size: 2rem;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        display: flex;
        gap: 5px;
        background-color: #b5b5b5;
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
        z-index: 1001;
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
        z-index: 1001;
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
        position: absolute;
        left: -100%;
        min-width: 20%;
        height: 100%;
        background-color: rgb(247 247 247);
        overflow-y: auto;
        transition: left 0.3s ease;
        z-index: 3;
    }
    @media (max-width: 768px) {
        .modal-container {
          width: 100%; /* 100% della larghezza in modalità mobile */
        }
      }
    
    .modal-content {
        padding: 20px;
        color: #000000;
    }
    
    .modal-content h2 {
        margin-bottom: 10px;
    }
    
    .modal-item {
        padding: 10px;
        background-color: #b5b5b56e;
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
        background-size: 100% 100%;
        filter: brightness(0) invert(1);
    }

    .pulsanti, .checkbox {
        width: 35px;
        height: 35px;
        border-radius: 8px;
        border: none;
        padding: 0px;
        cursor:pointer;
        background-color: #ffffff00;
    }

    .checkbox {
        border: 2px solid black;
    }

    .inbox {
        background-image:url(../src/media/inbox.svg);
        background-size: 100% 100%;
    }

    .today {
        background-image:url(../src/media/today.svg);
        background-size: 100% 100%;
    }

    .week {
        background-image:url(../src/media/week.svg);
        background-size: 100% 100%;
    }

    .add {
        background-image:url(../src/media/plus-circle.svg);
        background-size: 100% 100%;
    }

    .trash {
        background-image:url(../src/media/delete.svg);
        background-size: 100% 100%;
    }

    .todoBox {
        display: flex;
        width: clamp(280px, 60%, 1000px);
        justify-content: space-between;
        background-color :#b5b5b538;
        padding: 0.6rem;
        align-items: center;
        border-radius: 16px;
        position: relative;
        gap: 1rem;
        font-size: clamp(16px, 5vw, 24px);
        cursor: pointer;
        letter-spacing: 0px;
    }

    .todoBox:hover {
        background-color: rgb(173 173 173 / 14%);
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
        width: calc(100% - 150px);
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
        background-color: whitesmoke;
        top: 50%;
        left: 50%;
        overflow-y: auto;
        transition: opacity 0.3s ease;
        transform: translate(-50%, -50%);
        z-index : 1001;
    }

    .modal-overlay { /* Crea un velo semi-trasparente */
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5); 
        z-index: 1000; 
    }

    .nomeProgetto {
        font-size: 3rem;
        margin-bottom: 0px;
    }
    
    .firstHalf > span {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        max-width: 100px;
        text-overflow: ellipsis;
    }


    </style>

    <nav>
        <button type="menu" class="menu"></button>
        <div class="titolo">
            <span>Todo List</span>
            <img src="../src/media/logo.svg" alt="webpage logo" height="40px" width="40px">
        </div>
    </nav>

    <div class="main">
                                                                <div  id="modalOverlay"></div>
        <div id="modalContainer" class="modal-container">
            <div class="modal-content">
                <div class="modal-item" id='0'>inBox
                    <button class="pulsanti inbox"></button>
                </div>
                <div class="modal-item" id='oggi'>Today
                    <button class="pulsanti today"></button>
                </div>
                <div class="modal-item" id='settimana'>This Week
                    <button class="pulsanti week"></button>
                </div>
                <h2>Projects</h2>
                <div class="modal-item" id="aggiungiProgetto">Add project
                    <button class="pulsanti add"></button>
                </div>
            </div>
        </div>

        <p class="nomeProgetto"></p>
        <button class="aggiungiTask">Create Task</button>

        <form class="add-task" action="#" method="get">
            <p class="action">Add todo</p>
            <div class="input">
                <label for="titolo">Titolo:</label>
                <input type="text" id="titolo" name="titolo"  autocomplete="off">
            </div>

            <div class="input">
                <label for="descrizione">Descrizione:</label>
                <textarea id="descrizione" name="descrizione" rows="4" cols="50"></textarea>
            </div>

            <div class="input">
                <label for="priorità">Priorità:</label>
                <input type="number" id="priorità" name="priorità" min="1" max="5"  autocomplete="off">
            </div>

            <label for="data">Data:</label>

            <input type="date" id="data" name="data-inizio"  min=""/>

            <div class="input">
                <button type="submit" id="add">Add</button>
                <button id="cancel">Cancel</button>
            </div>
        </form>

        <form class="add-project" action="#" method="get">
            <p class="action-project">Add Project</p>
            <div class="input">
                <label for="nome-progetto">Nome:</label>
                <input type="text" id="nome-progetto" name="nome-progetto"  autocomplete="off">
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
});

export default strutturaPagina;