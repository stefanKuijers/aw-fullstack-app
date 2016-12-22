*registerOnlineProject*
This api call will register a project as being online. It will add a record to a table.
Data Send:
```{
	c: 'registerOnlineProject',
	id: Int (Length 13),            // 1482308425857
	name: String (max length 50),   // "AW Fullstack"
	url: String	(Length 16-26),		// "192.168.0.41:3001"
	username: String (Length )        // "Guti Balázs"
}```
Response:
```{
	message: 'registered'              // Or 'Could not register project'
}```

*unregisterOnlineProjects*
Calling this will delete the projects with the send ids from the table.
Data Send:
```{
	c: 'unregisterOnlineProjects',
	ids: Array<Int (Length 13)>            // [1482308425857, etc...]
}```
Response:
```{
	message: 'Unregistered'              // Or 'Could not unregister project'
}```


*getOnlineProjects*
Returns a list of online projects
Data send:
```{
	c: 'getOnlineProjects'
}```
Response:
```{
	projects: Array<projects> [
		{
			id: Int (Length 13),            // 1482308425857
			name: String (max length 50),   // "AW Fullstack"
			url: String	(Length 16-26),		// "192.168.0.41:3001"
			username: String (Length )		// "Guti Balázs"
		},
		...etc
	]
}```