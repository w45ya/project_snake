const Container = document.getElementById('container');
const table = document.createElement('table');
const tbody = document.createElement('tbody');
let highScores = [[1,'loser'],[100,'BeatMe'],[42,'Answer']]

export function showTable() {
    while(tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
    }
    let row = document.createElement('tr');
    let header = document.createElement('th');
    header.textContent = "HighScore";
    header.colSpan="2";
    row.appendChild(header);
    tbody.appendChild(row);
    for (let i = 0; i < highScores.length; i++) {
        let vals = highScores[i];
        let row = document.createElement('tr');
        for (let b = 0; b < vals.length; b++) {
            let cell = document.createElement('td');
            cell.textContent = vals[b];
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    Container.appendChild(table);
}

export function addToScore(a,b){
    highScores.push([a,b])
    highScores.sort(function(a, b) {
        return b[0] - a[0];
    });
}