import java.io.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Scanner;


public class DBApp {

	public static void main(String[] args) throws SQLException{
		
		Scanner readuser = new Scanner(System.in);
		System.out.println("Enter username: ");
		String user = readuser.nextLine();
		
		Scanner readpassword = new Scanner(System.in);
		System.out.println("Enter password: ");
		String password = readpassword.nextLine();
		
		String database = "teachdb.cs.rhul.ac.uk";
		Connection connection = connectToDatabase(user, password, database);
		if (connection != null) {
			System.out.println("SUCCESS: You made it!" + "\n\t You can now take control of your database!\n");
		} else {
			System.out.println("ERROR: \tFailed to make connection!");
			System.exit(1);
		}
		
		//create tables and insert values
		createTable(connection, "airport (airportCode char(3), airportName varchar(100), City varchar(100), State varchar(2), primary key (airportCode));");
		int rows_airport = insertIntoTableFromFile(connection, "airport", "airport.txt");
		System.out.println(rows_airport + " rows inserted.");
		
		createTable(connection, "delayedflights (ID_of_Delayed_Flight int, Month varchar(2), DayofMonth varchar(2), DayOfWeek char(1), DepTime varchar(4), ScheduledDepTime varchar(4), ScheduledArrTime varchar(4), ArrTime varchar(4), UniqueCarrier char(2), FlightNum varchar(4), ActualFlightTime varchar(4), scheduledFlightTime varchar(4), AirTime varchar(4), ArrDelay int, DepDelay int, Orig varchar(4), Dest varchar(4), Distance int, primary key (ID_of_Delayed_Flight));");
		int rows_delayedFlights = insertIntoTableFromFile(connection, "delayedflights", "delayedFlights.txt");
		System.out.println(rows_delayedFlights + " rows inserted.");
		
		//queries
		System.out.println("################## 1st Query ###############");
		String Query1 = "SELECT UniqueCarrier, COUNT(*) AS num_delays "
				+ "FROM delayedflights "
				+ "WHERE DepDelay > 0 OR ArrDelay > 0 "
				+ "GROUP BY UniqueCarrier "
				+ "ORDER BY num_delays DESC "
				+ "LIMIT 5;";
		ResultSet rs = executeQuery(connection, Query1);
		
		try {
			while (rs.next()) {
				System.out.println(rs.getString(1)+" "+rs.getString(2));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		rs.close();
		
		System.out.println("################## 2nd Query ###############");
		String Query2 = "SELECT city, COUNT(*) AS num_delays "
                + "FROM airport a JOIN delayedflights d ON a.airportCode = d.Orig "
                + "WHERE d.DepDelay > 0 "
                + "GROUP BY city "
                + "ORDER BY num_delays DESC "
                + "LIMIT 5;";
		
		ResultSet rs2 = executeQuery(connection, Query2);
		
		try {
			while (rs2.next()) {
				System.out.println(rs2.getString(1)+" "+rs2.getString(2));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		rs2.close();
		
		
		

		System.out.println("################## 3nd Query ###############");
		String Query3 = "SELECT Dest, SUM(ArrDelay) AS total_delay_minutes "
                + "FROM delayedflights "
                + "GROUP BY Dest "
                + "ORDER BY total_delay_minutes DESC "
                + "LIMIT 5 "
                + "OFFSET 1;";
		
		ResultSet rs3 = executeQuery(connection, Query3);
		
		try {
			while (rs3.next()) {
				System.out.println(rs3.getString(1)+" "+rs3.getString(2));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		rs3.close();
		
		System.out.println("################## 4th Query ###############");
		String Query4 = "SELECT State, COUNT(*) AS num_airports "
                + "FROM airport "
                + "GROUP BY State "
                + "HAVING COUNT(*) >= 10 "
                + "ORDER BY num_airports DESC;";
		
		ResultSet rs4 = executeQuery(connection, Query4);
		
		try {
			while (rs4.next()) {
				System.out.println(rs4.getString(1)+" "+rs4.getString(2));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		rs4.close();
		
		System.out.println("################## 5th Query ###############");
		String Query5 = "SELECT a1.state as s, COUNT(*) AS num_delays "
				+ "FROM airport a1 JOIN delayedflights d ON a1.airportCode = d.Orig "
				+ "JOIN airport a2 ON d.Dest = a2.airportCode "
				+ "WHERE a1.state = a2.state AND (d.DepDelay > 0 OR d.ArrDelay > 0) "
				+ "GROUP BY s "
				+ "ORDER BY num_delays DESC "
				+ "LIMIT 5;";
		
		ResultSet rs5 = executeQuery(connection, Query5);
		
		try {
			while (rs5.next()) {
				System.out.println(rs5.getString(1));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		rs5.close();
		
		//dropping table
		executeQuery(connection, "DROP TABLE airport;");
		executeQuery(connection, "DROP TABLE delayedflights;");
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
