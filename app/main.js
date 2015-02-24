$(function(){
    var name = Bacon.fromEvent(document.getElementById('myInp'), 'keyup')
        .map(function(ev) {
            return ev.currentTarget.value
        }).toProperty('');
    name.log('name is ');
});
