window.onload = () => {
    let ms = 0, s = 0, m = 0, 
    interval = null, 
    checkpointCount = 0;
    const minEle = document.getElementById("min");
    const secEle = document.getElementById("sec");
    const msEle = document.getElementById("msec");
    const start = document.getElementById("Start");
    const stop = document.getElementById("Stop");
    const reset = document.getElementById("Reset");
    const checkpointBtn = document.getElementById("Lap");
    const checkpointTable = document.querySelector("table");
    const updateDisplay = () => {
        minEle.textContent = m < 10 ? "0" + m : m;
        secEle.textContent = s < 10 ? "0" + s : s;
        msEle.textContent = ms < 10 ? "0" + ms : ms;
    };

    const startTimer = () => {
        if (!interval) {
            interval = setInterval(() => {
                ms++;
                if (ms>=100) {
                    ms=0;
                    s++;
                }
                if (s>=60) {
                    s= 0;
                    m++;
                }
                updateDisplay();
            }, 10);
            start.style.display = "none";
            stop.style.display = "inline-block";
            reset.style.display = "none";
            checkpointBtn.style.display = "inline-block";
        }
    };

    const stopTimer = () => {
        if (interval) {
            clearInterval(interval);
            interval = null;

            start.style.display = "inline-block";
            stop.style.display = "none";
            reset.style.display = "inline-block";
            checkpointBtn.style.display = "none";
        }
    };

    const resetTimer = () => {
        if (!interval) {
            ms=0;
            s=0;
            m=0;
            checkpointCount = 0;
            updateDisplay();

            start.style.display = "inline-block";
            stop.style.display = "none";
            reset.style.display = "none";
            checkpointBtn.style.display = "none";
            checkpointTable.style.display = "none";
            document.querySelectorAll(".lap-row").forEach(row => row.remove());
        }
    };

    const recordCheckpoint = () => {
        if (interval){
            if (checkpointTable.style.display === "none") checkpointTable.style.display = "table";
            checkpointCount++;
            const checkpointRow = document.createElement("tr");
            checkpointRow.classList.add("lap-row");
            checkpointRow.innerHTML = `
                <td>${checkpointCount}</td>
                <td>Checkpoint ${checkpointCount}</td>
                <td>${m<10 ? "0" + m:m}:${s<10 ? "0" + s:s}.${ms<10 ? "0" + ms:ms}</td>
                <td>${m<10 ? "0" + m:m}:${s<10 ? "0" + s:s}.${ms<10 ? "0" + ms:ms}</td>
                <td><i class="fa-solid fa-trash bin" onclick="this.closest('tr').remove()"></i></td>
            `;
            checkpointTable.appendChild(checkpointRow);
        }
    };

    start.onclick = startTimer;
    stop.onclick = stopTimer;
    reset.onclick = resetTimer;
    checkpointBtn.onclick = recordCheckpoint;
};
