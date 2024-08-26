import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitemsfour (id integer primary key not null, name text, price text, description text, image text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitemsfour', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  const insertStatement = `
    INSERT INTO menuitemsfour (name, price, description, image, category) VALUES
    ${menuItems.map(item => `('${item.name}', ${item.price}, "${item.description}", '${item.image}', '${item.category}')`).join(", ")}
  `;
  console.log(insertStatement);
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
  console.log('active:',activeCategories);
  const queryCategories = activeCategories.map(item=>"'" + item +"'");
  const queryString = `select * from menuitems where title like '%${query}%' and category in (${queryCategories})`;
  console.log(queryString);
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(queryString, [], (_, { rows }) => {
        console.log(rows);
        resolve(rows._array);
      });
    });
    //resolve(SECTION_LIST_MOCK_DATA);
  });
}
