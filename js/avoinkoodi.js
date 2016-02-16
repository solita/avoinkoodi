"use strict";
$(document).ready(function() {
    var $projects = $("#projects");

    $projects.html("<tr><td colspan='4'>Ladataan sisältöä...</td></tr>");

    $.getJSON("projects.json", function(data) {
        $projects.html("");

        data.projects.sort(function(a, b) {
            var ownerA = a.owner.toLowerCase();
            var ownerB = b.owner.toLowerCase();
            return ownerA.localeCompare(ownerB);
        });

        var content = data.projects.map(function (project) {
            var codeUrl = '-',
                serviceUrl = '-';

            if (project.code_url.length > 1) {
                codeUrl = "<a href='" + $("<td>").text(project.code_url).html() + "'>Näytä lähdekoodi</a>";
            }

            if (project.service_url.length > 1) {
                serviceUrl = "<a href='" + $("<td>").text(project.service_url).html() + "'>Siirry palveluun</a>";
            }

            return "<tr>" +
                   "<td>" + $("<td>").text(project.owner).html() + "</td>" +
                   "<td>" + $("<td>").text(project.project).html() + "</td>" +
                   "<td>" + codeUrl + "</td>" +
                   "<td>" + serviceUrl + "</td>" +
                   "</tr>";
        });

        $projects.html(content.join(""));
    });
});
