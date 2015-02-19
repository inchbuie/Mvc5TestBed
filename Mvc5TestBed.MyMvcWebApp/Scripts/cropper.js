
var jCropApi = {};
//var currentCropSelection = {};

function dragOverEvent(event) {
    console.log("dragover");
    event.preventDefault();

    //event.target.style.border = "2px solid #9ecaed";
    $(event.target).css("outline", "none");
    $(event.target).css("border-color", "#9ecaed");
    $(event.target).css("box-shadow", "1px 1px 10px #9ecaed");
}

function dragLeaveEvent(event) {
    console.log("dragleave");
    event.preventDefault();
    $(event.target).css("border-color", "");
    $(event.target).css("box-shadow", "");
    event.target.style.border = "1px solid #cccccc";
}

function dragDropEvent(event) {
    console.log("drop");
    event.preventDefault();
    // Ready to do something with the dropped object
    event.target.style.border = "1px solid #cccccc";
    reportUploadInfo(event.dataTransfer.files);
    if (event.dataTransfer.files.length > 0) {
        previewImage(event.dataTransfer.files[0]);
    }
}

//$("#imageFileInput").change(function () {
//    reportUploadInfo(this.files);
//    if (this.files && this.files.length > 0) {
//        previewImage(this.files[0]);
//    }
//});
function fileInputChangeEvent() {
    reportUploadInfo(this.files);
    if (this.files && this.files.length > 0) {
        previewImage(this.files[0]);
    }
}

function cropChangeEvent(c) {
    // variables can be accessed here as
    // c.x, c.y, c.x2, c.y2, c.w, c.h
    console.log(c.x + "," + c.y + "," + c.x2 + "," + c.y2 + "," + c.w + "," + c.h)
};

function cropSelectEvent(selection) {

    console.log(selection.x + "," + selection.y + "," + selection.w + "," + selection.h)

    var img = $('#dropzone img')[0];
    var canvas = document.createElement("canvas");

    var w = $("#dropzone").width();
    canvas.width = w;
    canvas.height = selection.h * (w / selection.w);
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, selection.x, selection.y, selection.w, selection.h, 0, 0, canvas.width, canvas.height);

    //store selected edited as a data url in the hidden input
    $("#hiddenImageData").val(canvas.toDataURL().slice("data:image/png;base64,".length));

};

function reportUploadInfo(fileList) {

    var label = $("#dragInfo");
    label.html("You've just chosen" + fileList.length + " file(s)");
    var ul = $("#draggedFiles");
    ul.empty();

    for (var i = 0; i < fileList.length; i++) {
        var li = document.createElement("li");
        $(li).html(fileList[i].name);
        ul.append(li);
    }
}

function previewImage(imageFile) {
    var reader = new FileReader();
    reader.onload = (function (theFile) {

        return function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                var canvas = document.createElement("canvas");

                var w = $("#dropzone").width();
                canvas.width = w;
                canvas.height = image.height * (w / image.width);
                var context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, canvas.width, canvas.height);

                var dataUrl = canvas.toDataURL();
                var lengthToIgnore = "data:image/png;base64,".length;
                if (ValidateImageFile(dataUrl, lengthToIgnore)) {
                    //set hidden input to have contents of whatever (possibly edited) image is showing
                    $("#hiddenImageData").val(dataUrl.slice(lengthToIgnore));
                    //show the image on the page
                    $("#dropzone").html(['<img src="', dataUrl, '"/>'].join(''));
                } else {
                    //uh oh...
                    alert("Error attempting to read image file. Try a different format like .jpg, .gif, or .png. Contact support if the problem continues.")
                }
            };
        }
    })(imageFile);

    reader.readAsDataURL(imageFile);
    $('#cropButton').prop('disabled', false);
}

//returns a square centered within the provided dimensions
// for setting initial crop selection within uploaded image
function calcInternalSquareSize(externalWidth, externalHeight) {
    console.log("w: " + externalWidth + ", h:" + externalHeight);

    var startX = 0;
    var startY = 0;
    var endX = externalWidth;
    var endY = externalHeight;
    var squareSideLength = 1.0;

    if (externalWidth < externalHeight) {
        // narrow rectangle
        squareSideLength = externalWidth / 2;
        startX = Math.ceil(squareSideLength / 2);
        startY = Math.ceil(externalHeight / 2 - squareSideLength / 2);
    } else {
        // wide rectangle or square
        squareSideLength = externalHeight / 2;
        startX = Math.ceil(externalWidth / 2 - squareSideLength / 2);
        startY = Math.ceil(squareSideLength / 2);
    }
    endX = startX + squareSideLength;
    endY = startY + squareSideLength;
    console.log("(" + startX + "," + startY + "), (" + endX + "," + endY + ")");
    return [startX, startY, endX, endY];
}

$("#cropButton").click(function () {

    if ($("#dropzone img").length > 0) {

        $('#imageFileInput').prop('disabled', true);
        $('#frmSubmit').prop('disabled', true);
        $('#cropButton').prop('disabled', true);
        $('#doneWithCropButton').prop('disabled', false);

        var imageToCrop = $("#dropzone img")[0];
        //var initialSelectBox = [startX, startY, endX, endY];
        var initialSelectBox = calcInternalSquareSize(imageToCrop.width, imageToCrop.height);

        $("#dropzone img").Jcrop({
            bgColor: 'black',
            bgOpacity: .6,
            setSelect: initialSelectBox,
            aspectRatio: 1,
            onSelect: cropSelectEvent,
            onChange: cropChangeEvent
        }, function () {
            //store jCrop reference in global
            jCropApi = this;
        });

        //or
        //jCropApi.animateTo(initialSelectBox);
    }
});

$("#doneWithCropButton").click(function () {

    var imageFromCrop = document.createElement("img");
    imageFromCrop.src = "data:image/png;base64," + $("#hiddenImageData").val();
    $("#dropzone").html(imageFromCrop);

    if (jCropApi) {
        jCropApi.release();
        jCropApi.disable();
    }

    $('#imageFileInput').prop('disabled', false);
    $('#frmSubmit').prop('disabled', false);
    $('#cropButton').prop('disabled', false);
    $('#doneWithCropButton').prop('disabled', true);
});

function ValidateImageFile(fileDataUrl, numBytesToIgnore) {
    //TODO
    return true;
};

$(document).ready(function () {
    dropzone.addEventListener("dragover", dragOverEvent, true);
    dropzone.addEventListener("dragleave", dragLeaveEvent, true);
    dropzone.addEventListener("drop", dragDropEvent, true);

    $("#imageFileInput").change(fileInputChangeEvent);

});