window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader"); 

    if (loader) {  
        setTimeout(() => { ffhfgfhfgh

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