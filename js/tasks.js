window.ToDoList = {

    API_BASE_URL:"http://localhost:8081/tasks",
    
    getTasks:function () {
$.ajax ({
    url:ToDoList.API_BASE_URL,
           method: "GET"

        }).done(function (response) {
            console.log(response);

    ToDoList.displayTasks(JSON.parse(response));
        })

    },

    createTask: function () {
        let descriptionValue = $("#description-field").val();
        let deadlineValue = $("#deadline-field").val();

        let requestBody = {
            description:descriptionValue,
            dealine:deadlineValue
        } ;

        $.ajax({
            url: ToDoList.API_BASE_URL,
            method: "POST",
            // also known as mime type
            contentType: "application/json",
            data: Json.stringify(requestBody)
        }).done(function () {
            ToDoList.getTasks();

        });
    },

    getTaskRow:function (task) {
        // spread operator(...)
        let formattedDeadline = new Date(...task.deadline).toLocaleDateString("ro");

        //ternary operator
        let checkedAtribute = task.done ? " checked " : "";

        // same result as with the ternary operator above
        // if (task.done) {
        //     checkedAtribute = "checked";
        // } else {
        //     checkedAtribute = "";
        // }


        return ` <tr>
        <td>${task.description}</td>
        <td>${formattedDeadline}</td>
        <td><input type="checkbox" data-id= ${task.id} class="mark-done" ${checkedAtribute}/></td>
        <td><a href="#" data-id=${task.id} class="delete-task">X</a> </td>

    </tr>`;
    },

    displayTasks: function (tasks) {
        // weak-typed(javascript) vs strong-typed(java)
        var tableBody = '';

        tasks.forEach(task => tableBody += ToDoList.getTaskRow(task));

        $("#tasks-table tbody").html(tableBody);
    },
    bindEvents: function () {
        // capturing the 'submit form' event to bind our function to it
        $("#new-task-form").submit(function (event) {
            event.preventDefault();

            ToDoList.createTask();

        })

    }

};

ToDoList.getTasks();
ToDoList.bindEvents();
