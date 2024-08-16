const apiURL = "https://api.openai.com/v1/chat/completions";
const gptKey = "";

const gptRequestDto = {
  model: "gpt-4o-2024-05-13",
  messages: [
    {
      role: "system",
      content:
        "You are a helpful web designer assistant. You will receive a description of how a user wishes a website to look like, and you will do your best to provide the user with code using HTML, CSS, and JavaScript. The code you provide should only be code that is written within the body tags. ONLY RETURN HTML",
    },
  ],
};

const content = document.getElementById("content");

let generatedCode;

const btn = document
  .getElementById("btn")
  .addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;

    gptRequestDto.messages.push({
      role: "user",
      content: userInput,
    });
    console.log(userInput);
    console.log(gptRequestDto.messages);
    await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${gptKey}`,
      },
      body: JSON.stringify(gptRequestDto),
    })
      .then((response) => response.json())
      .then((data) => {
        generatedCode = data.choices[0].message.content;
      });
    content.innerHTML = generatedCode;
    const downloadBtn = document.createElement("button");
    downloadBtn.innerText = "Download Code";
    downloadBtn.addEventListener("click", () => downloadCode(generatedCode));
    document.body.appendChild(downloadBtn);
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
