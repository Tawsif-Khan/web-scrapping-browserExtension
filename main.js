const orderIdSelector =
  "#divScrollable > table > tbody > tr:nth-child(2) > td:nth-child(2) > a";
const nameSelector =
  "#divScrollable > table > tbody > tr:nth-child(2) > td:nth-child(4)";
const brnIDSelector =
  "#divScrollable > table > tbody > tr:nth-child(2) > td:nth-child(5)";
const contactSelector =
  "#divScrollable > table > tbody > tr:nth-child(2) > td:nth-child(5)";
const marketSelector =
  "#divScrollable > table > tbody > tr:nth-child(2) > td:nth-child(7)";
const dealerCodeSelector =
  "#divScrollable > table > tbody > tr:nth-child(2) > td:nth-child(10)";
const workedBySelector =
  "#divScrollable > table > tbody > tr:nth-child(2) > td:nth-child(15)";
const orderTypeSelector =
  "#divScrollable > table > tbody > tr:nth-child(2) > td:nth-child(16)";

let end_id = 99999999;

chrome.storage.local.get(["user_data"], function (data) {
  if (data.user_data == undefined) {
    chrome.storage.local.set(
      {
        user_data:
          "data:text/csv;charset=utf-8," +
          "Order ID,Name,BRN ID,Customer Contact No 1,Market,Dealer Code and Staff Info,Worked on by,Order Type\n",
      },
      function () {
        //  Data's been saved boys and girls, go on home

        chrome.storage.local.get(["user_data"], function (data) {});
      }
    );
  }
});

function storeData() {
  try {
    chrome.storage.local.get(["user_data"], function (data) {
      chrome.storage.local.set(
        {
          user_data:
            data.user_data +
            getValue(orderIdSelector) +
            ", " +
            getValue(nameSelector) +
            ", " +
            getValue(brnIDSelector) +
            ", " +
            getValue(contactSelector) +
            ", " +
            getValue(marketSelector) +
            ", " +
            getValue(dealerCodeSelector) +
            ", " +
            getValue(workedBySelector) +
            ", " +
            getValue(orderTypeSelector) +
            "\n",
        },
        function () {
          //  Data's been saved boys and girls, go on home
          console.log("data saved");
        }
      );
    });
  } catch (e) {}
}
if (getValue(orderIdSelector)) {
  storeData();
}
function insertOrderId(id) {
  let orderId = document.querySelector("#body_txtOrderID");
  orderId.value = "F" + id;
  let data = getStorageData(["active"]);
  data.then(function (result) {
    if (result.active && id <= end_id) {
      clickOnSeach();
    }
  });
}

function clickOnSeach() {
  let btn = document.querySelector(
    "#form2 > div.wrapper > div.content-wrapper > section.content > div:nth-child(1) > div > div > div.box-footer.clearfix > input:nth-child(1)"
  );
  btn.click();
}

function getValue(selector) {
  try {
    let el = document.querySelector(selector);
    let data = el.textContent || el.innerText || "";
    return data.trim();
  } catch (e) {
    return null;
  }
}

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

function run(result) {
  let start_id = result.start_id;
  setTimeout(function () {
    insertOrderId(start_id);
    start_id = parseInt(start_id) + 1;
    setStorageData({ start_id: start_id });
  }, 2000);
}

let data = getStorageData(["start_id"]);
data.then((result) => {
  if (result.start_id === undefined) {
    setStorageData({ start_id: 5000000, end_id: 9999999 });
    run(result);
  } else {
    run(result);
  }
});

let data1 = getStorageData(["end_id"]);

data1.then((result) => {
  end_id = result.end_id || "";
});
// downloadCSV();
