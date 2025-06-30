document.addEventListener("DOMContentLoaded", () => {
  const inputArea = document.getElementById("inputArea");
  const outputDiv = document.getElementById("output");

  // Insert symbol into input area
  document.querySelectorAll(".symbol-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      inputArea.value += btn.getAttribute("data-insert");
    });
  });

  window.evaluateExpression = async () => {
    const expression = inputArea.value;

    try {
      const response = await fetch("http://127.0.0.1:5000/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ expression })
      });

      const data = await response.json();
      outputDiv.innerHTML = `<p>${data.input} ${data.output}</p>`;
      MathJax.typesetPromise();
    } catch (error) {
      outputDiv.innerHTML = `<p style="color:red;">Error: Failed to fetch</p>`;
    }
  };
});
