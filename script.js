const apiURL = "https://api.openai.com/v1/chat/completions";
const gptKey = "";

document.getElementById("submitBtn").addEventListener("click", async () => {
  const userDescription = document.getElementById("description").value;

  // Hide input section and show loading message
  document.getElementById("inputSection").style.display = "none";
  document.getElementById("loadingMessage").style.display = "block";

  const gptRequestDto = {
    model: "gpt-4o-2024-05-13",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful web designer assistant. You will receive a description of how a user wishes a website to look like, and you will do your best to provide the user with code using HTML, CSS, and JavaScript. The code you provide should only be code that is written within the body tags.",
      },
      {
        role: "user",
        content: userDescription,
      },
    ],
  };

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gptKey}`,
      },
      body: JSON.stringify(gptRequestDto),
    });

    const data = await response.json();
    const generatedCode = data.choices[0].message.content;

    document.getElementById("loadingMessage").style.display = "none";
    document.getElementById("result").innerHTML = generatedCode;

    const downloadBtn = document.createElement("button");
    downloadBtn.innerText = "Download Code";
    downloadBtn.addEventListener("click", () => downloadCode(generatedCode));
    document.body.appendChild(downloadBtn);
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("loadingMessage").innerText =
      "An error occurred. Please try again.";
  }
});

function downloadCode(code) {
  const blob = new Blob([code], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "generated_code.html";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
