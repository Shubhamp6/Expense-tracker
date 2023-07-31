const englishLang = require("./english.lang");

const _lang = (word, lang = "eng") => {
	switch (lang) {
		case "eng":
			return englishLang[word] ? englishLang[word] : word;
		default:
			return englishLang[word] ? englishLang[word] : word;
	}
};

module.exports = _lang;
