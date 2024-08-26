import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitemssix (id integer primary key not null, name text, price text, description text, image text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getCategoryItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select distinct category from menuitemssix', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitemssix', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export async function saveMenuItems(menuItems) {
  const insertStatement = `
    INSERT INTO menuitemssix (name, price, description, image, category) VALUES
    ${menuItems.map(item => `('${item.name}', ${item.price}, "${item.description}", '${item.image}', '${item.category}')`).join(", ")}
  `;
  db.transaction((tx) => {
    // 2. Implement a single SQL statement to save all menu data in a table called menuitems.
    // Check the createTable() function above to see all the different columns the table has
    // Hint: You need a SQL statement to insert multiple rows at once.
    tx.executeSql(insertStatement,[],
      (tx, resultSet) => {
        // Success callback
        console.log('Rows affected:', resultSet.rowsAffected);
        if (resultSet.insertId) {
          console.log('Last inserted ID:', resultSet.insertId);
        }
      },
      (tx, error) => {
        // Error callback
        console.error('Error executing SQL:', error);
        return true; // returning true indicates an error occurred
      }
    ); 
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  const queryCategories = activeCategories.map(item=>"'" + item +"'");
  let categorySubQuery = ` and category in (${queryCategories})`;
  if (activeCategories.length === 0){
    categorySubQuery = '';
  }
  const queryString = `select * from menuitemssix where name like '%${query}%' ${categorySubQuery}`;
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(queryString, [], (_, { rows }) => {
        resolve(rows._array);
      },
      (tx, error) => {
        // Error callback
        console.error('Error executing SQL:', error);
        return true; // returning true indicates an error occurred
      });
    });
    //resolve(SECTION_LIST_MOCK_DATA);
  });
}
