chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //   if (request.message === "download") {
  downloadCSV();
  //   }
});

function downloadCSV() {
  // Prepare data in CSV format
  chrome.storage.local.get(["user_data"], function (data) {
    const encodedUri = encodeURI(data.user_data);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "example.csv");

    // Append the link to the body
    //   document.body.appendChild(link);

    // Trigger the click event to start download
    link.click();
  });
  // Create a link element
}
