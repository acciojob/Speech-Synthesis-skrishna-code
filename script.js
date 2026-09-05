const msg = new SpeechSynthesisUtterance();

let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const textArea = document.querySelector('[name="text"]');

const rateControl = document.querySelector('[name="rate"]');
const pitchControl = document.querySelector('[name="pitch"]');


// Initial settings
msg.rate = 1;
msg.pitch = 1;


// Get voices
function populateVoices() {
  voices = speechSynthesis.getVoices();

  voicesDropdown.innerHTML = "";

  if (voices.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No voices available";
    voicesDropdown.appendChild(option);
    return;
  }

  voices.forEach((voice, index) => {
    const option = document.createElement("option");

    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;

    voicesDropdown.appendChild(option);
  });

  msg.voice = voices[0];
}

populateVoices();

speechSynthesis.onvoiceschanged = populateVoices;


// Voice selection
voicesDropdown.addEventListener("change", function () {
  const selectedIndex = parseInt(this.value);

  if (!isNaN(selectedIndex) && voices[selectedIndex]) {
    const wasSpeaking = speechSynthesis.speaking;

    msg.voice = voices[selectedIndex];

    if (wasSpeaking) {
      speechSynthesis.cancel();

      setTimeout(function () {
        speak();
      }, 100);
    }
  }
});


// Rate
rateControl.addEventListener("input", function () {
  msg.rate = parseFloat(this.value);
});


// Pitch
pitchControl.addEventListener("input", function () {
  msg.pitch = parseFloat(this.value);
});


// Speak
function speak() {
  const text = textArea.value.trim();

  if (!text) {
    return;
  }

  if (voices.length === 0) {
    populateVoices();

    if (voices.length === 0) {
      return;
    }
  }

  msg.text = text;

  const selectedIndex = parseInt(voicesDropdown.value);

  if (!isNaN(selectedIndex) && voices[selectedIndex]) {
    msg.voice = voices[selectedIndex];
  }

  speechSynthesis.speak(msg);
}


// Speak button
speakButton.addEventListener("click", speak);


// Stop button
stopButton.addEventListener("click", function () {
  speechSynthesis.cancel();
});