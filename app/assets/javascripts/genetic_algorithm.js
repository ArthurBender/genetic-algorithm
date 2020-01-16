const ALPHABET_ARRAY = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' '];

self.addEventListener('message', function(e) {
    discover_word(e.data.form_word, e.data.form_population, e.data.form_mutation);
}, false);


function discover_word(word, population, mutation) {
    var generations_count = 1;
    var current_generation = firstGeneration(word, population);
    postMessage(["new_generation", "Generations: " + generations_count, current_generation.join("\n")])
    while(current_generation != true) {
        
        var wordsFitness = calculateFitness(current_generation, word);

        current_generation = generateNewGeneration(population, wordsFitness, word, mutation);
        postMessage(["new_generation", "Generations: " + generations_count, current_generation.join("\n")])
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

        postMessage(["last_element", temp_word]);

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

    var wordsFitness = [];

    for(var i = 0; i < fitArray.length; i++) {
        wordsFitness.push({fitness: fitArray[i] / word.length, word: generationArray[i]});
    }

    return wordsFitness;
}

function generateNewGeneration(population, wordsFitness, word, mutation) {
    var matingArray = []
    for(var i = 0; i < wordsFitness.length; i++) {
        for(var n = 0; n < Math.floor(wordsFitness[i].fitness * 100) + 1; n++) {
            matingArray.push(wordsFitness[i].word);
        }
    }

    var popArray = [];
    for(var i = 0; i < population; i++) {
        var child_word = "";
        var father_word = "";
        var mother_word = "";
        
        father_word = matingArray[Math.floor(Math.random() * matingArray.length)];
        mother_word = matingArray[Math.floor(Math.random() * matingArray.length)];

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

        postMessage(["last_element", child_word]);
        popArray.push(child_word);

        if(child_word == word) {
            return true;
        }
    }
    return popArray;
}