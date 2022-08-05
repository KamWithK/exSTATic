(() => {
  // src/mokuro.js
  console.log("Injected");
  var observer = new MutationObserver((event) => {
    let url = window.location.href;
    console.log(url);
    let [current_page, total_pages] = document.getElementById("pageIdxDisplay").innerText.split("/");
    console.log(current_page, total_pages);
    let lines = Array.from(document.getElementById(`page${current_page - 1}`).firstChild.childNodes).map((element) => Array.from(element.childNodes).reduce((so_far, node) => `${so_far}${node.textContent}`, ""));
    console.log(lines);
  });
  observer.observe(document.getElementById("pageIdxDisplay"), { "childList": true, "subtree": true });
})();
