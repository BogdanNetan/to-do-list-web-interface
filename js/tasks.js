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
        <td>1${formattedDeadline}</td>
        <td><input type="checkbox" data-id= ${task.id} class="mark-done" ${checkedAtribute}/></td>
        <td><a href="#" data-id=${task.id} class="delete-task">X</a> </td>

    </tr>`;
    },

    displayTasks: function (tasks) {
        // weak-typed(javascript) vs strong-typed(java)
        var tableBody = '';

        tasks.forEach(task => tableBody += ToDoList.getTaskRow(task));

        $("#tasks-table tbody").html(tableBody);
    }

};

ToDoList.getTasks();
