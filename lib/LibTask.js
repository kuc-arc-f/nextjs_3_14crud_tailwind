// LibTask

//
export default {
  get_const: function(){
    return {
      DB_NAME: "task_idx_kuc_db",
      DB_VERSION: 12,
      DB_STORE: {
          tasks: '++id, title, content ,created_at',
          books: '++id, category_id, tag_ids, title, content , pub_date, price, created_at',
      }
    }
  },
}
