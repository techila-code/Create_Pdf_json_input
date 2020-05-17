# create_pdf_json_input #

create_pdf_json_input is the API that generate pdf from user input(json). This API will usually be consumed by all other microservices or directly by the Frontend.

## Getting Started ##

1. Clone the Repository on your local/server.

2. Resolve dependancies  required via `npm install`.

3. Now, start your server as `node index.js`

## Testing ##

Run `npm test` to test if everything is fine.


## Sample Json ##

Request Contain :

Header = Content-type : application/json
method = Post

body = 
{
	"question" : "find the value of y."
}