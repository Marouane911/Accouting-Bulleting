document.getElementById('startMonth').addEventListener('change', updateInputFields);
document.getElementById('endMonth').addEventListener('change', updateInputFields);

function updateInputFields() {
    var startMonth = parseInt(document.getElementById('startMonth').value);
    var endMonth = parseInt(document.getElementById('endMonth').value);
    var formContainer1 = document.querySelector('.column:nth-child(1)');
    var formContainer2 = document.querySelector('.column:nth-child(2)');

    // Nettoyage des champs existants
    formContainer1.innerHTML = '';
    formContainer2.innerHTML = '';

    var months = ["January", "Febuary", "March", "April", "May", "June", "July", "Auguste", "September", "October", "November", "December"];
    var selectedMonths = [];

    // Plage des mois
    var monthIndex = startMonth;
    do {
        selectedMonths.push(months[monthIndex]);
        monthIndex = (monthIndex + 1) % 12;
    } while (monthIndex !== (endMonth + 1) % 12);

    // Continuité des mois (ne pas faire marche arrière avec les mois)
    if (startMonth <= endMonth) {
        selectedMonths = months.slice(startMonth, endMonth + 1);
    }

    // Ajouter/enlever une case en fonction des saisies de l'user
    selectedMonths.forEach(function(month, index) {
        formContainer1.innerHTML += '<label for="dataInput1-' + index + '">Value For ' + month + ' :</label><input type="number" id="dataInput1-' + index + '" placeholder="Ex : 7,000' + '" /><br>';
        formContainer2.innerHTML += '<label for="dataInput2-' + index + '">Value For ' + month + ' :</label><input type="number" id="dataInput2-' + index + '" placeholder="Ex : 7,000' + '" /><br>';
    });

    // Titre : Adversting Budget & Turnover
    formContainer1.innerHTML = '<h1 style="background-color: red;box-shadow: 0 0 50px 5px rgba(255, 0, 0, 0.196);">ADVERTISING BUDGET</h1>' + formContainer1.innerHTML;
    formContainer2.innerHTML = '<h1 style="background-color: rgb(0, 255, 55);box-shadow: 0 0 50px 5px rgba(0, 255, 42, 0.196);">TURNOVER</h1>' + formContainer2.innerHTML;
}

function drawChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var startMonth = parseInt(document.getElementById('startMonth').value);
    var endMonth = parseInt(document.getElementById('endMonth').value);

    var months = ["January", "Febuary", "March", "April", "May", "June", "July", "Auguste", "September", "October", "November", "December"];
    var selectedMonths = months.slice(startMonth, endMonth + 1);

    var dataValues1 = Array.from(document.querySelectorAll('.column:nth-child(1) input')).map(input => Number(input.value));
    var dataValues2 = Array.from(document.querySelectorAll('.column:nth-child(2) input')).map(input => Number(input.value));

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: selectedMonths,
            datasets: [
                {
                    label: 'ADVERTISING BUDGET',
                    data: dataValues1,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132)',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'TURNOVER',
                    data: dataValues2,
                    backgroundColor: 'rgba(0, 255, 55, 0.5)',
                    borderColor: 'rgba(0, 255, 55)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white', // Couleur des graduations
                        font: {
                            size: 16 // Taille des graduations ordonné
                        }
                    },
                    grid: {
                        color: 'grey' // Couleur des lignes du graphique
                    }
                },
                x: {
                    ticks: {
                        color: 'white', // Couleur abscisse
                        font: {
                            size: 16 // taille des graduations abscisse
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)' // Change la couleur des lignes de la grille en blanc (semi-transparent) pour l'axe des abscisses
                    }
                }
            }
        }
    });

    // Chiffre d'Affaire moyen et budget publicitaire moyen
    var averageCA = calculateAverage(dataValues2);
    var averageBudget = calculateAverage(dataValues1);

    // Affichage des moyennes
    document.getElementById('averageCA').innerText = 'Average Turnover : ' + averageCA.toFixed(2);
    document.getElementById('averageBudget').innerText = 'Average Advertising Budget : ' + averageBudget.toFixed(2);
}

// Calculer la moyenne
function calculateAverage(values) {
    if (values.length === 0) {
        return 0;
    }

    var sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
}

updateInputFields();
