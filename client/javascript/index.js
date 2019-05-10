var element = document.getElementById("some-element-of-your-document");

html2canvas(element).then(function(canvas) {
    // Export the canvas to its data URI representation
    var base64image = canvas.toDataURL("image/png");

    // Open the image in a new window
    window.open(base64image , "_blank");
});