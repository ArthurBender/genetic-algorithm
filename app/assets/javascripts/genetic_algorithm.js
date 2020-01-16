const ALPHABET_ARRAY = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' '];

self.addEventListener('message', function(e) {
    discover_word(e.data.form_word, e.data.form_population, e.data.form_mutation);
}, false);


function discover_word(word, population, mutation) {
    var generations_count = 1;
    var current_generation = firstGeneration(word, population);
    while(current_generation != true) {
        postMessage(["new_generation", "Generations: " + generations_count, current_generation.join("\n")])

        var wordsPercentage = calculateFitness(current_generation, word);

        current_generation = generateNewGeneration(population, wordsPercentage, word, mutation);
        generations_count++;
    }
};

function firstGeneration(word, population) {
    var seedArray = [];

    for (var i = 0; i < population; i++) {
        var temp_word = "";
        for (var n = 0; n < word.length; n++) {
            temp_word += ALPHABET_ARRAY[Math.floor(Math.random() * ALPHABET_ARRAY.length)];
        }

        postMessage(["last_el", temp_word]);

        if (temp_word == word) {
            return true;
        } else {
            seedArray.push(temp_word);
        }
    }

    return seedArray;
};

function calculateFitness(generationArray, word) {
    var fitArray = [];
    for(var i = 0; i < generationArray.length; i++) {
        var fitScore = 0;
        for(var l = 0; l < word.length; l++) {
            if(generationArray[i][l] == word[l]) {
                fitScore += 1;
            }
        }
        fitArray.push(fitScore);
    }

    var scorePercentagePiece = 100.0 / fitArray.reduce((a,b) => a + b, 0);
    var totalPercentage = 0.0;
    var wordsPercentage = [];

    for(var i = 0; i < fitArray.length; i++) {
        if(fitArray[i] != 0) {
            totalPercentage += fitArray[i] * scorePercentagePiece;
            wordsPercentage.push({percentage: totalPercentage, word: generationArray[i]});
        } else {
            wordsPercentage.push({percentage: 0, word: generationArray[i]});
        }
    }

    return wordsPercentage;
}

function generateNewGeneration(population, wordsPercentage, word, mutation) {
    var popArray = [];
    for(var i = 0; i < population; i++) {
        var child_word = "";
        var father_word = "";
        var random_percentage = Math.random() * 100;

        for(var w = 0; w < wordsPercentage.length; w++) {
            if(random_percentage <= wordsPercentage[w].percentage) {
                father_word = wordsPercentage[w].word;
            }
        }

        var mother_word = "";
        while(mother_word == "") {
            random_percentage = Math.random() * 100;
            for(var w = 0; w < wordsPercentage.length; w++) {
                if(random_percentage <= wordsPercentage[w].percentage && wordsPercentage[w].word != father_word) {
                    mother_word = wordsPercentage[w].word
                }
            }
        }

        var divider = Math.floor(Math.random() * (word.length - 2) + 1);
        child_word += father_word.substr(0, divider);
        child_word += mother_word.substr(divider);

        for(var l = 0; l < child_word.length; l++) {
            var mutation_try = Math.random() * 100;
            if(mutation_try <= mutation) {
                var mutated_character = ALPHABET_ARRAY[Math.floor(Math.random() * ALPHABET_ARRAY.length)];
                child_word = child_word.substr(0, l) + mutated_character + child_word.substr(l+1);
            }
        }

        postMessage(["last_el", child_word]);
        popArray.push(child_word);

        if(child_word == word) {
            return true;
        }
    }
    return popArray;
}