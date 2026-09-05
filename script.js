
  let voices = [];

  const voicesDropdown = document.querySelector('[name="voice"]');
  const rateControl = document.querySelector('[name="rate"]');
  const pitchControl = document.querySelector('[name="pitch"]');
  const textArea = document.querySelector('[name="text"]');

  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');


  // ==========================================
  // GET AND POPULATE VOICES
  // ==========================================

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

    voices.forEach(function (voice, index) {
      const option = document.createElement("option");

      option.value = index;
      option.textContent = `${voice.name} (${voice.lang})`;

      voicesDropdown.appendChild(option);
    });

    voicesDropdown.value = "0";
  }


  // ==========================================
  // LOAD VOICES
  // ==========================================

  populateVoices();

  speechSynthesis.onvoiceschanged = function () {
    populateVoices();
  };


  // ==========================================
  // SPEAK
  // ==========================================

  function speak() {

    const text = textArea.value.trim();

    // Don't speak empty text
    if (!text) {
      return;
    }

    // Make sure voices are available
    if (voices.length === 0) {
      populateVoices();

      if (voices.length === 0) {
        return;
      }
    }

    // Cancel previous speech
    speechSynthesis.cancel();

    // Create a fresh utterance
    const msg = new SpeechSynthesisUtterance();

    // Text
    msg.text = text;

    // Voice
    const selectedIndex = parseInt(voicesDropdown.value);

    if (!isNaN(selectedIndex) && voices[selectedIndex]) {
      msg.voice = voices[selectedIndex];
    } else {
      msg.voice = voices[0];
    }

    // Rate
    msg.rate = parseFloat(rateControl.value);

    // Pitch
    msg.pitch = parseFloat(pitchControl.value);

    // Start speech
    speechSynthesis.speak(msg);
  }


  // ==========================================
  // VOICE SELECTION
  // ==========================================

  voicesDropdown.addEventListener("change", function () {

    if (speechSynthesis.speaking) {
      speak();
    }
  });


  // ==========================================
  // RATE CONTROL
  // ==========================================

  rateControl.addEventListener("input", function () {

    if (speechSynthesis.speaking) {
      speak();
    }
  });


  // ==========================================
  // PITCH CONTROL
  // ==========================================

  pitchControl.addEventListener("input", function () {

    if (speechSynthesis.speaking) {
      speak();
    }
  });


  // ==========================================
  // SPEAK BUTTON
  // ==========================================

  speakButton.addEventListener("click", function () {
    speak();
  });


  // ==========================================
  // STOP BUTTON
  // ==========================================

  stopButton.addEventListener("click", function () {
    speechSynthesis.cancel();
  });


