const ResponseGenratorService = require("../../services/ResponseGenrator.service");
const apiResponseHelper = require("../../utils/apiResponse.helper");
const _lang = require("../../utils/lang");
const TransactionModel = require("../../model/Transaction.model");
const { body, query, matchedData } = require("express-validator");
const PayloadValidatorMiddleware = require("../../middleware/PayloadValidator.middleware");
const {
  TRANSACTION_FETCH_TYPE,
  TRANSACTION_FETCH_DURATION,
  GRAPHICAL_VIEW_TYPE,
  LIST_VIEW_TIME,
  GRAPHICAL_VIEW_DURATION,
} = require("../../utils/constants/common.constants");
const mongoose = require("mongoose");

const FetchTransactionController = [
  query("transactionFetchType")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("transaction fetch type required")
    .bail()
    .custom((value) => {
      if (!Object.values(TRANSACTION_FETCH_TYPE).includes(value)) {
        throw Error("transaction fetch type is not valid");
      } else return value;
    })
    .withMessage("transaction fetch type is not valid"),
  query("graphicalViewType")
    .if((value, { req }) => req.query.transactionFetchType)
    .if(
      (value, { req }) =>
        req.query.transactionFetchType == TRANSACTION_FETCH_TYPE.GRAPHICAL_VIEW
    )
    .notEmpty({ ignore_whitespace: true })
    .withMessage("graphical view type required")
    .bail()
    .custom((value) => {
      if (!Object.values(GRAPHICAL_VIEW_TYPE).includes(value)) {
        throw Error("graphical view type is not valid");
      } else return value;
    })
    .withMessage("graphical view type is not valid"),
  query("graphicalViewDuration")
    .if((value, { req }) => req.query.transactionFetchType)
    .if(
      (value, { req }) =>
        req.query.transactionFetchType == TRANSACTION_FETCH_TYPE.GRAPHICAL_VIEW
    )
    .notEmpty({ ignore_whitespace: true })
    .withMessage("graphical view duration required")
    .bail()
    .custom((value) => {
      if (!Object.values(GRAPHICAL_VIEW_DURATION).includes(value)) {
        throw Error("graphical view duration is not valid");
      } else return value;
    })
    .withMessage("graphical view duration is not valid"),
  query("listViewTime")
    .if((value, { req }) => req.query.transactionFetchType)
    .if(
      (value, { req }) =>
        req.query.transactionFetchType == TRANSACTION_FETCH_TYPE.LIST_VIEW
    )
    .notEmpty({ ignore_whitespace: true })
    .withMessage("list view time required")
    .bail()
    .custom((value) => {
      if (!Object.values(LIST_VIEW_TIME).includes(value)) {
        throw Error("list view time is not valid");
      } else return value;
    })
    .withMessage("list view time is not valid"),
  // query("trasactionFetchDuration")
  //   .notEmpty({ ignore_whitespace: true })
  //   .withMessage("transaction fetch duration required")
  //   .bail()
  //   .custom((value) => {
  //     if (!Object.values(TRANSACTION_FETCH_DURATION).includes(value)) {
  //       throw Error("transaction fetch duration is not valid");
  //     } else return value;
  //   })
  //   .withMessage("transaction fetch duration is not valid"),
  // query("category_id")
  //   .if((value, { req }) => req.query.transactionFetchType)
  //   .if(
  //     (value, { req }) =>
  //       req.query.transactionFetchType == TRANSACTION_FETCH_TYPE.GRAPHICAL_VIEW
  //   )
  //   .if((value, { req }) => req.query.graphicalViewType)
  //   .if(
  //     (value, { req }) =>
  //       req.query.graphicalViewType == GRAPHICAL_VIEW_TYPE.FILTER_BY_CATEGORY
  //   )
  //   .optional({ nullable: true })
  //   .notEmpty({ ignore_whitespace: true })
  //   .withMessage("category id is required")
  //   .bail(),
  query("date")
    .if((value, { req }) => req.query.transactionFetchType)
    .if(
      (value, { req }) =>
        req.query.transactionFetchType == TRANSACTION_FETCH_TYPE.LIST_VIEW
    )
    .if((value, { req }) => req.query.listViewTime)
    .if((value, { req }) => req.query.listViewTime == LIST_VIEW_TIME.DATE)
    .optional({ nullable: true })
    .notEmpty({ ignore_whitespace: true })
    .withMessage("date is required")
    .bail(),

  PayloadValidatorMiddleware,

  async (req, res) => {
    try {
      const { transactionFetchType } = matchedData(req);
      const modal = TransactionModel;
      const condition = {};
      condition["creator_id"] = mongoose.Types.ObjectId(req.user._id);

      const query = [];
      const afterQuery = [];
      console.log(transactionFetchType + " " + req.query.graphicalViewType);
      if (TRANSACTION_FETCH_TYPE.GRAPHICAL_VIEW == transactionFetchType) {
        const duration = req.query.graphicalViewDuration;
        if (
          GRAPHICAL_VIEW_TYPE.FILTER_BY_CATEGORY == req.query.graphicalViewType
        ) {
          // condition["category"] = {
          //   id: mongoose.Types.Object(req.query.category_id),
          // };
          let startTime, endTime;
          if (GRAPHICAL_VIEW_DURATION.MONTHLY_DATA == duration) {
            const dateObj = new Date();
            const startTimeTemp = new Date(
              dateObj.getFullYear(),
              0,
              0,
              0,
              0,
              0
            ).getTime();
            const endTimeTemp = new Date(
              dateObj.getFullYear() + 1,
              0,
              0,
              0,
              0,
              0
            ).getTime();

            startTime = new Date(startTimeTemp);
            endTime = new Date(endTimeTemp);
          } else if (GRAPHICAL_VIEW_DURATION.MONTH_DAYS_DATA == duration) {
            const dateObj = new Date();
            const startTimeTemp = new Date(
              dateObj.getFullYear(),
              dateObj.getMonth(),
              0,
              0,
              0,
              0
            ).getTime();
            const endTimeTemp = new Date(
              dateObj.getFullYear(),
              dateObj.getMonth() + 1,
              0,
              0,
              0,
              0
            ).getTime();

            startTime = new Date(startTimeTemp);
            endTime = new Date(endTimeTemp);
          } else {
            const date = new Date();
            const days = (date.getDay() + 6) % 7;
            date.setDate(date.getDate() - days);
            const startTimeTemp = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              0,
              0,
              0
            ).getTime();

            const endTimeTemp =
              parseInt(startTimeTemp) + 7 * 24 * 60 * 60 * 1000;
            startTime = new Date(startTimeTemp);
            endTime = new Date(endTimeTemp);
          }
          afterQuery.push({
            $match: { createdAt: { $gte: startTime, $lt: endTime } },
          });

          afterQuery.push({
            $project: {
              description: "$description",
              category: "$category",
              creator_id: "$creator_id",
              amount: "$amount",
              createdAt: "$createdAt",
            },
          });

          afterQuery.push({
            $group: {
              _id: { category: "$category" },
              amount: { $sum: "$amount" },
            },
          });
          afterQuery.push({
            $sort: { amount: 1 },
          });
        } else {
          if (GRAPHICAL_VIEW_DURATION.MONTHLY_DATA == duration) {
            const dateObj = new Date();
            const startTimeTemp = new Date(
              dateObj.getFullYear(),
              0,
              0,
              0,
              0,
              0
            ).getTime();
            const endTimeTemp = new Date(
              dateObj.getFullYear() + 1,
              0,
              0,
              0,
              0,
              0
            ).getTime();

            startTime = new Date(startTimeTemp);
            endTime = new Date(endTimeTemp);

            afterQuery.push({
              $match: { createdAt: { $gte: startTime, $lt: endTime } },
            });

            afterQuery.push({
              $project: {
                month: { $month: "$createdAt" },
                description: "$description",
                category: "$category",
                creator_id: "$creator_id",
                amount: "$amount",
                createdAt: "$createdAt",
              },
            });

            afterQuery.push({
              $group: {
                _id: { month: "$month" },
                amount: { $sum: "$amount" },
              },
            });
            afterQuery.push({
              $sort: { "_id.month": 1 },
            });
          } else if (GRAPHICAL_VIEW_DURATION.MONTH_DAYS_DATA == duration) {
            const dateObj = new Date();
            const startTimeTemp = new Date(
              dateObj.getFullYear(),
              dateObj.getMonth(),
              0,
              0,
              0,
              0
            ).getTime();
            const endTimeTemp = new Date(
              dateObj.getFullYear(),
              dateObj.getMonth() + 1,
              0,
              0,
              0,
              0
            ).getTime();

            startTime = new Date(startTimeTemp);
            endTime = new Date(endTimeTemp);

            afterQuery.push({
              $match: { createdAt: { $gte: startTime, $lt: endTime } },
            });
            afterQuery.push({
              $project: {
                dayOfMonth: { $dayOfMonth: "$createdAt" },
                description: "$description",
                category: "$category",
                creator_id: "$creator_id",
                amount: "$amount",
                createdAt: "$createdAt",
              },
            });
            afterQuery.push({
              $group: {
                _id: { dayOfMonth: "$dayOfMonth" },
                amount: { $sum: "$amount" },
              },
            });
            afterQuery.push({
              $sort: { "_id.dayOfMonth": 1 },
            });
          } else {
            const date = new Date();
            const days = (date.getDay() + 6) % 7;
            date.setDate(date.getDate() - days);
            const startTimeTemp = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              0,
              0,
              0
            ).getTime();

            const endTimeTemp =
              parseInt(startTimeTemp) + 7 * 24 * 60 * 60 * 1000;
            startTime = new Date(startTimeTemp);
            endTime = new Date(endTimeTemp);
            afterQuery.push({
              $match: { createdAt: { $gte: startTime, $lt: endTime } },
            });
            afterQuery.push({
              $project: {
                dayOfWeek: { $dayOfWeek: "$createdAt" },
                description: "$description",
                category: "$category",
                creator_id: "$creator_id",
                amount: "$amount",
                createdAt: "$createdAt",
              },
            });
            afterQuery.push({
              $group: {
                _id: { dayOfWeek: "$dayOfWeek" },
                amount: { $sum: "$amount" },
              },
            });
            afterQuery.push({
              $sort: { "_id.dayOfWeek": 1 },
            });
          }
        }
      } else {
        if (LIST_VIEW_TIME.DATE == req.query.listViewTime) {
          const dateObj = new Date(req.query.date);
          const startTimeTemp = new Date(
            dateObj.getFullYear(),
            dateObj.getMonth(),
            dateObj.getDate(),
            0,
            0,
            0
          ).getTime();
          const endTimeTemp = parseInt(startTimeTemp) + 24 * 60 * 60 * 1000;

          startTime = new Date(startTimeTemp);
          endTime = new Date(endTimeTemp);
          console.log(startTime);
          console.log(endTime);
          afterQuery.push({
            $match: {
              $and: [
                { createdAt: { $gte: startTime } },
                { createdAt: { $lt: endTime } },
              ],
            },
          });
        }
        afterQuery.push({
          $sort: { createdAt: 1 },
        });
      }
      const filterCondition = await new ResponseGenratorService(
        req,
        modal
      ).getSearchConditions(condition);
      query.push({
        $match: filterCondition,
      });

      const data = await new ResponseGenratorService(
        req,
        modal
      ).getAggrigatedPaginatedResponse(query, afterQuery);

      return apiResponseHelper.successResponseWithData(
        res,
        _lang("transactions fetched"),
        data
      );
    } catch (error) {
      console.log(error);
      return apiResponseHelper.errorResponse(res, _lang("server_error"));
    }
  },
];

module.exports = FetchTransactionController;
