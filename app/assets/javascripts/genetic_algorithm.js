var ALPHABET_ARRAY = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
                        'á', 'à', 'ã', 'â', 'é', 'ê', 'í', 'ó', 'ô', 'ú', 'Á', 'À', 'Ã', 'Â', 'Ẽ', 'Ê', 'Í', 'Ó', 'Ò', 'Ú',
                        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
                        ' ', '.', ',', '\"', '\'', '!', '-', '?', '(', ')', '/', ';', '<', '>'];

self.addEventListener('message', function(e) {
    discover_word(e.data.form_word, e.data.form_population, e.data.form_mutation);
}, false);


function discover_word(word, population, mutation) {
    var generations_count = 1;
    var all_fitness_array = [];
    var current_generation = firstGeneration(word, population);
    while(bestWord != word) {
        
        var wordsFitness = calculateFitness(current_generation, word);

        var bestWord = findBest(wordsFitness);

        for(var i = 0; i < wordsFitness.length; i++) {
            all_fitness_array.push(wordsFitness[i].fitness);
        }

        postMessage([bestWord, "Generations: " + generations_count, current_generation.join("\n")])

        current_generation = generateNewGeneration(population, wordsFitness, word, mutation);
        generations_count++;
    }

    var fitness_median = 0;
    for(var i = 0; i < all_fitness_array.length; i++) {
        fitness_median += all_fitness_array[i];
    }
    fitness_median = fitness_median / all_fitness_array.length;

    postMessage([true, fitness_median]);
};

function firstGeneration(word, population) {
    var seedArray = [];

    for (var i = 0; i < population; i++) {
        var temp_word = "";
        for (var n = 0; n < word.length; n++) {
            temp_word += ALPHABET_ARRAY[Math.floor(Math.random() * ALPHABET_ARRAY.length)];
        }
        seedArray.push(temp_word);
    }

    return seedArray;
};

function calculateFitness(generationArray, word) {
    var fitArray = [];

    var uniqGenerationArray = []
    for(var i = 0; i < generationArray.length; i++) {
        if(uniqGenerationArray.includes(generationArray[i]) == false) {
            uniqGenerationArray.push(generationArray[i]);
        }
    }

    generationArray = uniqGenerationArray;

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

        popArray.push(child_word);
    }
    return popArray;
}

function findBest(wordsFitness) {
    var bestFitness = 0;
    var bestWord = "";

    for(var i = 0; i < wordsFitness.length; i++) {
        if(wordsFitness[i].fitness > bestFitness) {
            bestFitness = wordsFitness[i].fitness;
            bestWord = wordsFitness[i].word;
        }
    }

    return bestWord;
}