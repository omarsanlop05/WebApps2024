console.log("Running the script");

document.addEventListener("DOMContentLoaded", () =>{
    var form = document.getElementById("agendaUpdate");
    var table = document.getElementById("agendaContent");

    form.addEventListener("submit", (event) =>{
        event.preventDefault();

        var day = document.getElementById("day").value;
        var date = document.getElementById("date").value;
        var t1 = document.getElementById("timeS").value;
        var t2 = document.getElementById("timeE").value;
        var act = document.getElementById("act").value;
        var place = document.getElementById("place").value;
        var type = document.getElementById("type").value;
        var notes = document.getElementById("notes").value;
        var color = document.getElementById("color").value;
        var availability = document.getElementById("available").checked;

        const newRow = document.createElement("tr");

        var newCell = document.createElement("td");
        newCell.textContent = day;
        newRow.appendChild(newCell);

        var newCell = document.createElement("td");
        newCell.textContent = date;
        newRow.appendChild(newCell);

        var newCell = document.createElement("td");
        newCell.textContent = t1;
        newRow.appendChild(newCell);

        var newCell = document.createElement("td");
        newCell.textContent = t2;
        newRow.appendChild(newCell);

        var newCell = document.createElement("td");
        newCell.textContent = act;
        newRow.appendChild(newCell);

        var newCell = document.createElement("td");
        newCell.textContent = place;
        newRow.appendChild(newCell);

        var newCell = document.createElement("td");
        newCell.textContent = type;
        newRow.appendChild(newCell);

        var newCell = document.createElement("td");
        newCell.textContent = notes;
        newRow.appendChild(newCell);

        var newCell = document.createElement("td");
        newCell.style.backgroundColor = color;
        newRow.appendChild(newCell);

        var newCell = document.createElement("td");
        var img = document.createElement("img");
        img.classList.add("status");

        if(availability){
            img.src = "../images/free.png"
            img.alt = "Available"
        }
        else{
            img.src = "../images/busy.png"
            img.alt = "Not available"
        }

        newCell.appendChild(img);
        newRow.appendChild(newCell);

        table.appendChild(newRow);

        form.reset();
    });
});


    

