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
//= require turbolinks
//= require jquery3
//= require_tree .
//= require popper
//= require bootstrap-sprockets

const AIWorker = new Worker("/assets/genetic_algorithm.js");

$(document).ready(function() {
    var result_last = $("#last-result");
    var result_generations = $("#generations");
    var result_fitness = $("#fitness");
    var results_history = $("#results-history");

    $(".exec-experiment").click(function() {
        if($("#experiment_word").val() && $("#experiment_population").val() && $("#experiment_mutation").val()) {
            var form_word = $("#experiment_word").val();
            var form_population = $("#experiment_population").val();
            var form_mutation = $("#experiment_mutation").val();

            var function_hash = {form_word: form_word, form_population: form_population, form_mutation: form_mutation}

            AIWorker.postMessage(function_hash);
        } else {
            alert("Preencha todos os campos do formulário para continuar");
        }
    })

    AIWorker.onmessage = function(e) {
        if(e.data[0] == "last_element") {
            result_last.text(e.data[1]);
        } else if (e.data[0] == "new_generation") {
            result_generations.text(e.data[1]);
            results_history.text(e.data[2]);
        }
    }
})