# Dealer Pro
Built using MERN:
- DB hosted on Atlas
- Vite for React

Completed:
  - Deployed on AWS
    - http://3.144.47.37/dashboard

  - Create Tradesheets: /tradesheet

  - Edit Tradesheets: /tradesheet/id

  - Display All Vehicles: /dashboard

  - Delete Tradesheets

  - DB hosted w/ Atlas

  - EC2 instance up and running

Backlog:

  - Re-work /tradesheet && /tradesheet/id to be more user-friendly
    - Create a printer-friendly display of a single vehicle object  
      to replace the current create/edit pages to appease Frank.

  - Re-work UI and CSS with a more polished presentation

  - Login/Reg:
    - Ensure user is logged in on all routes.
    - Store and re-use User's 'storename' on /tradesheet.
    - Only allow access to data for vehicles associated
      w/ logged-in User's 'storename'.

__About__  
The current process for logging new acquisitions leaves a lot to be desired:
  - Fill out a form in a word doc.
  - Print the form.
  - Fax the form.
  - Receive handwritten notes on the forms via Fax the following morning.  
  ***  
  
  This project aims to streamline the process and start aggregating data for a better understanding  
  of future transactions through the tracking of profits and losses on both Retail & Wholesale vehicles  
  by being able to dial in on specific parameters such as Mileage, Make, & Model.  
  ***  
  
Additional targets for future expansion to the project include:
  - Tradesheets to be queued and batched out as PDF files After-Hours.
  - Rooftop-specific logins with filtered Rooftop-specific results.
  - Various metrics actively tracked in real-time on the Dashboard with
    the ability to customize data parameters.
  - NHTSA API functionality to pre-fill forms. (Comming Soon!)
