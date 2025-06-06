
let currentMachine = null;
let currentCause = null;
let logs = [];

function switchPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id + 'Page').classList.add('active');
}

function stopLine() {
  document.getElementById("resumeBtn").disabled = true;
  document.getElementById("causeButtons").classList.remove("hidden");
  document.getElementById("machineButtons").innerHTML = "";
  const machines = document.getElementById("machinesName").value.split(',');
  machines.forEach(machine => {
    const btn = document.createElement("button");
    btn.textContent = machine.trim();
    btn.onclick = () => {
      currentMachine = machine.trim();
      btn.classList.add("red");
    };
    document.getElementById("machineButtons").appendChild(btn);
  });
}

function setCause(cause) {
  currentCause = cause;
  document.getElementById("resumeBtn").disabled = false;
}

function resumeLine() {
  const time = new Date().toLocaleTimeString();
  const log = {
    time,
    machine: currentMachine,
    cause: currentCause,
    comment: ""
  };
  logs.push(log);
  updateLogList();
  currentMachine = null;
  currentCause = null;
  document.getElementById("causeButtons").classList.add("hidden");
  document.getElementById("machineButtons").innerHTML = "";
  document.getElementById("resumeBtn").disabled = true;
}

function updateLogList() {
  const list = document.getElementById("logList");
  list.innerHTML = "";
  logs.forEach((log, index) => {
    const div = document.createElement("div");
    div.className = "log-entry";
    div.innerHTML = `
      <strong>${log.time}</strong> - ${log.machine} (${log.cause}) 
      <button onclick="deleteLog(${index})">Delete</button><br>
      <input placeholder="Comment" value="${log.comment}" 
        onchange="logs[${index}].comment = this.value">
    `;
    list.appendChild(div);
  });
}

function deleteLog(index) {
  logs.splice(index, 1);
  updateLogList();
}
