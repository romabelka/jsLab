//Я Тут додав трохи jQuery, просто щоб зменшити код і показати як Bacon інтегрується з ним

$(function () {
    var element = document.getElementById('response'),
        buttons = $('button');
    var targetText = Bacon
        .fromEventTarget(document, 'mousemove')
        .filter(targetContainsText)
        .map(getTextFromEvent)
        .skipDuplicates();
    //А можна й так, Бекон викличе ці методи на об'єкті події:
    //.map('.target.textContent')
    //А от і приклад: asEventStream - метод, який Bacon додає jQuery колекціям
    var buttonPresses = buttons.asEventStream('click')
        .map(processButtonClick);

    var responses = targetText.merge(buttonPresses).flatMapLatest(postText);

    responses.onValue(processResponse)
});

function postText(text) {
    $.mockjax.clear();
    $.mockjax({
        url: "/text",
        responseTime: Math.random()*2000,
        response: function(req) {
            this.responseText =  'server: ' + req.data;
        }
    });
    return Bacon.fromPromise($.post('/text', text))
}

function targetContainsText(ev) {
    return ev.target.childNodes.length == 1 && ev.target.childNodes[0].nodeType == 3
}
function getTextFromEvent(ev) {
    return ev.target.textContent
}
function processButtonClick(ev) {
    return 'Our dear user has clicked the ' + ev.currentTarget.value + ' button'
}
function processResponse(response) {
    element.innerHTML = response
}