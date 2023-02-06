import java.io.*;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.Scanner;

public class menuDB {

	public static void main(String[] args) {
		
		
		String user = "zkac227";
		
		String password = "iemeib";
		
		String database = "teachdb.cs.rhul.ac.uk";
		Connection connection = connectToDatabase(user, password, database);
		if (connection != null) {
			System.out.println("SUCCESS: MADE A CONNECTION TO THE MENU DATABASE!");
		} else {
			System.out.println("ERROR: FAILED TO MAKE A CONNECTION TO THE MENU DATABASE!");
			System.exit(1);
		}
	
	
	System.out.println("DROPPING ALL TABLES");

	dropTable(connection, "Item_Allergen;");
	dropTable(connection, "Item_Diet;");
	dropTable(connection, "Diet;");
	dropTable(connection, "Allergen;");
	dropTable(connection, "Item;");
	dropTable(connection, "MenuType;");
	
	System.out.println("Creating table MenuType...");
	createTable(connection,"MenuType (type_ID char(2) NOT NULL, name varchar(30), PRIMARY KEY (type_ID));");		
	System.out.println("Creating table Item...");
	createTable(connection,"Item (item_ID char(6) NOT NULL, name varchar(30), price numeric(4,2), calories int,type_ID char(2), PRIMARY KEY (item_ID), FOREIGN KEY (type_ID) REFERENCES MenuType(type_ID));");
	System.out.println("Creating table Diet...");
	createTable(connection, "Diet (diet_ID char(3), name varchar(30), PRIMARY KEY (diet_ID));");
	System.out.println("Creating table Allergen...");
	createTable(connection, "Allergen (allergen_ID char(2) NOT NULL, name varchar(30), PRIMARY KEY (allergen_ID));");
	System.out.println("Creating table Item_Allergen...");
	createTable(connection, "Item_Allergen (item_ID char(6) NOT NULL, allergen_ID char(2) NOT NULL, PRIMARY KEY (item_ID, allergen_ID),FOREIGN KEY (item_ID) REFERENCES Item(item_ID), FOREIGN KEY (allergen_ID) REFERENCES Allergen(allergen_ID));");
	System.out.println("Creating table Item_Diet...");
	createTable(connection, "Item_Diet (item_ID char(6) NOT NULL, diet_ID char(3) NOT NULL, PRIMARY KEY (item_ID,diet_ID), FOREIGN KEY (item_ID) REFERENCES Item(item_ID),FOREIGN KEY (diet_ID) REFERENCES Diet(diet_ID));");

	int rows3 = insertIntoTableFromFile(connection, "MenuType", "MenuType.txt");
	System.out.println(rows3 + " rows inserted");
	int rows = insertIntoTableFromFile(connection, "Item", "Items.txt");
	System.out.println(rows + " rows inserted");
	int rows2 = insertIntoTableFromFile(connection, "Diet", "Diet.txt");
	System.out.println(rows2 + " rows inserted");
	int rows4 = insertIntoTableFromFile(connection, "Allergen", "Allergens.txt");
	System.out.println(rows4 + " rows inserted");
	int rows5 = insertIntoTableFromFile(connection, "Item_Allergen", "Item_Allergen.txt");
	System.out.println(rows5 + " rows inserted");
	int rows6 = insertIntoTableFromFile(connection, "Item_Diet", "Item_Diet.txt");
	System.out.println(rows6 + " rows inserted");
	
	
	Scanner scanInput = new Scanner(System.in);
	System.out.println("Type in the name of your Item: ");
	String itemName = scanInput.nextLine();
	System.out.println("\nWhat would you like to know about your item?: \nPrice \nCalories \nDietary Information \nAllergen Information");
	String queryOption = scanInput.nextLine();
	
	if (queryOption.equals("calories")) {
		int result = getCalories(connection, itemName);
		System.out.println("There are "+ result + "kcal in " + itemName + ".");
	}
	scanInput.close();
	
	}
	
	public static ResultSet executeQuery(Connection connection, String query) {
		try {
			Statement st = connection.createStatement();
			ResultSet rs = st.executeQuery(query);
			return rs;	
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static int getCalories(Connection connection, String itemName) {
		int calories = 0;
		String getCalories = "SELECT calories FROM Item " + 
							 "WHERE name = '" + itemName + "'";
		ResultSet rs1= executeQuery(connection, getCalories);
		try {
			while (rs1.next()) {
				calories = rs1.getInt(1);

			}
		} catch (SQLException e) {
				e.printStackTrace();
		};
		return calories;
	}

	public static void createTable(Connection connection, String tableDescription) {
		try {
			Statement st = connection.createStatement();
			st.execute("CREATE TABLE " + tableDescription);
			st.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}
	public static void dropTable(Connection connection, String table) {
		try {
			Statement st = connection.createStatement();
			st.execute("DROP TABLE " + table);
			st.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static int insertIntoTableFromFile(Connection connection, String table, String filename) {
		BufferedReader br = null;
		int numRows = 0;
		try {
			Statement st = connection.createStatement();
			String sCurrentLine, brokenLine[], composedLine = "";
			br = new BufferedReader(new FileReader(filename));

			while ((sCurrentLine = br.readLine()) != null) {
				brokenLine = sCurrentLine.split(",");
				composedLine = "INSERT INTO "+ table +" VALUES (";
				int i;
				for (i = 0; i < brokenLine.length - 1; i++) {
					composedLine += "'" + brokenLine[i] + "',";
				}
				composedLine += "'" + brokenLine[i] + "')";
				numRows = st.executeUpdate(composedLine);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				if (br != null)
					br.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
		return numRows;
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
				System.out.println("ERROR: \tDatabase password is incorrect. Have you changed the password string above?");
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
