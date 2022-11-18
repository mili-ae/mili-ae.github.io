var image_workspace = document.querySelector(".image-workspace img");
var title = document.getElementById("current-title");
var job = document.getElementById("current-job");
var actionButton = document.querySelectorAll(".action-button button");
var hiddenUpload = document.querySelector(".action-button .hidden-upload");
var image_workspaceSpan = document.querySelector(".image-workspace span");
var imagePreview_display = document.querySelector(".img-preview img");
var preview_containerSpan = document.querySelector(".preview-container span");

//Upload image
actionButton[0].onclick = () => hiddenUpload.click();
hiddenUpload.onchange = () => {
    var file = hiddenUpload.files[0];
    var url = window.URL.createObjectURL(new Blob([file], { type: "image/png" }));
    image_workspace.src = url;
    image_workspaceSpan.style.display = 'none';
    preview_containerSpan.style.display = 'none'

    var options = {
        dragMode: "move",
        aspectRatio: 16/9,
        center: true,
        viewMode: 2,
        modal: false,
        background: false,
        ready: function() {
            console.log("Cropper Ready");
            
            image_workspace.addEventListener("cropend", () => {
                var croppedImage = this.cropper.getCroppedCanvas().toDataURL("image/png");

                var canvas = document.getElementById("banner-canvas");
                canvas.width = 1063;
                canvas.height = 293; // this is fucking dumb istg
                var ctx = canvas.getContext("2d");

                var background = new Image();
                var wol = new Image();

                background.src = "images/roles/dps.png";
                background.onload = function() {
                     ctx.drawImage(background, 0, 0, 1068, 293);
                     ctx.globalCompositeOperation = "source-atop";

                     wol.src = croppedImage;
                     wol.onload = function() {
                        ctx.drawImage(wol, 550, 0, 500, 290);
                        var img = canvas.toDataURL("image/png");
                        imagePreview_display.src = img;
                    }
                 }
            })
            
        }
    }

    var cropper = new Cropper(image_workspace, options);
}