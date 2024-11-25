const { USERS } = require("../models/user_model");

//These are the functions i have wrote to make project development easier while creating,updating,getting and deleting data

module.exports = {
  create_new_record: async (collection, data) => {
    try {
      var new_record = await eval(collection);
      var new_record = await new new_record(data);
      return await new_record.save();
    } catch (error) {
      throw new Error(
        `❌❌❌❌ err in create new record mongo query \n ${error} \n ❌❌❌❌`
      );
    }
  },
  insert_many_records: async (collection, dataArray) => {
    try {
      const Model = eval(collection);
      return await Model.insertMany(dataArray);
    } catch (error) {
      throw new Error(
        `❌❌❌❌ Error in insert many records Mongo query \n ${error} \n ❌❌❌❌`
      );
    }
  },
  find_with_projection: async (
    collection,
    condition,
    projection,
    sort,
    select,
    limit,
    skip
  ) => {
    return await eval(collection)
      .find(condition, projection)
      .select(select)
      .sort(sort)
      .limit(limit)
      .skip(skip);
  },
  find: async (collection, condition, sort, select, limit) => {
    return await eval(collection)
      .find(condition)
      .select(select)
      .sort(sort)
      .limit(limit)
      .lean();
  },
  find_one: async (collection, condition, select, sort) => {
    return await eval(collection)
      .findOne(condition)
      .select(select)
      .sort(sort)
      .lean();
  },
  find_one_and_update: async (collection, condition, update, options) => {
    if (!options) {
      options = { new: true };
    }
    return await eval(collection).findOneAndUpdate(condition, update, options);
  },
  find_one_and_delete: async (collection, condition, options) => {
    return await eval(collection).findOneAndDelete(condition, options);
  },
  find_one_and_remove: async (collection, condition, options) => {
    return await eval(collection).findOneAndRemove(condition, options);
  },
  find_one_and_replace: async (collection, condition, update, options) => {
    return await eval(collection).findOneAndReplace(condition, update, options);
  },
  update_many: async (collection, condition, update, options) => {
    return await eval(collection).updateMany(condition, update, options);
  },
  delete_many: async (collection, condition) => {
    return await eval(collection).deleteMany(condition, { mutli: true });
  },
  delete_one: async (collection, condition) => {
    return await eval(collection).deleteOne(condition);
  },
  replace_one: async (collection, condition, update) => {
    return await eval(collection).replaceOne(condition, update);
  },

  update_one: async (collection, condition, update, options = {}) => {
    return await eval(collection).updateOne(condition, update, options);
  },
  lazy_loading: async (collection, condition, select, sort, limit, skip) => {
    return await eval(collection)
      .find(condition)
      .select(select)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean();
  },
  aggregate: async (collection, pipeline) => {
    return await eval(collection).aggregate(pipeline);
  },
  count_documents: async (collection, condition = {}) => {
    return await eval(collection).countDocuments(condition);
  },
};
