module.exports = {

  getSkipNumberByPageAndLimit: function (page, limit) {
    var skipNumber,
      pageNumber = Number(page),
      limitNumber = Number(limit);

    if (!Number.isInteger(pageNumber)) {
      return 0;
    }

    if (!Number.isInteger(limitNumber)) {
      return 0;
    }

    skipNumber = (pageNumber - 1) * limitNumber;

    if (skipNumber < 0) {
      return 0;
    }

    return skipNumber;
  }
};
