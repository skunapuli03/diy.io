document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('selectCategory');
    const generate = document.getElementById('generate');
    const result = document.getElementById('result');

    async function readCSVFile(filePath) {
        const response = await fetch(filePath);
        const data = await response.text();
        return data;
    }

    function parseCSV(csvText) {
        const lines = csvText.split('\n');
        const ideas = lines.filter(Boolean); 
        return ideas;
    }

    function getRandomIdea(ideas) {
        const randomIndex = Math.floor(Math.random() * ideas.length);
        return ideas[randomIndex];
    }

    const categoryToFileMap = {
        "cooking": "dataset/projects_cooking.csv",
        "outdoor": "dataset/projects_outdoor.csv",
    };

    async function generateRandomProjectIdea() {
        const category = categorySelect.value
        const csvData = await readCSVFile(categoryToFileMap[category]);
        const ideas = parseCSV(csvData);
        const randomIdea = getRandomIdea(ideas);
        result.innerHTML = randomIdea; 
    }

    generate.addEventListener('click', () => {
        generateRandomProjectIdea();
    })
});