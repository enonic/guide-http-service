const contentLib = require('/lib/xp/content');

exports.get = function (request) {
    const searchTerm = request.params.s || '';
    const limit = request.params.l || 5;

    let status, data, body, error;

    try {
        const people = contentLib.query({
            count: limit,
            sort: "data.firstName ASC",
            query: `data.firstName LIKE '*${searchTerm}*' OR data.lastName LIKE '*${searchTerm}*'`,
            contentTypes: [`${app.name}:person`]
        });
        
        status = 200;
        data = people.hits;
    } catch(err) {
        status = 500;
        error = err.toString();
    }

    if (status === 200) {
        body = JSON.stringify({ data });
    }

    if (status === 500) {
        body = JSON.stringify({ error });
    }

    return { status: status, body: body, contentType: 'application/json' };
};