    const userTable = document.getElementById("userTable");
    const form = document.getElementById("userform");
    let users = [];
    let currentSortColumn = '';
    let sortOrder = 'asc';
    const namePattern=/^[A-Za-z\s]+$/;
    form.addEventListener("submit", (event) => {
        
        event.preventDefault();
        const rollno = document.getElementById("rno").value;
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        if (isNaN(rollno)) {
            alert("Roll No should be a number");
         }else if (!(namePattern.test(name))) {
            alert("Name must be a string");
        } 
        else if (isNaN(age)) {
            alert("Age should be a number");
        } else {
        const details = {
            rollno: parseInt(rollno),
            name: name,
            age: parseInt(age)
        };

        users.push(details);
        userdetails();
        form.reset();
    }
    });


    function userdetails() {
        while(userTable.rows.length>1){
            userTable.deleteRow(1);        //deletes the row at index 1
        }
       
        users.forEach((data) => {
            const row = userTable.insertRow();
            const col1 = row.insertCell(0);
            const col2 = row.insertCell(1);
            const col3 = row.insertCell(2);
            col1.textContent = data.rollno;
            col2.textContent = data.name;
            col3.textContent = data.age;
        });
    }

    function sortTable(key) {
        if (currentSortColumn === key) {
            sortOrder = (sortOrder === 'asc') ? 'desc' : 'asc';
        } else {
            currentSortColumn = key;
            sortOrder = 'asc';
        }

         users.sort((a, b) => 
            {
            if (key === 'name') {
                return sortOrder === 'asc' 
                    ? a[key].localeCompare(b[key]): b[key].localeCompare(a[key]);  // String comparison for name
            } else {
                return sortOrder === 'asc'
                    ? a[key] - b[key] : b[key] - a[key];  // Numeric comparison for rollno and age
            }
        });
             
        userdetails();
    }


   