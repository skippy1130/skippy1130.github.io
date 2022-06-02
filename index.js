function update() {
  var i = 0;
  var numerator = 0;
  var denominator = 0;
  var total = 0;
  while (i < 500) {
    if (document.getElementById(i)) {
      if (document.getElementById(i).dataset.data == 0) {
        total = total + parseInt(document.getElementById(i).textContent.substring(document.getElementById(i).textContent.indexOf(":") + 2));
      } else {
        if (document.getElementById(i).dataset.data == 2) {
          total = total + (parseInt(document.getElementById(i).textContent.substring(document.getElementById(i).textContent.indexOf(":") + 2)) * 0.6);
        } else {
          numerator = numerator + 1;
        }
      }
      denominator = denominator + 1;
    }
    i = i + 1
  }
  document.getElementById("total").innerHTML = `${total} BE needed - ${numerator}/${denominator} Champions - ${denominator - numerator} to go`;
}

function buttonClick(id) {
  if (document.getElementById(id).dataset.data  == 0) {
    document.getElementById(id).style.background = "#4C8C38";
    document.getElementById(id).dataset.data = 1;
  } else {
    if (document.getElementById(id).dataset.data  == 1) {
      document.getElementById(id).style.background = "#4EBFBD";
      document.getElementById(id).dataset.data = 2;
    } else {
      document.getElementById(id).style.background = "#B5221D";
      document.getElementById(id).dataset.data = 0;
    }
  }
  temp = JSON.parse(document.cookie);
  temp[id] = document.getElementById(id).dataset.data;
  document.cookie = JSON.stringify(temp);
  update();
}

fetch("champs.json")
  .then(response => response.json())
  .then(data => {
    var n = 0;
    for (i in data) {
      data[i].in = n

      var newDiv = document.createElement("button");                     //Starting Button Creation
      newDiv.onmousedown = function() {buttonClick(this.id);};
      newDiv.classList.add("test1")
      newDiv.innerHTML = `<img src="/pics/${n}.webp" class="img1">`;
      newDiv.setAttribute('id', n);
      newDiv.dataset.data = 0;
      newDiv.ondragstart = function() { return false; };
      const newContent = document.createTextNode(`${i}: ${data[i].be}`);
      newDiv.appendChild(newContent);
      const currentDiv = document.getElementById("div1");
      document.body.insertBefore(newDiv, currentDiv);                   //Ending Button Creation

      n = n + 1;

    }
    var r;
    var temp;
    if (document.cookie == "") { //if no cookies
      temp = [];
      r = 0;
      while (r < Object.keys(data).length) {
        temp[r] = 0;
        r = r + 1;
      }
      document.cookie = JSON.stringify(temp);
    } else { //if cookies
      temp = JSON.parse(document.cookie);
      r = 0;
      while (r < Object.keys(data).length) {
        document.getElementById(r).dataset.data = temp[r];
        if (document.getElementById(r).dataset.data  == 0) {
          document.getElementById(r).style.background = "#B5221D";
        }
        if (document.getElementById(r).dataset.data  == 1) {
            document.getElementById(r).style.background = "#4C8C38";
        }
        if (document.getElementById(r).dataset.data  == 2) {
            document.getElementById(r).style.background = "#4EBFBD";
        }
        r = r + 1;
        }
      }
      update();
  })

window.addEventListener('keydown', (event) => { //TOGGLE ALL
  if (event.key == "k") {
    var k = 0;
    while (k < 500) {
      buttonClick(k)
      k = k + 1;
    }
  }
  update();
});

alert(`Press "k" to click all champs.`)
