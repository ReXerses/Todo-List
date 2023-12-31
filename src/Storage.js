const storage = (() => {

    function saveDataToLocalStorage(progetti) {
        localStorage.setItem("progetti", JSON.stringify(progetti))
    }

    function loadDataFromLocalStorage() {
        const progettiSalvati = localStorage.getItem("progetti");
        if (progettiSalvati) {
            return JSON.parse(progettiSalvati); 
        }
        return [];
    }

    return {
        saveDataToLocalStorage,
        loadDataFromLocalStorage
    };
})();

export default storage;

