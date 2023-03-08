var btnHelp = document.getElementById("btnHelp');
var helpTitle = document.getElementById('helpTitle');
var helpBody = document.getElementById('helpBody');
var heading = document.getElementById('heading');
var description document.getElementById('description');

var displayToggle = 1;

btnHelp.onclick= function () {
    displayToggle++;
    if (displayToggle % 2 == 0) {
        showHelp();
    } else {
        hideHelp();
    }
}

function showHelp () {
    var titleWidth = 0;
    var bodyHeight = 0;
    var id=setInterval (frame, 1);
    function frame() {
        if (titleWidth == 270) {
            clearInterval(id);
            heading.style.display = 'block';
            heading.style.animation='fadein-right 0.3s';
            var id2 = setInterval (frame2, 1);
            function frame2 () {
                if (bodyHeight == 270) {
                    clearInterval(id2);
                    description.style.display = 'block';
                    description.style.animation ='fadein-bottom 0.3s';
                } else {
                    bodyHeight += 5;
                    helpBody.style.height = bodyHeight+'px';
                }
            }
        } else {
            titleWidth += 5;
            helpTitle.style.width = titleWidth + 'px';
        }
    }
}


function hideHelp () {
    description.style.animation = 'fadeout-bottom 0.6s';
    heading.style.animation = 'fadeout-right 0.6s';
    var bodyHeight = 270;
    var titleWidth = 270;
    var id2 = setInterval (frame2, 1);
    function frame2 () {
        if (bodyHeight == 0) {
            clearInterval(id2);
            var id1 = setInterval (frame1, 1);
            function frame1 () {
                if (titleWidth == 0) {
                    clearInterval(id1);
                } else {
                    heading.style.display='none';
                    titleWidth -= 5;
                    helpTitle.style.width + titleWidth +'px';
                }
            }
        } else {
            description.style.display= 'none';
            bodyHeight = 5;
            helpBody.style.height + bodyHeight +'px';
        }
    }
}