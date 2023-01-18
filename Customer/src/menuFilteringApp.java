import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class menuFilteringApp {

	public static void main(String[] args) {
				
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

	
	
	public static void createTable(Connection connection, String tableDescription) {

		System.out.println("DEBUG: Executing query...");
		try {
			Statement st = connection.createStatement();
			st.execute("CREATE TABLE " + tableDescription);
			st.close();
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
		e.printStackTrace();
		return null;
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

}
