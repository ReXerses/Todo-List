const progetto = (() => {

    const creaProgetto = (nome) => {

        return {
            nome,
            todos: [],
        };
    }
    
    const eliminaProgetto = (indice,progetti) => {
        if (indice != 0) {
            progetti.splice(indice, 1);
        }
        console.log(progetti)
        return progetti;
    };

    return {
        creaProgetto,
        eliminaProgetto
    };

})();

export default progetto;