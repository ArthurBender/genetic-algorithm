$(document).ready(function() {
    $(".exec-experiment").click(function() {
        if($("#experiment_word").val() && $("#experiment_population").val() && $("#experiment_mutation").val()) {

        } else {
            alert("Preencha todos os campos do formulário para continuar");
        }
    })
})