// const msg = new SpeechSynthesisUtterance();
// let voices = [];

// const voicesDropdown = document.querySelector('[name="voice"]');
// const options = document.querySelectorAll('[type="range"], [name="text"]');
// const speakButton = document.querySelector('#speak');
// const stopButton = document.querySelector('#stop');


// // Get all available voices
// function populateVoices() {
//   voices = speechSynthesis.getVoices();

//   voicesDropdown.innerHTML = "";

//   if (voices.length === 0) {
//     const option = document.createElement("option");
//     option.textContent = "No voices available";
//     option.value = "";
//     voicesDropdown.appendChild(option);
//     return;
//   }

//   voices.forEach((voice, index) => {
//     const option = document.createElement("option");

//     option.value = index;
//     option.textContent = `${voice.name} (${voice.lang})`;

//     voicesDropdown.appendChild(option);
//   });

//   // Select first voice by default
//   msg.voice = voices[0];
// }


// // Populate voices when available
// populateVoices();

// speechSynthesis.addEventListener("voiceschanged", populateVoices);


// // Set voice
// function setVoice() {
//   const selectedVoice = voices[voicesDropdown.value];

//   if (selectedVoice) {
//     msg.voice = selectedVoice;
//   }

//   // If speech is currently running, restart with new voice
//   if (speechSynthesis.speaking) {
//     speechSynthesis.cancel();
//     speak();
//   }
// }

// voicesDropdown.addEventListener("change", setVoice);


// // Set rate and pitch
// function setOption() {
//   msg[this.name] = this.value;
// }

// options.forEach(option => {
//   option.addEventListener("change", setOption);
//   option.addEventListener("input", setOption);
// });


// // Speak function
// function speak() {
//   const text = document.querySelector('[name="text"]').value.trim();

//   // Don't speak if text is empty
//   if (!text) {
//     return;
//   }

//   // Stop any existing speech
//   speechSynthesis.cancel();

//   msg.text = text;

//   speechSynthesis.speak(msg);
// }


// // Speak button
// speakButton.addEventListener("click", speak);


// // Stop button
// stopButton.addEventListener("click", function () {
//   speechSynthesis.cancel();
// });