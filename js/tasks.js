window.ToDoList = {

    API_BASE_URL: "http://localhost:8081/tasks",

    getTasks: function () {
        $.ajax({
            url: ToDoList.API_BASE_URL,
            method: "GET"

        }).done(function (response) {
            console.log(response);

            ToDoList.displayTasks(JSON.parse(response));
        })

    },

    deleteTask: function (id) {
        $.ajax({
            url: ToDoList.API_BASE_URL + "?id" + id,
            method: "DELETE"

        }).done(function () {
            ToDoList.getTasks();
        })

    },

    createTask: function () {
        let descriptionValue = $("#description-field").val();
        let deadlineValue = $("#deadline-field").val();

        let requestBody = {
            description: descriptionValue,
            deadLine: deadlineValue
        };

        $.ajax({
            url: ToDoList.API_BASE_URL,
            method: "POST",
            // also known as mime type
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            ToDoList.getTasks();

        });
    },

    updateTask: function (id, done) {
        let requestBody = {
            done:done
        };
        $.ajax({
            url: ToDoList.API_BASE_URL + "?id=" + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            ToDoList.getTasks();

        });
    },

    getTaskRow: function (task) {
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

        });
// delegate is necessary here because the elements.mark-done
        //is not present in the page from the beginning,but injected later on
        $("#tasks-table").delegate(".mark-done", "change", function (event) {
            event.preventDefault();

            let taskId = $(this).data("id");
            let checked = $(this).is("checked");


            ToDoList.updateTask(taskId, checked);
        });

        $("#tasks-table").delegate(".delete-task", "clikc", function (event) {
            event.preventDefault();
            let taskId = $(this).data("id");

            ToDoList.deleteTask(taskId);



        });


    }

};

ToDoList.getTasks();
ToDoList.bindEvents();
