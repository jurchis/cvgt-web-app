window.MyGallery = {
    API_BASE_URL: "http://localhost:8085",

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
        var request = {
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
                    <img src=${media.imageUrl} alt="" width="600" height="400">
                  </a>
                  <div class="desc">${media.description}</div>
                  <button type="button" id="run" class="
                   btn-light btn-sm btn-block">Run CV Code</button>
                  <button type="button" id="delete" class="btn btn-danger btn-sm btn-block" data-media_id="${media.id}">Remove</button>
                </div></div>`
    },

    displayMyGallery: function (myGallery) {
        var myGalleryHtml = "";

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

};

MyGallery.getMyGallery();
MyGallery.bindEvents();

