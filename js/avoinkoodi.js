$(document).ready(function() {
    $("#projects").html('<tr><td colspan="3">Ladataan sisältöä...</td></tr>');
    json_url = window.location.pathname;

    if (window.location.pathname.endsWith('/')) {
        json_url = json_url.substring(0, json_url.length - 1);
    }

    $.getJSON(json_url + "/projects.json", function(data) {
        $("#projects").html("");

        data.projects.sort(function(a, b) {
            ownerA = a.owner.toLowerCase();
            ownerB = b.owner.toLowerCase();

            return ownerA.localeCompare(ownerB);
        });

        $.each(data.projects, function(index, row) {
            $("#projects").append("<tr><td>"+ row.owner + "</td><td>" + row.project + "</td><td><a href='" + row.code_url + "'>" + row.code_url + "</a></td>" +
                    "<td><a href='" + row.service_url + "'>" + row.service_url + "</a></td>" +
                    "</tr>");
        });
    });
});
