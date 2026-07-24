window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    if (loader) {  dsf
        setTimeout(() => { 

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