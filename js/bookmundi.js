function changeClassName(originalName, newName){
    elems = document.getElementsByClassName(originalName);
    console.log(elems.length)

    Array.from(elems).forEach(function(elm){
        console.log(elm)
        elm.setAttribute("class", newName);
    })
    console.log('classes changed')
}

function readAllDataAttrs(originalName){
    elems = document.getElementsByClassName(originalName);
    var regexp = new RegExp('^data-');
    document.getElementById("dataView").innerHTML = ""
    
    Array.from(elems).forEach(function(elem){
        dataAttrs = {}
        for(var i = 0; i < elem.attributes.length; i++) {
            var attr = elem.attributes[i];
            
            if(regexp.test(attr.name)) {
                dataAttrs[attr.name.replace(regexp, "")] = elem.getAttribute(attr.name)
            }
        }
        
        if(Object.keys(dataAttrs).length > 0){
            dataStr = ""
            Array.from(Object.keys(dataAttrs)).forEach(function(key){
                dataStr += key + ":" + dataAttrs[key] + " "
            })
            elem = document.createElement('li');
            elem.innerHTML = dataStr
            document.getElementById("dataView").appendChild(elem)
        }

    })
    console.log('data elems read')
}

function addNewElem(){
    userName = document.getElementById('newUserName').value
    userId = document.getElementById('newUserId').value
    if(userId == "" || userName == "" || typeof userName == undefined || typeof userId == undefined){
        return
    }
    elem = document.createElement('li');
    elem.setAttribute('class', 'red');
    elem.setAttribute('data-name', userName);
    elem.setAttribute('data-id', userId);
    elem.innerHTML = userName
    document.getElementById("usersList").appendChild(elem);

    document.getElementById('newUserName').value = ""
    document.getElementById('newUserId').value = ""
}

function renderHttpResponse(responseTxt){
    document.getElementById('getViewer').innerHTML = ""
    responseElem = document.createElement('text')
    responseElem.innerHTML = responseTxt
    document.getElementById('getViewer').appendChild(responseElem)
}

function makeAjaxGet(){
    document.getElementById('getViewer').innerHTML = "Loading GET response..."
    url = document.getElementById('getUrlAddr').value
    fetch(url).then(function(response) {
        console.log(response)
        return response.text();
      }).then(function(data) {
        renderHttpResponse(data);
      }).catch(function(error) {
        renderHttpResponse('Error loading URL: '+ url);
      });   
}

function loadCheckBoxes(dynamicElems){
    //load checkboxes
    checkboxRoot = document.getElementById("checkBoxView")
    checkboxRoot.innerHTML = ""
    Array.from(Object.keys(dynamicElems)).forEach(function(key){
        var cbElem = document.createElement("input");
        cbElem.setAttribute("type", "checkbox");
        cbElem.setAttribute("name", "dynamicCheckbox");
        console.log(dynamicElems[key].name)
        cbElem.setAttribute("value", dynamicElems[key].name);

        labelElem = document.createElement("label");
        labelElem.innerHTML = dynamicElems[key].name

        
        checkboxRoot.appendChild(cbElem)
        checkboxRoot.appendChild(labelElem)
    });
}

function loadSelector(dynamicElems){
    //load selector
    selectorViewDiv = document.getElementById('selectorView')
    selectorViewDiv.innerHTML = ""

    var selectRoot = document.createElement("select");
    selectRoot.setAttribute("id", "dynamicSelector");
   
    Array.from(Object.keys(dynamicElems)).forEach(function(key){
        console.log(dynamicElems[key].name)

        optionElem = document.createElement("option");
        optionElem.setAttribute("value", dynamicElems[key].name)
        optionElem.innerHTML = dynamicElems[key].name
        
        selectRoot.appendChild(optionElem)
    });
    console.log(selectRoot)
    selectorViewDiv.appendChild(selectRoot)
}

function loadDynamicValues(){
    dynamicElems = [
         {id: 1, name: "Sajan"},
         {id: 2, name: "Panch"},
         {id: 3, name: "Ariya"}
    ]
    
    loadCheckBoxes(dynamicElems);
    loadSelector(dynamicElems);
}

function readDynamicValues(){
    viewDiv = document.getElementById('dynamicView')
    viewDiv.innerHTML = ""

    selectorRoot = document.getElementById('dynamicSelector')
    selectorDataShower = document.createElement('p')
    selectorDataShower.innerHTML = 'Selected : '+ selectorRoot.value

    viewDiv.appendChild(selectorDataShower)

    var checkedBoxes = document.querySelectorAll('input[name=dynamicCheckbox]:checked');
    checkedValues = []
    Array.from(checkedBoxes).forEach(function(elem){
        checkedValues.push(elem.value)
    })

    checkDataShower = document.createElement('p')
    checkDataShower.innerHTML = 'Checked : '+ checkedValues.join(',')

    viewDiv.appendChild(checkDataShower)
}


function multipleRequests(){
    urls = [
        "https://jsonplaceholder.typicode.com/posts",
        "https://jsonplaceholder.typicode.com/posts",
        "https://jsonplaceholder.typicode.com/posts"
    ]
    progressDiv = document.getElementById("apiCallProgessView")
    progressDiv.innerHTML = ""

    updateTxt = document.createElement('p')
    updateTxt.innerHTML = 'starting 3 requests... '
    progressDiv.appendChild(updateTxt)

    const promises = urls.map(url => new Promise(resolve => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
              title: 'foo',
              body: 'bar',
              userId: 1,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          }).then(function(response) {
            return response.text();
        }).then(function(data) {
            updateTxt = document.createElement('p')
            updateTxt.innerHTML = 'resolved ' + url
            progressDiv.appendChild(updateTxt)
            resolve(data);
        }).catch(function(error) {
            updateTxt = document.createElement('p')
            updateTxt.innerHTML = 'failed ' + url
            progressDiv.appendChild(updateTxt)
            reject('Error loading URL: '+ url);
        });   
      }));
    
      Promise.all(promises).then(results => {
            updateTxtAll = document.createElement('p')
            updateTxtAll.innerHTML = 'all requests resolved '

            progressDiv.appendChild(updateTxtAll)
            
            console.log('done')
       });
}

function copyToClipboard(){
    var input = document.createElement('textarea');
    input.innerHTML = document.getElementById("clipboardInput").innerHTML;
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
}

function twoWayBindListner(e){
    console.log(e.target.value)
    console.log(document.getElementById('twoWayBindView'))
    twowayBinderApply(e.target.value);
}

function twowayBinderApply(value){
    document.getElementById('twoWayBindView').innerHTML  = value
}

function addTwoWayBindListner(){
    document.getElementById('twoWayBindInput').addEventListener('input', twoWayBindListner);
}

function twoWayBindReset(){
    document.getElementById('twoWayBindInput').value = "Reset";
    twowayBinderApply(document.getElementById('twoWayBindInput').value)
}



onload = function(){
    loadDynamicValues()
    addTwoWayBindListner()
}