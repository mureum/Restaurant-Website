import java.io.*;
import java.sql.*;
import java.util.Scanner;

public class LoginDatabase {
  public static void main(String[] argv) throws SQLException {
    Scanner scanner = new Scanner(System.in);
    
    System.out.print("Username = ");
    String user = scanner.nextLine();

    System.out.print("Password = ");
    String password = scanner.nextLine();
    
    scanner.close();

    String database = "teachdb.cs.rhul.ac.uk";

    Connection connection = connectToDatabase(user, password, database);
    if (connection != null) {
      System.out
          .println("SUCCESS: You made it!" + "\n\t You can now take control of your database!\n");
    } else {
      System.out.println("ERROR: \tFailed to make connection!");
      System.exit(1);
    }
    
    //Drop table.
    dropTable(connection,"loginDetails");
    
    //Create table.
    createTable(connection,"loginDetails(Username varchar(255), "
                                      + "Password varchar(255), "
                                      + "Permissions varchar(255));");
    //Insert into table
    insertIntoTable(connection,"loginDetails","logins.txt");
    String query = "SELECT * FROM loginDetails;";
    newUser(connection,"newUser1","password3","Waiter");
    ResultSet executeQuery = executeQuery(connection, query);
    printQuery(connection, executeQuery);
    executeQuery.close();
    
    System.out.println("------------------------------");
    String query2 = "SELECT * FROM loginDetails;";
    deleteUser(connection,"Username2");
    ResultSet executeQuery2 = executeQuery(connection, query);
    printQuery(connection, executeQuery2);
    executeQuery2.close();
  }
    
  private static void newUser(Connection connection, String username, String password, String permissions) { 
    try {
      Statement st = connection.createStatement();
      st.execute("INSERT INTO loginDetails(Username,Password,Permissions) VALUES ('" + username + "','" + password + "','" + permissions+"')");
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }
  
  private static void deleteUser(Connection connection, String username) { 
    try {
      Statement st = connection.createStatement();
      st.execute("DELETE FROM loginDetails WHERE Username = '" + username + "';");
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }
  
  private static void printQuery(Connection connection,ResultSet query) {
      ResultSetMetaData queryMeta;
      try {
        queryMeta = query.getMetaData();
        try {
          while (query.next()) {
            int columnCount = queryMeta.getColumnCount();
            String displayQuery = "|";
            for(int i = 1;i<=columnCount;i++) {
              displayQuery += query.getString(i) + "|";
            }
            System.out.println(displayQuery);
          }
        } catch (SQLException e) {
          e.printStackTrace();
        }
      } catch (SQLException e) {
        e.printStackTrace();
      }
    }
     
     private static int insertIntoTable(Connection connection, String table, String file) {
       String currentLine = null;
       int numRows = 0;
       try {
         BufferedReader br = new BufferedReader(new FileReader(file));
         Statement st = connection.createStatement();
         while ((currentLine = br.readLine()) != null) {
           String[] values = currentLine.split(",");
           String composedLine = "INSERT INTO "+ table +" VALUES (";
           for(int i = 0;i < values.length - 1;i++) {
             try {
                 Integer.parseInt(values[i]);
                 composedLine += values[i] + ",";
             } catch (NumberFormatException nfe) {
               composedLine += "'" + values[i] + "',";
             }
           }
           try {
             Integer.parseInt(values[values.length-1]);
             composedLine += values[values.length-1] + ");";
           } catch (NumberFormatException nfe) {
             composedLine += "'" + values[values.length-1] + "');";
           }
           numRows = st.executeUpdate(composedLine);
         }
         br.close();
       } catch (Exception e) {
         e.printStackTrace();
       }
       return numRows;
      
    }

    public static void dropTable(Connection connection, String table) {
       try {
         Statement st = connection.createStatement();
         st.execute("DROP TABLE IF EXISTS " + table + " CASCADE;");
       } catch (SQLException e) {
         e.printStackTrace();
       }
     }


     public static void createTable(Connection connection, String tableDescription) {
       try {
         Statement st = connection.createStatement();
         st.execute("CREATE TABLE " + tableDescription);
       } catch (SQLException e) {
         e.printStackTrace();
       }
     }
     

     public static ResultSet executeQuery(Connection connection, String query) {
       try {
         Statement st = connection.createStatement();
         ResultSet rs = st.executeQuery(query);
         return rs;
       } catch (SQLException e) {
         return null;
       }
     }
     public static Connection connectToDatabase(String user, String password, String database) {
       System.out.println("------ Testing PostgreSQL JDBC Connection ------");
       Connection connection = null;
       try {
         String protocol = "jdbc:postgresql://";
         String dbName = "/CS2855/";
         String fullURL = protocol + database + dbName + user;
         connection = DriverManager.getConnection(fullURL, user, password);
       } catch (SQLException e) {
         String errorMsg = e.getMessage();
         if (errorMsg.contains("authentication failed")) {
           System.out.println(
               "ERROR: \tDatabase password is incorrect. Have you changed the password string above?");
           System.out.println("\n\tMake sure you are NOT using your university password.\n"
               + "\tYou need to use the password that was emailed to you!");
         } else {
           System.out.println("Connection failed! Check output console.");
           e.printStackTrace();
         }
       }
       return connection;
     }
    

}
