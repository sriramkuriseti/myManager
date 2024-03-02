# myManager
A Task Manager


USING POSTMAN TO TEST THE BACKEND:
 POSTMAN it is popular API testing tool used in the development process to ensure that APIs are working as expected, even if there is no frontend interface yet.

TESTING:

 create base urls:

  * BASE_AUTH :  http://localhost:4000/api/v1/auth
  * BASE_TASK : http://localhost:4000/api/v1/task
  * BASE_SUBTASK : http://localhost:4000/api/v1/subTask
 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////___
AUTHENTICATION :
  
   POST: {BASE_AUTH}/signup
   body:{
          "firstName":"sriram",
         "lastName":"kuriseti",			 
         "phone_number":"+916302317026",
         "email":"sriramkuriseti@gmail.com",
         "password" : "Sriram@2003"
       }
     response : {
    "success": true,
    "user": {
        "firstName": "sriram",
        "lastName": "kuriseti",
        "email": "sriramkuriseti@gmail.com",
        "password": "$2b$10$BSKfZ.39v4fJ/hZm1ILzoOkpOXhLwfSJV.t1.puY7pe4akzttl1HS",
        "phone_number": "+916302317026",
        "priority": 2,
        "tasks": [],
        "_id": "65e28b8481df7ef5a89a3fe3",
        "createdAt": "2024-03-02T02:14:28.692Z",
        "updatedAt": "2024-03-02T02:14:28.692Z",
        "__v": 0
    },
    "message": "User Created Successfully"
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

LOGIN:
post : {BASE_AUTH}/login
body :
     {
      "email":"sriramkuriseti@gmail.com",
       "password" : "Sriram@2003"
     }

response:
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNyaXJhbWt1cmlzZXRpQGdtYWlsLmNvbSIsImlkIjoiNjVlMjhiODQ4MWRmN2VmNWE4OWEzZmUzIiwicGhvbmVfbnVtYmVyIjoiKzkxNjMwMjMxNzAyNiIsInByaW9yaXR5IjoyLCJpYXQiOjE3MDkzNDU2OTIsImV4cCI6MTcwOTQzMjA5Mn0.qQIEnv2pe0NGQVOVPNe4_cwDXJ2-HLLlg5P2t38fF4o",
    "user": {
        "_id": "65e28b8481df7ef5a89a3fe3",
        "firstName": "sriram",
        "lastName": "kuriseti",
        "email": "sriramkuriseti@gmail.com",
        "phone_number": "+916302317026",
        "priority": 2,
        "tasks": [],
        "createdAt": "2024-03-02T02:14:28.692Z",
        "updatedAt": "2024-03-02T02:14:28.692Z",
        "__v": 0,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNyaXJhbWt1cmlzZXRpQGdtYWlsLmNvbSIsImlkIjoiNjVlMjhiODQ4MWRmN2VmNWE4OWEzZmUzIiwicGhvbmVfbnVtYmVyIjoiKzkxNjMwMjMxNzAyNiIsInByaW9yaXR5IjoyLCJpYXQiOjE3MDkzNDU2OTIsImV4cCI6MTcwOTQzMjA5Mn0.qQIEnv2pe0NGQVOVPNe4_cwDXJ2-HLLlg5P2t38fF4o"
    },
    "message": "User Logged in successfully"
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
createTask:
post : {BASE_TASK}/createTask

body :

{   "title" : "sample project1",
    "description": "sample project description1",
    "due_date": "2024-03-07"
}

response :

{
    "success": true,
    "data": {
        "title": "sample project1",
        "description": "sample project description1",
        "subTasks": [],
        "due_date": "2024-03-07T00:00:00.000Z",
        "status": "TODO",
        "priority": 0,
        "deleted_at": null,
        "_id": "65e28bda81df7ef5a89a4007",
        "createdAt": "2024-03-02T02:15:54.017Z",
        "updatedAt": "2024-03-02T02:15:54.017Z",
        "__v": 0
    },
    "message": "Entry created successfully"
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
getUserTasks:

get : {BASE_TASK}/getUserTasks

body :

{
  "status" : "TODO",
  "page": 1,
  "limit": 10
}

response :
{
    "success": true,
    "data": [
        {
            "_id": "65e28bc181df7ef5a89a3ff8",
            "title": "sample project1",
            "description": "sample project description1",
            "subTasks": [],
            "due_date": "2024-03-03T18:30:00.000Z",
            "status": "TODO",
            "priority": 1,
            "deleted_at": null,
            "createdAt": "2024-03-02T02:15:29.281Z",
            "updatedAt": "2024-03-02T03:57:00.738Z",
            "__v": 0
        },
        {
            "_id": "65e28bc981df7ef5a89a3ffd",
            "title": "sample project1",
            "description": "sample project description1",
            "subTasks": [],
            "due_date": "2024-03-05T00:00:00.000Z",
            "status": "TODO",
            "priority": 2,
            "deleted_at": null,
            "createdAt": "2024-03-02T02:15:37.695Z",
            "updatedAt": "2024-03-02T03:57:00.738Z",
            "__v": 0
        },
        {
            "_id": "65e28bd381df7ef5a89a4002",
            "title": "sample project1",
            "description": "sample project description1",
            "subTasks": [],
            "due_date": "2024-03-06T00:00:00.000Z",
            "status": "TODO",
            "priority": 2,
            "deleted_at": null,
            "createdAt": "2024-03-02T02:15:47.723Z",
            "updatedAt": "2024-03-02T03:57:00.738Z",
            "__v": 0
        },
        {
            "_id": "65e28bda81df7ef5a89a4007",
            "title": "sample project1",
            "description": "sample project description1",
            "subTasks": [],
            "due_date": "2024-03-07T00:00:00.000Z",
            "status": "TODO",
            "priority": 3,
            "deleted_at": null,
            "createdAt": "2024-03-02T02:15:54.017Z",
            "updatedAt": "2024-03-02T03:57:00.738Z",
            "__v": 0
        }
    ],
    "message": "Tasks fetched successfully for user with ID 65e28b8481df7ef5a89a3fe3"
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  updateTask:
  
  put : {BASE_TASK}/updateTask/{taskId}
  
  body :
  {
    "title": "Updated Project Title",
    "description": "Updated project description",
    "due_date": "2024-03-31",
    "status": "IN_PROGRESS",
    "priority": 1
}
response :

{
    "success": true,
    "data": {
        "_id": "65e28bb881df7ef5a89a3ff3",
        "title": "Updated Project Title",
        "description": "Updated project description",
        "subTasks": [],
        "due_date": "2024-03-31T00:00:00.000Z",
        "status": "IN_PROGRESS",
        "priority": 1,
        "deleted_at": null,
        "createdAt": "2024-03-02T02:15:20.221Z",
        "updatedAt": "2024-03-02T02:20:43.035Z",
        "__v": 0
    },
    "message": "Task updated successfully"
}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
deleteTask:

 del : {BASE_TASK}/deleteTask/{taskId}
 
  body :

response :

{
    "success": true,
    "data": {
        "_id": "65e28bb881df7ef5a89a3ff3",
        "title": "Updated Project Title",
        "description": "Updated project description",
        "subTasks": [],
        "due_date": "2024-03-31T00:00:00.000Z",
        "status": "IN_PROGRESS",
        "priority": 3,
        "deleted_at": "2024-03-02T02:21:09.656Z",
        "createdAt": "2024-03-02T02:15:20.221Z",
        "updatedAt": "2024-03-02T02:21:09.657Z",
        "__v": 0
    },
    "message": "Task deleted successfully"
}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
createSubTask:

post : {BASE_SUBTASK}/createSubTask

  body :
  {
    "taskId": "65e28bb881df7ef5a89a3ff3",
    "subtaskDescription": "Sample subtask description4"
}
response :

{
    "success": true,
    "data": {
        "subtaskDescription": "Sample subtask description4",
        "status": 0,
        "deleted_at": null,
        "_id": "65e28d51a5748d08fb545933",
        "created_at": "2024-03-02T02:22:09.266Z",
        "updated_at": "2024-03-02T02:22:09.266Z",
        "createdAt": "2024-03-02T02:22:09.266Z",
        "updatedAt": "2024-03-02T02:22:09.266Z",
        "__v": 0
    },
    "message": "Entry created successfully"
}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

get : {BASE_SUBTASK}/getTaskSubTasks/{taskId}

  body :

response :
{
    "success": true,
    "data": [
        {
            "_id": "65e28d39a5748d08fb54591b",
            "subtaskDescription": "Sample subtask description1",
            "status": 0,
            "deleted_at": "2024-03-02T02:27:21.639Z",
            "created_at": "2024-03-02T02:21:45.927Z",
            "updated_at": "2024-03-02T02:21:45.927Z",
            "createdAt": "2024-03-02T02:21:45.934Z",
            "updatedAt": "2024-03-02T02:42:55.068Z",
            "__v": 0
        },
        {
            "_id": "65e28d44a5748d08fb545921",
            "subtaskDescription": "Sample subtask description2",
            "status": 1,
            "deleted_at": null,
            "created_at": "2024-03-02T02:21:56.063Z",
            "updated_at": "2024-03-02T02:21:56.063Z",
            "createdAt": "2024-03-02T02:21:56.064Z",
            "updatedAt": "2024-03-02T02:40:50.666Z",
            "__v": 0
        },
        {
            "_id": "65e28d4aa5748d08fb54592f",
            "subtaskDescription": "Sample subtask description3",
            "status": 1,
            "deleted_at": null,
            "created_at": "2024-03-02T02:22:02.935Z",
            "updated_at": "2024-03-02T02:22:02.935Z",
            "createdAt": "2024-03-02T02:22:02.936Z",
            "updatedAt": "2024-03-02T02:32:33.056Z",
            "__v": 0
        },
        {
            "_id": "65e28d51a5748d08fb545933",
            "subtaskDescription": "Sample subtask description4",
            "status": 1,
            "deleted_at": null,
            "created_at": "2024-03-02T02:22:09.266Z",
            "updated_at": "2024-03-02T02:22:09.266Z",
            "createdAt": "2024-03-02T02:22:09.266Z",
            "updatedAt": "2024-03-02T02:42:18.284Z",
            "__v": 0
        }
    ],
    "message": "SubTasks fetched successfully for user with ID 65e28bb881df7ef5a89a3ff3"
}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
updateSubTask:

put :  {BASE_SUBTASK}/updateSubTask/{subTaskId}

  body :

  {
    "taskId" : "65e28bb881df7ef5a89a3ff3",  
    "status":0
}

response :

{
    "success": true,
    "data": {
        "subtask": {
            "_id": "65e28d39a5748d08fb54591b",
            "subtaskDescription": "Sample subtask description1",
            "status": 1,
            "deleted_at": "2024-03-02T02:27:21.639Z",
            "created_at": "2024-03-02T02:21:45.927Z",
            "updated_at": "2024-03-02T02:21:45.927Z",
            "createdAt": "2024-03-02T02:21:45.934Z",
            "updatedAt": "2024-03-02T02:40:06.100Z",
            "__v": 0
        },
        "task": {
            "_id": "65e28bb881df7ef5a89a3ff3",
            "title": "Updated Project Title",
            "description": "Updated project description",
            "subTasks": [
                "65e28d39a5748d08fb54591b",
                "65e28d44a5748d08fb545921",
                "65e28d4aa5748d08fb54592f",
                "65e28d51a5748d08fb545933"
            ],
            "due_date": "2024-03-31T00:00:00.000Z",
            "status": "DONE",
            "priority": 3,
            "deleted_at": "2024-03-02T02:21:09.656Z",
            "createdAt": "2024-03-02T02:15:20.221Z",
            "updatedAt": "2024-03-02T02:42:18.300Z",
            "__v": 4
        }
    },
    "message": "Subtask and Task status updated successfully"
}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
deleteSubTask:
                                     
delete :  {BASE_SUBTASK}/deleteSubTask/{subTaskId}

  body :

response :

{
    "success": true,
    "data": {
        "_id": "65e28d39a5748d08fb54591b",
        "subtaskDescription": "Sample subtask description1",
        "status": 0,
        "deleted_at": "2024-03-02T02:45:49.752Z",
        "created_at": "2024-03-02T02:21:45.927Z",
        "updated_at": "2024-03-02T02:21:45.927Z",
        "createdAt": "2024-03-02T02:21:45.934Z",
        "updatedAt": "2024-03-02T02:45:49.755Z",
        "__v": 0
    },
    "message": "SubTask deleted successfully"
}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
