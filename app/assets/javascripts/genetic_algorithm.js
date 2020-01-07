const ALPHABET_ARRAY = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' '];

function discover_word(word, population, mutation, last_result_el, generations_el, fitness_el, results_history_el) {
    var firstGenerationReturn = firstGeneration(word, population, last_result_el);
    if (firstGeneration == true) {
        alert("CARAIO QUE CAGADA IRMAO");
    } else {
        results_history_el.text(firstGenerationReturn.join("\n"));
    }
};

function firstGeneration(word, population, last_result_el) {
    var seedArray = [];

    for (var i = 0; i < population; i++) {
        var temp_word = "";
        for (var n = 0; n < word.length; n++) {
            temp_word += ALPHABET_ARRAY[Math.floor(Math.random() * ALPHABET_ARRAY.length)];
        }

        last_result_el.text(temp_word);

        if (temp_word == word) {
            return true;
        } else {
            seedArray.push(temp_word);
        }
    }

    return seedArray;
};