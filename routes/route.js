var { getEndIndex, getHasNext, getTickets } = require('../utilities/util');

module.exports = function (app) {
    var url = `${process.env.ZENDESK_API_BASE_URL}/api/v2/tickets`;

    app.use('/favicon.ico', (req, res, next) => {

        res.sendStatus(200);
    });
    app.get("/:id?", async (req, res) => {

        try {

            var x = await getTickets(url, process.env.ZENDESK_EMAIL_AUTH);
            const { tickets } = x.data;

            req.session.tickets = tickets;

            const { id } = req.params;

            if (id && isNaN(parseInt(id))) {

                return res.render('error', { "message": "You are not allowerd to access this page.", "status": 404 });


            }
            if (id) {
                var endIndex = getEndIndex(tickets, id, 0);
                req.session.startIndex = id;

                var hasNext = getHasNext(endIndex, tickets, 0);
                var hasPrev = parseInt(id) == 0 ? false : true;

                var prevIndex = parseInt(id) - 25;

                return res.render('listTickets', { "prevIndex": prevIndex, "tickets": tickets.slice(parseInt(id), endIndex), "hasPrev": hasPrev, "startIndex": id, "endIndex": endIndex, "length": tickets.length, "hasNext": hasNext })
            }
            else {
                req.session.startIndex = 0;

                var hasNext = getHasNext(0, tickets, 1);
                var endIndex = getEndIndex(tickets, 1);
                return res.render('listTickets', { "tickets": tickets.slice(0, 25), "hasPrev": false, "startIndex": 0, "endIndex": endIndex, "length": tickets.length, "hasNext": hasNext })

            }

        }
        catch (err) {
            console.log(err);
            var message = 'Something went wrong. Please Try Again';
            if (err.response) {

                var status = err.response.status;
                if (parseInt(status) > 400 && parseInt(status) < 500) {
                    message = "Bad Request";
                }
                if (parseInt(status) >= 500 && parseInt(status) < 600) {
                    message = "Internal Server Error";
                }

            }
            return res.render('error', { "message": message, "status": status });


        }
    })
    app.get("/detail/:id", (req, res) => {



        return res.render('detail', { "ticket": req.session.tickets[req.params.id - 1], "startIndex": req.session.startIndex });


    })
}