// Your script here.
function populateVoices() {
    voices = speechSynthesis.getVoices();

    voicesDropdown.innerHTML = '<option value="">Select A Voice</option>';

    voices.forEach(function (voice) {
        const option = document.createElement("option");
        option.value = voice.name;
        option.textContent = voice.name;
        option.setAttribute("data-lang", voice.lang);
        voicesDropdown.appendChild(option);
    });
}

populateVoices();

speechSynthesis.addEventListener("voiceschanged", populateVoices);


// Select voice
function setVoice() {
    const selectedVoice = voices.find(
        voice => voice.name === voicesDropdown.value
    );

    msg.voice = selectedVoice;
}


// Change rate and pitch
function setOption() {
    msg[this.name] = this.value;
}


// Speak
function toggle() {
    if (msg.text.trim() === "") {
        return;
    }

    if (voices.length === 0) {
        alert("No voices available");
        return;
    }

    speechSynthesis.cancel();

    msg.text = document.querySelector('[name="text"]').value;
    setVoice();

    speechSynthesis.speak(msg);
}


// Stop
function stop() {
    speechSynthesis.cancel();
}


// Event listeners
voicesDropdown.addEventListener("change", function () {
    setVoice();

    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        speechSynthesis.speak(msg);
    }
});

options.forEach(function (option) {
    option.addEventListener("change", setOption);
    option.addEventListener("input", setOption);
});

speakButton.addEventListener("click", toggle);
stopButton.addEventListener("click", stop);