const asyncErrorHandler = require('express-async-handler');
const { searchHelper, populateHelper, paginationHelper } = require('./queryMiddlewareHelpers');


const questionQueryMiddleware = function (model, options) {

    return asyncErrorHandler(async function (req, res, next) {
        let query = model.find();

        query = searchHelper("title", query, req);

        if (options && options.population) {
            query = populateHelper(query, options.population);
        }

        const paginationResult = await paginationHelper(model, query, req);
        query = paginationResult.query;
        const pagination = paginationResult.pagination;

        const queryResults = await query;

        res.queryResults = {
            success: true,
            count: queryResults.length,
            pagination: pagination,
            data: queryResults
        }

        next();
    });
};


module.exports = { questionQueryMiddleware };