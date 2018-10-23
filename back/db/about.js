/**ABOUT DB
 *
 * Tables:{
 *      TODOS
 *      ADD_PROPS
 *      }
 *
 *  TODOS:{
 *      id:  INTEGER
 *      name: TEXT
 *      color: TEXT
 *      shape: TEXT
 *      details: TEXT
 *      }
 *
 * ADD_PROPS:{
 *      todo_id: INTEGER
 *      prop_name: TEXT {
 *           child: "A is a child of B"
 *           parent: "A is a parent of B"
 *           prev: "B is the previous element of A"
 *           next "B is the next element of A"
 *      }
 *      prop_value: TEXT
 *      }
 *
 * **/