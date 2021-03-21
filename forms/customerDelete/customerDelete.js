req = ""
query = ""
results = ""

customerDelete.onshow = function() {
  Dropdown2.clear()
  query = "SELECT name from customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=mjm46639&pass=" + pw + "&database=mjm46639&query=" + query)

  if (req.status == 200) { 
    customerDeleteR = JSON.parse(req.responseText)
    console.log(customerDeleteR)
  }
  if (customerDeleteR.length == 0) {
    NSB.MsgBox("There are no customers to delete.")
  } else {
    for (i = 0; i <= customerDeleteR.length - 1; i++)
      Dropdown2.addItem(customerDeleteR[i])
  }
}

Dropdown2.onclick = function(s) {
  if (typeof(s) == "object")
    return
  else {
    Dropdown2.value = s 
    let DeleteName = s
    let found = false
    for (i = 0; i <= customerDeleteR.length - 1; i++) {
      if (DeleteName == customerDeleteR[i]) {
        found = true;
        break;
      }
    }
    if (found == false)
     Textarea2.value = `This customer does not exist. ${DeleteName} \n ${customerDeleteR}`
    else if (found == true) {
      query = "DELETE FROM customer WHERE name = " + '"' + DeleteName + '"'
      req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=mjm46639&pass=" + pw + "&database=mjm46639&query=" + query)
      
      if (req.status == 200) {
        if (req.responseText == 500) 
          console.log(`You successfully deleted the customer: ${DeleteName}`)
        else
          console.log(`There was a problem deleting ${DeleteName}.`)
      } else {
        console.log(`Error: ${req.status}`);
      }
    }
    query = `SELECT name from customer`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=mjm46639&pass=" + pw + "&database=mjm46639&query=" + query)

    if (req.status == 200) {
      customerAfterDelete = JSON.parse(req.responseText)
    } else {
      console.log(`Error: ${req.status}`);
    }
    let customersLeft = ""
    for (i = 0; i <= customerAfterDelete.length - 1; i++)
      customersLeft = customersLeft + customerAfterDelete[i] + "\n"
    Textarea2.value = customersLeft
  }
}
Button2.onclick=function(){
  ChangeForm(customerAdd)
}