

const searchHelper = (searchKey, query, req) => {
    if (req.query.search) {
        const searchObject = {};
        const regex = new RegExp(req.query.search, "i");
        searchObject[searchKey] = regex;

        return query.where(searchObject);
    }
    return query;
};

const populateHelper = (query, options) => {

    return query.populate(options);
};

const paginationHelper = async (model, query, req) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    const total = await model.countDocuments();
    if (startIndex > 0) {
        pagination.previous = {
            page: page - 1,
            limit: limit
        }
    }
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit: limit
        }
    }

    return {
        query: query.skip(startIndex).limit(limit),
        pagination: pagination
    }
};

module.exports = { searchHelper, populateHelper, paginationHelper };