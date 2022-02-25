package com.football;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import java.io.PrintWriter;
import org.json.JSONArray;
import org.json.JSONObject;/**
 *  implementation class Servlet1
 */
@SuppressWarnings("unused")
@WebServlet("/Servlet1")
public class Servlet1 extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
	//Variable_Post used for getting values from HTML Parameters
	static String userName_Post, firstName_Post,lastName_Post,phoneNo_Post,email_Post,ageGroup_Post,desiredTeam_Post,desiredPosition_Post,address_Post,pinCode_Post;
	static String country_Post,state_Post,city_Post;
	
	//Variable_Fetched used for fetching values from the database and storing into these variables
	static String userName_fetched, firstName_fetched, lastName_fetched, phoneNo_fetched, email_fetched,ageGroup_fetched, desiredTeam_fetch,desiredPosition_fetched;
	static String address_fetched, pinCode_fetched, country_fetched, state_fetched, city_fetched;
	Connection con=null;	//Connection object
	boolean existingUser=false;
    public Servlet1() {
        super();
        
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    //doPut for Updation in Data
    protected void doPut(HttpServletRequest request,HttpServletResponse response) throws IOException, ServletException
	{	
    	//connecting to the database.
		
		 connect();
		 System.out.println("inside PUT");
		//Receiving Data From the input Fields of the Form .
		 
		 	userName_Post=request.getParameter("username");
			firstName_Post=request.getParameter("firstname");
			lastName_Post=request.getParameter("lastname");
			phoneNo_Post=request.getParameter("phone");
			email_Post=request.getParameter("email");
			ageGroup_Post=request.getParameter("agegp");
			desiredTeam_Post=request.getParameter("flexRadioDefault");
			desiredPosition_Post=request.getParameter("dpchecks");
			address_Post=request.getParameter("address");
			pinCode_Post=request.getParameter("pincode");
			country_Post=request.getParameter("countryselect");
			state_Post=request.getParameter("stateselect");
			city_Post=request.getParameter("city");
		 
		 update(response);
	}
    
	//Update function called when user wants to update existing user data
    public void update(HttpServletResponse response)
	{		
		try
		{
			String i = "UPDATE ffuser SET FirstName=?,LastName=?,PhoneNumber=?,Email=?,AgeGroup=?,DesiredTeam=?,DesiredPosition=?,Address=?,Pincode=?,Country=?,State=?,City=? WHERE Username=?";	
			PreparedStatement pstm=con.prepareStatement(i);
			
			//while updating the data if user does not change some fields then those fields will remain same.
			if(firstName_Post == null)
			{
				firstName_Post = firstName_fetched;
			}
			
			if(pinCode_Post == null)
			{
				pinCode_Post = pinCode_fetched;
			}
			
			if(email_Post == null)		
			{
				email_Post = email_fetched;
			}
			
			if(ageGroup_Post == null)
			{
				ageGroup_Post = ageGroup_fetched;
			}
			
			if(country_Post == null)
			{
				country_Post=country_fetched;			
			}
			
			if(state_Post == null)
			{
				state_Post = state_fetched;			
			}
			
			if(city_Post == null)
			{
				city_Post = city_fetched;			
			}	
			
			pstm.setString(1,firstName_Post);
			pstm.setString(2,lastName_Post);
			pstm.setString(3,phoneNo_Post);
			pstm.setString(4,email_Post);
			pstm.setString(5,ageGroup_Post);
			pstm.setString(6,desiredTeam_Post);
			pstm.setString(7,desiredPosition_Post);
			pstm.setString(8,address_Post);
			pstm.setString(9,pinCode_Post);
			pstm.setString(10,country_Post);
			pstm.setString(11,state_Post);
			pstm.setString(12,city_Post);
			pstm.setString(13,userName_fetched);
			
			int rows = pstm.executeUpdate();	
			response.sendRedirect("formpage.html");
			if(rows > 0)
			{
				System.out.println("Updated Successfully!!");
			}	
			
		}
		
		catch(Exception e)
		{
			System.out.println("unable to update!");			
		}	
		
	}
    
	//GET Request
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		userName_Post=request.getParameter("username");
    	connect();

		JSONArray array = new JSONArray();
    	JSONObject record = new JSONObject();
    	
    	fetch();	//Fetch Data From DataBase
    	try { 		
    		record.put("userName",userName_fetched);
        	record.put("firstName",firstName_fetched);
        	record.put("lastName",lastName_fetched);
        	record.put("phoneNo",phoneNo_fetched);
        	record.put("email",email_fetched);
        	record.put("ageGroup",ageGroup_fetched);
        	record.put("desiredTeam",desiredTeam_fetch);
        	record.put("desiredPosition",desiredPosition_fetched);
        	record.put("address",address_fetched);
        	record.put("pinCode",pinCode_fetched);
        	record.put("country",country_fetched);
        	record.put("state",state_fetched);
        	record.put("city",city_fetched);
        	array.put(record);
        	response.setContentType("application/json");
        	//response.getWriter().write(array.toString());
        	ServletOutputStream out = response.getOutputStream();
        	//String response = gson.toJson(postRes);
        	out.write(record.toString().getBytes());
        	out.flush();
        	out.close();
        	System.out.println("done");
			//Backend.js stores all the responses
		} catch (Exception e) {
			
			e.printStackTrace();
		}
    	
		
		
	}
	
	//Establish Database Connection
	public void connect()
	{
		
		try 
		{	
			String url ="jdbc:sqlserver://INDIA-5SH8JC2;databaseName=footballform";
			String user="sa";
			String pass="@Zebronic11";
			con= DriverManager.getConnection(url,user,pass);
			System.out.println("connected!");
		}
		
		catch(Exception e)
		{
			System.out.println("Something went Wrong!");
		}
		
		
	}
	
	//Fetch Data from the SQL Database into the variables
	public void fetch() {
		try
		 {
			String sql = "Select * from ffuser where Username='"+userName_Post+"'";
			Statement stm = con.createStatement();
			ResultSet result = stm.executeQuery(sql);
			while(result.next())
			{
				userName_fetched = result.getString("Username");
				firstName_fetched = result.getString("FirstName");
				lastName_fetched = result.getString("LastName");
				phoneNo_fetched = result.getString("PhoneNumber");
				email_fetched = result.getString("Email");
				ageGroup_fetched = result.getString("AgeGroup");
				desiredTeam_fetch = result.getString("DesiredTeam");
				desiredPosition_fetched = result.getString("DesiredPosition");
				address_fetched = result.getString("Address");
				pinCode_fetched = result.getString("Pincode");
				country_fetched = result.getString("Country");
				state_fetched = result.getString("State");
				city_fetched = result.getString("City");
			}
			System.out.println("Username: " + userName_fetched);
			System.out.println("done Fetching!");
			 checkUser();	
		 }
		catch(Exception e)
		 {
			 System.out.println("Unable to Fetch! :" + e);			
		 }
	}
	
	//Checks if the User exists in the Database or NOT
	public void checkUser()
	{		
		if(userName_Post.equals(userName_fetched))
		{
			existingUser = true;
			System.out.println("User Found!");
			
			
		}
		
		else
		{
			existingUser = false;			
			System.out.println("User NOT Found!");
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */

	//for POST Request and insertion into the database
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();


		if(request.getParameter("typeofrequest").equals("put")){
			doPut(request,response);
			return;
		}
		
		System.out.println("Starting Database Connection");
		userName_Post=request.getParameter("username");
		firstName_Post=request.getParameter("firstname");
		lastName_Post=request.getParameter("lastname");
		phoneNo_Post=request.getParameter("phone");
		email_Post=request.getParameter("email");
		ageGroup_Post=request.getParameter("agegp");
		desiredTeam_Post=request.getParameter("flexRadioDefault");
		desiredPosition_Post=request.getParameter("dpchecks");
		address_Post=request.getParameter("address");
		pinCode_Post=request.getParameter("pincode");
		country_Post=request.getParameter("countryselect");
		state_Post=request.getParameter("stateselect");
		city_Post=request.getParameter("city");
		
		//Connection Code for MYSQL database
		
		try
		{
			String url ="jdbc:sqlserver://INDIA-5SH8JC2;databaseName=footballform";
			String user="sa";
			String pass="@Zebronic11";
			con= DriverManager.getConnection(url,user,pass);
			System.out.println("connected!");
			Statement stmt = con.createStatement();
			String insertStatement = "insert into ffuser (Username,FirstName,LastName,PhoneNumber,Email,AgeGroup,DesiredTeam,DesiredPosition,Address,Pincode,Country,State,City) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";

			PreparedStatement pstm=con.prepareStatement(insertStatement);
			pstm.setString(1, userName_Post);
			pstm.setString(2,firstName_Post);
			pstm.setString(3,lastName_Post);
			pstm.setString(4,phoneNo_Post);
			pstm.setString(5,email_Post);
			pstm.setString(6,ageGroup_Post);
			pstm.setString(7,desiredTeam_Post);
			pstm.setString(8,desiredPosition_Post);
			pstm.setString(9,address_Post);
			pstm.setString(10,pinCode_Post);
			pstm.setString(11,country_Post);
			pstm.setString(12,state_Post);
			pstm.setString(13,city_Post);
			int rows=pstm.executeUpdate();
			if(rows>0)
			{
				System.out.println("Inserted!");
			}
			response.sendRedirect("formpage.html");
			
			
			
//			fetch();
		}
		
		catch(Exception e)
		{
			System.out.println(e);
		}		
	}

}
