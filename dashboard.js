window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    if (loader) {

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
function clearInputs(){

desc.value="";

amount.value="";

category.selectedIndex=0;

type.selectedIndex=0;

}
