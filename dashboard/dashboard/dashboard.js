window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader"); 

    if (loader) {  
        setTimeout(() => {ndjfngjjrjlkhhkhhhjjkrhhhhgkkffgyjjhhhhjhijjgggghfhhfhhhhjhhdjjhggghhhdhhhhjjj
          loader.style.display = "none";

        }, 1000);

    }

});

// ---------- Initialize Dashboard ----------

render();

updateSummary();

updateCharts();

updateBudget();

updateHealth();

updateGoals();

updateInsights();