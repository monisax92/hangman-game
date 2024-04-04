const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const popup = document.getElementById("popup-container");
const repetition = document.getElementById("repeat-container");
const finalMsg = document.getElementById("final-msg");
const playBtn = document.getElementById("play-btn");

const manParts = document.querySelectorAll(".man-part");

const wordsDB = [
	"something",
	"elephant",
	"house",
	"crocodile",
	"coffee",
	"radio",
	"wardrobe"
];
let selectedWord = wordsDB[Math.floor(Math.random() * wordsDB.length)];

const guessedLetters = [];
const wrongLetters = [];

const displayWord = () => {
	wordEl.innerHTML = `
	${selectedWord
		.split("")
		.map(
			(letter) =>
				`<span class="letter">
			${guessedLetters.includes(letter) ? letter : ""}
		</span>`
		)
		.join("")}`;

	//remove new line after each letter
	const innerWord = wordEl.innerText.replace(/\n/g, "");

	//check if win
	if (innerWord === selectedWord) {
		finalMsg.innerText = "You won!";
		popup.style.display = "flex";
	}
};

const showRepeatNoti = () => {
	repetition.classList.add("show");
	setTimeout(() => {
		repetition.classList.remove("show");
	}, 2000);
};

const updateWrongLetters = () => {
	wrongLettersEl.innerHTML = `
	${wrongLetters.length > 0 ? "<p>Wrong:</p>" : ""}
	${wrongLetters.map((letter) => `<span>${letter}</span>`)}
	`;

	manParts.forEach((part, index) => {
		const errorsNr = wrongLetters.length;

		if (index < errorsNr) {
			part.style.display = "block";
		} else {
			part.style.display = "none";
		}

		//lost scenario
		if (wrongLetters.length === manParts.length) {
			finalMsg.innerText = "You lost :(";
			popup.style.display = "flex";
		}
	});
};

displayWord();

window.addEventListener("keydown", (e) => {
	if (e.keyCode >= 65 && e.keyCode <= 90) {
		const letter = e.key;

		if (selectedWord.includes(letter)) {
			if (!guessedLetters.includes(letter)) {
				guessedLetters.push(letter);
				displayWord();
			} else {
				showRepeatNoti();
			}
		} else {
			if (!wrongLetters.includes(letter)) {
				wrongLetters.push(letter);
				updateWrongLetters();
			} else {
				showRepeatNoti();
			}
		}
	}
});

playBtn.addEventListener("click", () => {
	guessedLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = wordsDB[Math.floor(Math.random() * wordsDB.length)];

	displayWord();
	updateWrongLetters();

	popup.style.display = "none";
});
