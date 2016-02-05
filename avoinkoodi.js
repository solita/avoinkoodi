$(document).ready(function() {
    $("#projects").html('<tr><td colspan="3">Ladataan sisältöä...</td></tr>');
    $.getJSON("https://raw.githubusercontent.com/solita/avoinkoodi/master/projects.json", function(data) {
        $("#projects").html("");
        $.each(data.projects, function(index, row) {
            $("#projects").append("<tr><td>"+ row.owner + "</td><td>" + row.project + "</td><td><a href='" + row.code_url + "'>" + row.code_url + "</a></td></tr>");
        });
    });
});
