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

$(document).ready(function() {
    $(".exec-experiment").click(function() {
        if($("#experiment_word").val() && $("#experiment_population").val() && $("#experiment_mutation").val()) {
            var form_word = $("#experiment_word").val();
            var form_population = $("#experiment_population").val();
            var form_mutation = $("#experiment_mutation").val();

            var result_last = $("#last-result");
            var result_generations = $("#generations");
            var result_fitness = $("#fitness");
            var results_history = $("#results-history")

            discover_word(form_word, form_population, form_mutation, result_last, result_generations, result_fitness, results_history);
        } else {
            alert("Preencha todos os campos do formulário para continuar");
        }
    })
})