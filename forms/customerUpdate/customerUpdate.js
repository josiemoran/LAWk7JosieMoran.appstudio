req = ""
query = ""
results = ""

customerUpdate.onshow = function() {
  drpUpdate.clear()
  query = "SELECT name from customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=mjm46639&pass=" + pw + "&database=mjm46639&query=" + query)

  if (req.status == 200) {
    results = JSON.parse(req.responseText)
    console.log(results)
  }
  if (results.length == 0) {
    console.log("No customers to update.")
  } else {
    for (i = 0; i <= results.length - 1; i++)
      drpUpdate.addItem(results[i])
  }
}
let oldName = ''

drpUpdate.onclick = function(s) {
  if (typeof(s) == "object")
    return
  else {
    drpUpdate.value = s
    oldName = s
  }
}


btnFinal.onclick = function() {
  let newName = Input1.value
  let found = false
  for (i = 0; i <= results.length - 1; i++)
    if (oldName == results[i]) {
      found = true
      break
    }

  if (found == false)
    console.log("Customer does not exist.")
  else if (found == true) {
    query = `UPDATE customer SET name = '${newName}' WHERE name = '${oldName}'`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=mjm46639&pass=" + pw + "&database=mjm46639&query=" + query)

    if (req.status == 200) { 
      if (req.responseText == 500) { 
       console.log(`You changed the customers name!`)
        inpUpdate.value = ""
        drpUpdate.value = "Customer"
      } else
        console.log(`Could not change the name.`)
    } else
      console.log(`Error: ${req.status}`);
  } 
  query = "SELECT name from customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=mjm46639&pass=" + pw + "&database=mjm46639&query=" + query)

  if (req.status == 200) { //transit worked.
    results = JSON.parse(req.responseText)
  }
 if (results.length == 0) {
    NSB.MsgBox("There are no customers.")
  } else {
    let customersUpdate = ""
    for (i = 0; i <= results.length - 1; i++)
      customersUpdate = customersUpdate + results[i] + "\n"
    txtaUpdate.value = customersUpdate
  }
}