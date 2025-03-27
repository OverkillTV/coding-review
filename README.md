Please forward this email to Cameron because it contains all the information to setup for the package.
The error that Cameron had was due to the missing a lookup column (**LookupColumn**) and a text/choice column (**Status**).

Basically the idea of that package was to demonstrate the ability to retrieve SharePoint list items through SharePoint REST API.

The "**Sample List**" list needs to have 2 additional columns: (pardon my naming convention in this source - it was purely to demonstrate)
1. A lookup column with Internal Name as "**LookupColumn**" (it could lookup to any list as long as it is a lookup column) 
2. A text/choice column with Internal Name as "**Status**".

Below is the screenshot of how the schema for "**Sample List**" should be:

![List Columns](/img/list_columns.png)
![LookupColumn](/img/lookupColumn.png)

Also I have updated the package to contain the schema for the "**Sample List**" list which Cameron could use as reference:

![Schema](/img/schema.png)

A complete package is also available under **revlon-coding-review** > **sharepoint** > **solution** > **revlon-coding-review.sppkg** which can be uploaded to SharePoint app catalog then install to any SharePoint site. Once the app is installed, it will automatically provision two lists (Sample List and Lookup List) so this will prevent the schema mismatch issue.

![Packaged Solution](/img/app_file.png)