async function checkApi() {
    const url = document.getElementById("apiUrl").value;

    const res = await fetch("/check-api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
    });

    const data = await res.json();
    console.log(data);

    loadLogs();
}

async function loadLogs() {
    const res = await fetch("/logs");
    const logs = await res.json();

    const table = document.getElementById("tableBody");
    table.innerHTML = "";

    logs.slice().reverse().forEach(log => {
        const row = `
            <tr>
                <td>${log.url}</td>
                <td>${log.status}</td>
                <td>${log.time}</td>
                <td>${log.timestamp}</td>
            </tr>
        `;

        table.innerHTML += row;
    });
}

// auto refresh
setInterval(loadLogs, 3000);

loadLogs();