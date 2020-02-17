window.Gallery = {
    API_BASE_URL: "http://localhost:8085",

    getMedias: function () {
        $.ajax({
            url: Gallery.API_BASE_URL + "/medias"
        }).done(function (response) {
            console.log(response);
            Gallery.displayMedias(response.content);
        });
    },

    addMediaToMyGallery: function (mediaId) {
        var request = {
            userId: 40,
            mediaId: mediaId
        };

        $.ajax({
            url: Gallery.API_BASE_URL + "/my-gallery",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(request)
        }).done(function () {
            console.log("Added to Gallery");
        })
    },

    getMediaHtml: function (media) {
        return `<div class="responsive">
                    <div class="gallery">
                    <a target="_blank" href=#>
                      <img src=${media.imageUrl} alt="" width="600" height="400">
                    </a>
                    <div class="desc">${media.description}</div>
                    <button class="btn btn-light btn-sm btn-block"  data-media_id="${media.id}">Add to Testing Gallery</button>
                  </div></div>`
    },

    displayMedias: function (medias) {
        var mediasHtml = "";

        medias.forEach(oneMedia => mediasHtml += Gallery.getMediaHtml(oneMedia));

        $(".separator").html(mediasHtml);
    },

    bindEvents: function () {
        $(".separator").delegate(".btn", "click", function (event) {
            event.preventDefault();

            let mediaId = $(this).data("media_id");
            Gallery.addMediaToMyGallery(mediaId);
        });
    }
};

Gallery.getMedias();
Gallery.bindEvents();