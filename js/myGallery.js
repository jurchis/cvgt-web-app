window.MyGallery = {
    API_BASE_URL: "http://localhost:8085",

    runCv: function () {
        $.ajax({
            url: MyGallery.API_BASE_URL + "/my-gallery/",
            method: "POST"
        }).done(function () {
            console.log("Running Python");
        })
    },

    getMyGallery: function () {
        let customerId = 40;
        $.ajax({
            url: MyGallery.API_BASE_URL + "/my-gallery/" + customerId
        }).done(function (response) {
            console.log(response);

            MyGallery.displayMyGallery(response.medias);
        });
    },

    deleteMediaFromMyGallery: function (mediaId) {
        let request = {
            userId: 40,
            mediaId: mediaId
        };

        $.ajax({
            url: MyGallery.API_BASE_URL + "/my-gallery/",
            method: "DELETE",
            contentType: "application/json",
            data: JSON.stringify(request)
        }).done(function () {
            console.log("Deleted from Gallery");
            location.reload();
            $('#added-success').show();
        })
    },

    getMyMediaHtml: function (media) {
        return `<div class="responsive">
                <div class="gallery">
                  <a target="_blank" href=${media.imageUrl}>
                    <img src=${media.imageUrl} alt="" width="600px" height="400px" style="width:350px;height:250px;" class="center">
                  </a>
                  <div class="desc">${media.description}</div>
                  <button type="button" id="run" class="btn-light btn-sm btn-block" data-media_url="${media.imageUrl}>Run CV Code</button>
                  <button type="button" id="delete" class="btn btn-danger btn-sm btn-block" data-media_id="${media.id}">Remove</button>
                </div></div>`
    },

    displayMyGallery: function (myGallery) {
        let myGalleryHtml = "";

        myGallery.forEach(oneMedia => myGalleryHtml += MyGallery.getMyMediaHtml(oneMedia));

        $(".separator").html(myGalleryHtml);
    },

    bindEvents: function () {
        $(".separator").delegate("#delete", "click", function (event) {
            event.preventDefault();

            let mediaId = $(this).data("media_id");
            MyGallery.deleteMediaFromMyGallery(mediaId);
        });
    },

    runPyCv: function () {
        $(".separator").delegate("#run", "click", function (event) {
            event.preventDefault();

            let imageURL = $(this).data("media_url");
            MyGallery.runCv();
        });
    }
};

MyGallery.getMyGallery();
MyGallery.bindEvents();
MyGallery.runPyCv();
