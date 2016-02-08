"use strict";
$(document).ready(function() {
    $("#projects").html('<tr><td colspan="4">Ladataan sisältöä...</td></tr>');
    var json_url = window.location.pathname;

    if (window.location.pathname.endsWith('/')) {
        json_url = json_url.substring(0, json_url.length - 1);
    }

    $.getJSON(json_url + "/projects.json", function(data) {
        $("#projects").html("");

        data.projects.sort(function(a, b) {
            var ownerA = a.owner.toLowerCase();
            var ownerB = b.owner.toLowerCase();
            return ownerA.localeCompare(ownerB);
        });

        $.each(data.projects, function(index, row) {
            var codeUrl = '-',
                serviceUrl = '-';

            if (row.code_url.length > 1) {
                codeUrl = "<a href='" + $("<td>").text(row.code_url).html() + "'>N&auml;yt&auml; l&auml;hdekoodi</a>";
            }

            if (row.service_url.length > 1) {
                serviceUrl = "<a href='" + $("<td>").text(row.service_url).html() + "'>Siirry palveluun</a>";
            }

            $("#projects").append("<tr>" +
                "<td>"+ $("<td>").text(row.owner).html() + "</td>" +
                "<td>" + $("<td>").text(row.project).html() + "</td>" +
                "<td>" + codeUrl + "</td>" +
                "<td>" + serviceUrl + "</td>" +
                "</tr>");
        });
    });
});
