### Docs

## Setup:

## Standard stuff: 
    - error messages: {
        success: false,
        message: String,
        status: Number,
        stack: String,
    }
    - headers: {
        Content-Type: application/json
    }
    - base route for all routes: /api
    - levels: none, elev, profesor, admin

## Models

    User: {

    }

    Project: {

    }

    Internship: {

    }

    Post: {

    }

## Endpoints:

#   Auth:
        auth/register : 
            - method: POST
            - minimum level required: none
            - request body: {
                firstName: String,
                lastName: String,
                email: String,
                phoneNumber: String,
                password: String,
                role: String,
                masterPassword: String,
                clasa: Number,
                profil: String,
            }
            - response if success: {
                firstName: String,
                lastName: String,
                phoneNumber: String,
                email: String, 
                createdProjectsIds: [String],
                signdedUpProjectsIds: [String],
                totalCredite: Number,
                clasa: Number,
                profil: String,
                _id: String,
                createdAt: Date,
                updatedAt: String,
                _v: Number,
            }
            - action description: registers the new user if the master password matches the password from the env file, sets the access_token cookie to a jwt token

        auth/login :
            - method: POST,
            - minimum level required: none,
            - request body: {
                firstName: String,
                lastName: String,
                email: String,
                phoneNumber: String,
                password: String,
                role: String,
                masterPassword: String,
                clasa: Number,
                profil: String,
            }
            - response if success: {
                firstName: String,
                lastName: String,
                phoneNumber: String,
                email: String, 
                createdProjectsIds: [String],
                signdedUpProjectsIds: [String],
                totalCredite: Number,
                clasa: Number,
                profil: String,
                _id: String,
                createdAt: Date,
                updatedAt: String,
                _v: Number,
            }
            - action description: registers the new user if the master password matches the password from the env file, sets the access_token cookie to a jwt token

        auth/logout
            - method: POST,
            - minimum level required: none,
            - response if success: {
                success: Boolean,
            }
            - action description: deletes the access_token cookie

#   Projects:

        projects/
            - method: GET,
            - minimum level required: elev,
            - url query: {
                includeArchived: Boolean,
                clasa: Array,
                profil: Array,
            }
            - response if success: {

            }
            - action description: gets all projects with the necesary filters applied

        projects/:id
            - method: GET,
            - minimum level required: elev,
            - response if success: {

            }
            - action description: 

        projects/unapproved
            - method: GET,
            - minimum level required: elev,
            - url query: {
                includeArchived: Boolean,
            }
            - response if success: {

            }
            - action description:

        projects/advanced
            - method: GET,
            - minimum level required: elev,
            - url query: {
                includeArchived: Boolean,
            }
            - response if success: {

            }
            - action description:

        projects/volunteering
            - method: GET,
            - minimum level required: elev,
            - url query: {
                includeArchived: Boolean,
            }
            - response if success: {

            }
            - action description:

        projects/created-projects
            - method: GET,
            - minimum level required: elev,
            - url query: {
                includeArchived: Boolean,
            }
            - response if success: {

            }
            - action description:

        projects/signed-up-projects
            - method: GET,
            - minimum level required: elev,
            - url query: {
                includeArchived: Boolean,
            }
            - response if success: {

            }
            - action description:

        projects/approve/:id
            - method: POST,
            - minimum level required: admin,
            - response if success: {
                success: true
            }
            - action description:

        projects/sign-up/:id
            - method: POST,
            - minimum level required: elev,
            - maximum level required: elev,
            - request body: {
                userId: String,
            }
            - response if success: {
                success: true,
            }
            - action description: 

        projects/ 
            - method: POST,
            - minimum level required: elev,
            - request body: {

            }
            - response if success: {

            }
            - action description: creates a new project for the current logged in user
        
        projects/:id
            - method: DELETE,
            - minimum level required: author or admin,
            - response if success: {

            }
            - action description:
        
        projects/:id
            - method: PUT, 
            - minimum level required: author or admin,
            - request body: {

            }
            - response if success: {

            }
            - action description:

#   Users:

        users/current-user
            - method: GET,
            - minimum level required: none,
            - response if success: {

            }
            - action description:

        users/teachers
            - method: GET
            - minimum level required: admin,
            - response if success: {
            
            }
            - action description:

        users/students
            - method: GET
            - minimum level required: profesor,
            - response if success: {
            
            }
            - action description:

        users/students/by-clasa
            - method: GET,
            - minimum level required: profesor,
            - url query: {
                clasa: Number,
                profil: String
            }
            - response if success: {

            }
            - action description:

        users/
            - method: GET,
            - minimum level required: admin,
            - response if success: {
                
            }
            - action description:

        users/:id 
            - method: GET,
            - minimum level required: profesor or current-user-id === id,
            - response if success: {

            }
            - action description:

        users/:id
            - method: PUT,
            - minimum level required: admin,
            - response if success: {

            }
            - action description:

        users/:id
            - method: DELETE,
            - minimum level required: admin,
            - response if success: {

            }
            - action description:

#   Internships:

        internships/
            - method: GET,
            - minimum level required: elev,
            - url query: {
                includeArchived: Boolean,
            }
            - response if success: {

            }
            - action description:

        internships/:id
            - method: GET
            - minimum level required: elev,
            - response if success: {

            }
            - action description:

        internships/created-internships
            - method: GET
            - minimum level required: profesor,
            - url query: {
                includeArchived: Boolean,
            }
            - response if success: {

            }
            - action description:

        internships/signed-up-internships
            - method: GET,
            - minimum level required: elev,
            - maximum level required: elev,
            - url query: {
                includeArchived: Boolean,
            }
            - response if success: {

            }
            - action description:

        internships/sign-up/:id
            - method: POST,
            - minimum level required: elev,
            - maximum level required: elev,
            - response if success: {

            }
            - action description:

        internships/
            - method: POST,
            - minimum level required: profesor,
            - request body: {

            }
            - response if success: {

            }
            - action description:

        internships/
            - method: PUT,
            - minimum level required: admin or author,
            - request body: {

            }
            - response if success: {

            }
            - action description:

        internships/
            - method: DELETE,
            - minimum level required: admin or author,
            - request body: {

            }
            - response if success: {

            }
            - action description:

#   Posts:

## Middlewares:

#   Security: 

#   Verification:

#   Data processing:

## Jobs: 

    