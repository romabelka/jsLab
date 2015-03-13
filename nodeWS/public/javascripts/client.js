$(function() {
    var ws = new WebSocket('ws://localhost:3000'),
        wsEvents = Bacon.fromEventTarget(ws , 'message', function(ev) {
            return ev.data
        }),
        buttons = $('button'),
        clicks = buttons.asEventStream('click').map(function(ev) {
            return $(ev.currentTarget).text()
        });

    clicks.onValue(ws.send.bind(ws));
    wsEvents.log();

    ws.onopen = function() {
        buttons.attr('disabled', false);
    };
    ws.onclose = function() {
        buttons.attr('disabled', true);
    };
});