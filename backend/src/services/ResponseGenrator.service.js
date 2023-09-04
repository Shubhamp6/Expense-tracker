class ResponseGenratorService {
  constructor(req, modal) {
    this.pageNo = parseInt((req.query && req.query.pageNo) || 1);
    this.pageSize = parseInt((req.query && req.query.pageSize) || 15);
    this.search = (req.query && req.query.search) || "";
    this.searchable = (req.query && req.query.searchable) || ["name"];
    this.sort = (req.query && req.query.sort) || "createdAt";
    this.sortDirection = (req.query && req.query.sortDirection) || -1;
    this.modal = modal;
  }

  getSearchAndSortConditions(condition, subOrQuery) {
    const searchCondition = {};
    let sortquery = { [this.sort]: parseInt(this.sortDirection) };

    if (this.search) {
      if (
        this.searchable &&
        Array.isArray(this.searchable) &&
        this.searchable.length > 1
      ) {
        searchCondition["$or"] = this.searchable.map((searchable) => {
          return {
            [searchable]: { $regex: ".*" + this.search + ".*", $options: "i" },
            ...subOrQuery,
          };
        });
      } else {
        searchCondition[this.searchable[0]] = {
          $regex: ".*" + this.search + ".*",
          $options: "i",
        };
        searchCondition["$or"] = subOrQuery["$or"];
      }
    } else {
      if (Object.keys(subOrQuery).length > 0)
        condition["$or"] = subOrQuery["$or"];
    }

    return {
      sortquery,
      condition: { ...condition, ...searchCondition },
    };
  }

  getSearchConditions(condition) {
    const searchCondition = {};

    if (this.search) {
      if (
        this.searchable &&
        Array.isArray(this.searchable) &&
        this.searchable.length > 1
      ) {
        searchCondition["$or"] = this.searchable.map((searchable) => {
          return {
            [searchable]: { $regex: ".*" + this.search + ".*", $options: "i" },
          };
        });
      } else {
        searchCondition[this.searchable[0]] = {
          $regex: ".*" + this.search + ".*",
          $options: "i",
        };
      }
    }

    return {
      ...condition,
      ...searchCondition,
    };
  }

  async getPaginatedResponse(condition, projection, subOrQuery = {}) {
    const searchCondition = {};
    let sortquery = { [this.sort]: parseInt(this.sortDirection) };

    if (this.search) {
      if (
        this.searchable &&
        Array.isArray(this.searchable) &&
        this.searchable.length > 1
      ) {
        searchCondition["$or"] = this.searchable.map((searchable) => {
          return {
            [searchable]: { $regex: ".*" + this.search + ".*", $options: "i" },
            ...subOrQuery,
          };
        });
      } else {
        searchCondition[this.searchable[0]] = {
          $regex: ".*" + this.search + ".*",
          $options: "i",
        };
        condition["$or"] = subOrQuery["$or"];
      }
    } else {
      if (Object.keys(subOrQuery).length > 0)
        condition["$or"] = subOrQuery["$or"];
    }

    return await Promise.all([
      this.modal.find({ ...condition, ...searchCondition }).count(),
      this.modal
        .find({ ...condition, ...searchCondition }, projection)
        .sort(sortquery)
        .skip(parseInt(this.pageSize * (this.pageNo - 1)))
        .limit(parseInt(this.pageSize))

        .exec(),
    ]).then((dbresponse) => {
      return {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        total: dbresponse[0] ? dbresponse[0] : 0,
        result: dbresponse[1] ? dbresponse[1] : [],
      };
    });
  }
  async getAggrigatedPaginatedResponse(query, afterQuery = []) {
    return await Promise.all([
      this.modal.aggregate([...query, { $count: "total" }]).exec(),
      this.modal.aggregate([
        ...query,
        { $skip: this.pageSize * (this.pageNo - 1) },
        { $limit: this.pageSize },
        ...afterQuery,
      ]),
    ]).then((dbresponse) => {
      return {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        total: dbresponse[1]? dbresponse[1].length : 0,
        result: dbresponse[1] ? dbresponse[1] : [],
      };
    });
  }

  getDummyPaginatedResponseResponse(data = []) {
    return {
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      total: data.length,
      result: data,
    };
  }
}
module.exports = ResponseGenratorService;
