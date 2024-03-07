document.getElementById("download").addEventListener("click", function () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.runtime.sendMessage(activeTab.id, {});
  });
});

document.getElementById("run").addEventListener("click", function () {
  let startId = document.getElementById("start").value;
  let endId = document.getElementById("end").value;

  chrome.storage.local.set({ start_id: startId, end_id: endId }, function () {
    console.log("data saved");
  });
});

let storage = (keys) =>
  new Promise((resolve, reject) =>
    chrome.storage.local.get(...keys, (result) => resolve(result))
  );

let store = (data) =>
  new Promise((resolve, reject) =>
    chrome.storage.local.set(data, () => resolve({}))
  );
async function getStorageData(key) {
  return await storage(key);
}

async function setStorageData(data) {
  return await store(data);
}

getStorageData(["active"]).then((data) => {
  if (data.active === undefined) {
    setStorageData({ active: false });
  } else {
    let switchBtn = document.getElementById("active");
    switchBtn.checked = data.active;
  }
});

document.getElementById("active").addEventListener("change", (value) => {
  setStorageData({ active: value.target.checked });
});

let start_el = document.getElementById("start");
let end_el = document.getElementById("end");
let data = getStorageData(["start_id"]);
let data1 = getStorageData(["end_id"]);
data.then((result) => {
  start_el.value = result.start_id || "";
});
data1.then((result) => {
  end_el.value = result.end_id || "";
});
