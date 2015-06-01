function createWindows(file, finished) {
   $.ajax({
       url: file,
       success: function (data) {
            for(var i = 0; i < data.windows.length; i++) {
                (function() {
                    var offset = {x: 0, y: 0};
                    var active = false;
                    var wData = data.windows[i];
                    $('<div>').attr({
                        'class': 'window',
                        'id': wData.id
                    }).append(
                        $("<div>").attr({
                            'class': 'head'
                        }).append(
                            $("<div>").attr({
                                'class': 'title'
                            }).html(wData.title).on('mousedown', function (evt) {
                                offset.x = evt.pageX - $('#' + wData.id).offset().left;
                                offset.y = evt.pageY - $('#' + wData.id).offset().top;
                                active = true;
                            }).on('mouseup', function(evt) {
                                active = false;
                            })
                        ).append(
                            $("<div>").attr({
                                'class': 'close'
                            }).html('x').on('click', function() {
                                $('#' + wData.id).hide();
                            })
                        )
                    ).append(
                        $("<div>").attr({
                            'class': 'body'
                        })
                    ).appendTo('body')

                    $(document).on('mousemove', function (evt) {
                        if (active) {
                            evt.preventDefault();
                            document.getSelection().removeAllRanges();
                            $('#' + wData.id).css({
                                'left': (evt.pageX - offset.x) + 'px',
                                'top': (evt.pageY - offset.y) + 'px'
                            });
                        }
                    });

                    if(wData.x) {
                        $('#' + wData.id).css('left', wData.x);
                    }

                    if(wData.y) {
                        $('#' + wData.id).css('top', wData.y);
                    }
                })();
            }
       }
   }).success(finished);
}
