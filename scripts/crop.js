var image_workspace = document.querySelector(".image-workspace img");
var title = document.getElementById("current-title");
var job = document.getElementById("current-job");
var actionButton = document.querySelectorAll(".action-button button");
var hiddenUpload = document.querySelector(".action-button .hidden-upload");
var image_workspaceSpan = document.querySelector(".image-workspace span");
var imagePreview_display = document.querySelector(".img-preview img");
var preview_containerSpan = document.querySelector(".preview-container span");
var nameBox = document.getElementById("name-input");

// Prepare canvas
var canvas;
var ctx;
var croppedImage;
var cropper;
setTimeout(() => {
    canvas = document.getElementById("banner-canvas");
    canvas.width = 1068;
    canvas.height = 293; // this is fucking dumb istg
    ctx = canvas.getContext("2d");
}, 1000);

//Create map for backgrounds
const roles = new Map([
    ["PLD", "tank.png"],
    ["WAR", "tank.png"],
    ["DRK", "tank.png"],
    ["GNB", "tank.png"],
    ["WHM", "healer.png"],
    ["AST", "healer.png"],
    ["SCH", "healer.png"],
    ["SGE", "healer.png"]
]);

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
                //Get cropped image
                croppedImage = this.cropper.getCroppedCanvas().toDataURL("image/png");
                
                drawBgWol(ctx, croppedImage);
                drawJobIcon(ctx);
            })
            
        }
    }
    //Initialize cropperjs
    cropper = new Cropper(image_workspace, options);

    actionButton[1].onclick = () => {
        var filename = nameBox.value + " Banner.png";
        var link = document.createElement('a');
        link.download = filename;
        link.href = document.getElementById("banner-canvas").toDataURL();
        link.click();
    }
}

nameBox.addEventListener("keyup", () => {
    drawBgWol(ctx, croppedImage);
    drawJobIcon(ctx);
})

function drawBgWol(ctx, croppedImage) {
    var background = new Image();
    var wol = new Image();
    //Change background according to the job type
    if (roles.has(job.innerText)) {
        background.src = "images/roles/" + roles.get(job.innerText);
    }
    else {
        background.src = "images/roles/dps.png";
    }
    //Paste background on canvas
    background.onload = function() {
        ctx.drawImage(background, 0, 0, 1068, 293);
        //Create mask for wol image
        ctx.globalCompositeOperation = "source-atop";
        //Paste cropped wol image
        wol.src = croppedImage;
        wol.onload = function() {
            ctx.drawImage(wol, 550, 0, 500, 290);
            var img = canvas.toDataURL("image/png");
            imagePreview_display.src = img;
            drawNameAndTitle(ctx); //sloppy fix for text not appearing on canvas
        }
    }
    
}

function drawJobIcon(ctx) {
    var jobIcon = new Image();
    jobIcon.src = "images/jobs/" + job.innerText.toLowerCase() + ".png";
    jobIcon.onload = function() {
        ctx.drawImage(jobIcon, 0, 0);
        
    }
    var img = canvas.toDataURL("image/png");
    imagePreview_display.src = img;
}

function drawNameAndTitle(ctx) {
    ctx.font = '65px trajan-pro-regular';
    ctx.fillStyle = "#fff799"
    ctx.fillText(title.innerText, 95, 76, 500);

    ctx.font = "62px eurostileextended-roman-dtc-regular"
    ctx.fillStyle = "#f1e9cf";
    
    ctx.fillText(nameBox.value.toUpperCase(), 35, 265, 700);

    var img = canvas.toDataURL("image/png");
    imagePreview_display.src = img;
}