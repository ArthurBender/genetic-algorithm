// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require jquery3
//= require_tree .
//= require popper
//= require bootstrap-sprockets

var AIWorker = new Worker("/assets/genetic_algorithm.js");
var process_start_time, process_end_time;

$(document).ready(function() {
    var result_last = $("#last-result");
    var result_generations = $("#generations");
    var result_fitness = $("#fitness");
    var results_history = $("#results-history");
    var results_time = $("#time_spent");

    $(".exec-experiment").click(function() {
        var charactersRight = checkCharacters($("#experiment_word").val());
        if($("#experiment_word").val() && $("#experiment_population").val() && $("#experiment_mutation").val() && charactersRight) {
            $(".exec-experiment").attr('disabled', true);
            $(".save-experiment").attr('disabled', true);
            results_history.removeClass('d-none');

            var form_word = $("#experiment_word").val();
            var form_population = $("#experiment_population").val();
            var form_mutation = $("#experiment_mutation").val();

            var function_hash = {form_word: form_word, form_population: form_population, form_mutation: form_mutation}

            process_start_time = new Date;
            AIWorker.postMessage(function_hash);
        } else {
            alert("Preencha todos os campos do formulário para continuar");
        }
    })

    AIWorker.onmessage = function(e) {
        if(e.data[0] === true) {
            result_fitness.text("Fitness Median: " +  Math.round(e.data[1] * 100) / 100);
            process_end_time = new Date;

            results_time.text("Time Spent: " + (Math.round((process_end_time - process_start_time) / 100) / 10) + "s");
            $(".exec-experiment").removeAttr('disabled');
            $(".save-experiment").removeAttr('disabled');
        } else {
            result_last.text(e.data[0]);
            result_generations.text(e.data[1]);
            results_history.text(e.data[2]);
        }
    }

    $(".save-experiment").click(function() {
        var generations = result_generations.text().substr(12);
        $("#experiment_generations").val(generations)

        var fitness = result_fitness.text().substr(15);
        $("#experiment_fitness").val(fitness);

        var time = results_time.text().substr(11);
        $("#experiment_time").val(time);
        
        $(".form-submit").click();
    });

    function checkCharacters(word) {
        var wrong_chars = []
        for(var i = 0; i < word.length; i++) {
            if(!ALPHABET_ARRAY.includes(word[i])) {
                wrong_chars.push(word[i]);
            }
        }

        if(wrong_chars.length > 0) {
            alert("Unsuported characters found: " + wrong_chars.join(", "));
            return false;
        }
        return true;
    }
})