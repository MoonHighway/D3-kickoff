/*global document */

var paragraphs = document.getElementsByTagName("p");
for (var i = 0; i < paragraphs.length; i++) {
    var paragraph = paragraphs.item(i);
    paragraph.style.setProperty("color", "yellow", null);
    paragraph.style.setProperty("margin", ".5em 2em", null);
}
