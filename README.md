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
