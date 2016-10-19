The Customer Manager
==============================


This is an Angular JS project for Customer Management.

To have the project running on the browser, the following requirements must be met:

	1. Change to the directory containing your static web files (e.g. html, javascript, css etc) in the command line window, e.g:

	>>npm install -g http-server
	>>cd \Projects\Customer_Manager

	2. Start the server with this command:

	>>http-server

	3. The results of this should be as follows:

		C:\projects\angular-registration-login-example>http-server
		Starting up http-server, serving ./
		Available on:
		  http://192.168.0.5:8080
		  http://127.0.0.1:8080
		Hit CTRL-C to stop the server

	4. Browse to your local website with a browser. Open the browser and go to the address http://localhost:8080. This should display the project's index page. 

Major Functionalities Incllude:

	Customer Management
		I. Create a customer  
		II. Update a customer  
		III. Delete a customer  
		IV. View customers as a list  
		V. Filter/Search customers by name (This is where you would need a custom filter)  
	
	Order Management
		I. Create an order belonging to a customer  
		II. View the orders belonging to a customer  
		III. Count the number of orders belonging to a customer  
	
	Authentication
		I. Login a user using JWT   
		II. Logout a user using JWT  