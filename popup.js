function rotateDiscussion(id) {
    var elem  = document.getElementById(id),
        value = elem.value;
    var children = elem.children;
    if (parseFloat(value) != NaN) {
        elem.style.transform = 'rotate(180deg)';
        for (var i = 0; i < children.length; i++){
          children[i].style.transform = 'rotate(-180deg)';
        }
    }
}

const path = location.pathname.split("/");
if (path.length > 4 && parseInt(path[4]) > 0){
  rotateDiscussion('notes-list');
}
