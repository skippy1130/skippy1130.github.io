
function arrayToSentence(arr) {
    return arr.slice(0, -2).join(', ') + 
      (arr.slice(0, -2).length ? ', ' : '') + 
      arr.slice(-2).join(' and ');
}
function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}
function click(buttonID) {
    var n = 1;
    var majors = [];
    var groups = [];
    while (document.getElementById(`${buttonID.split("#")[0]}#${n}`) != null) {
        var balls = document.getElementById(`${buttonID.split("#")[0]}#${n}`);
        majors.push(balls.dataset.major);
        groups.push(balls.dataset.group);
        n+=1;
    }
    alert(`Majors: ${arrayToSentence(removeDuplicates(majors))}\nGroups: ${arrayToSentence(removeDuplicates(groups))}`)
}
function Rclick(buttonID) {
    var n = 1;
    while (document.getElementById(`${buttonID.split("#")[0]}#${n}`) != null) {
        var balls = document.getElementById(`${buttonID.split("#")[0]}#${n}`);
        if (balls.style.textDecoration == "") {
            balls.style.textDecoration = "line-through";
        } else {
            balls.style.textDecoration = "";
        }
        n+=1;
    }
}





fetch("classes.json")
.then(response => response.json())
.then(data => {
    var classes = {};
    for (i in data) {
        var d = data[i];

        var newDiv = document.createElement("div");
        newDiv.classList.add("big");
        newDiv.classList.add("text");
        newDiv.setAttribute('id', i);
        const newContent = document.createTextNode(`${i} - GPA: ${d["GPA"].toFixed(3)}`);
        newDiv.appendChild(newContent);
        const currentDiv = document.getElementById("mainDiv");

        document.body.insertBefore(newDiv, currentDiv);
        for (j in d) {
            if (j != "GPA") {

                var newDiv = document.createElement("div");
                newDiv.classList.add("group");
                newDiv.classList.add("text");
                newDiv.setAttribute('id', j);
                newDiv.style.textDecoration == "";
                const newContent = document.createTextNode(`${j} - ${d[j][0]} Credits`);
                newDiv.appendChild(newContent);
        
                const currentDiv = document.getElementById("mainDiv");

                document.body.insertBefore(newDiv, currentDiv);

                var newDiv = document.createElement("div");
                newDiv.classList.add("classesHolder");

                for (k in d[j][1]) {

                    var newButton = document.createElement("button");
                    newButton.classList.add("classes");
                    newButton.classList.add("text");
                    newButton.dataset.major = i;
                    newButton.dataset.group = j;
                    newButton.onclick = function() {click(this.id);};
                    newButton.oncontextmenu = function() {Rclick(this.id);return false;};
                    newButton.style.textDecoration == "";

                    if (typeof d[j][1] == "string") {
                        //IF THIS IS THE SPECIAL "ANY OF" CASE
                        if (classes[d[j][1]] != null) {
                            classes[d[j][1]] += 1;
                            newButton.setAttribute('id', `${d[j][1]}#${classes[d[j][1]]}`);
                        } else {
                            newButton.setAttribute('id', `${d[j][1]}#1`);
                            classes[d[j][1]] = 1;
                        }
                        const newContent = document.createTextNode(d[j][1]);
                        newButton.appendChild(newContent);
                        newDiv.appendChild(newButton);
                        break;
                    }
                    if (classes[d[j][1][k]] != null) {
                        classes[d[j][1][k]] += 1;
                        newButton.setAttribute('id', `${d[j][1][k]}#${classes[d[j][1][k]]}`);
                    } else {
                        newButton.setAttribute('id', `${d[j][1][k]}#1`);
                        classes[d[j][1][k]] = 1;
                    }
                    const newContent = document.createTextNode(d[j][1][k]);
                    newButton.appendChild(newContent);
                    newButton.style.backgroundColor = "lightcoral";
                    newDiv.appendChild(newButton);
                }
                const currentDiv1 = document.getElementById("mainDiv");
                document.body.insertBefore(newDiv, currentDiv1);
                
            }
        }

    }

    for (j in classes) {
        if (classes[j] > 1) {
            for (var i = 0;i<classes[j];i++){
                document.getElementById(`${j}#${i + 1}`).style.backgroundColor = "lightgreen";
            }
        }
        if (classes[j] > 2) {
            for (var i = 0;i<classes[j];i++){
                document.getElementById(`${j}#${i + 1}`).style.backgroundColor = "lightblue";
            }
        }
    }
    for (i in data) {
        var d = data[i];
        for (j in d) {
            var max = 1;
            const arr = d[j][1];
            if (typeof arr == "string") {
                for (var i = 0;i<classes[arr];i++){
                    document.getElementById(`${arr}#${i + 1}`).style.backgroundColor = "lightblue";
                }
                continue;
            }
            /*

            for (k in arr) {
                if (classes[arr[k]] > max) {
                    max = classes[arr[k]];
                }
            }
            
            for (k in arr) {
                if (classes[arr[k]] == max) {
                    for (var i = 0;i<classes[arr[k]];i++){
                        document.getElementById(`${arr[k]}#${i + 1}`).style.backgroundColor = "lightblue";
                    }
                }
            }

            */
        }
    }

});