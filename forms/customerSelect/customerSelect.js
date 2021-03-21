let req = ""
let query = ""
let results = ""
let pw = "@August30"
let userName = 'mjm46639'


customerSelect.onshow=function(){
  Dropdown1.clear()
  query = "SELECT name from customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=mjm46639&pass=" + pw + "&database=mjm46639&query=" + query)

  if (req.status == 200) { 
    customerSelectR = JSON.parse(req.responseText)
    console.log(customerSelectR)
  }
  if (customerSelectR.length == 0) {
    NSB.MsgBox("There were no customers found.")
  } else {
    for (i = 0; i <= customerSelectR.length - 1; i++)
      Dropdown1.addItem(customerSelectR[i])
  }
}

Dropdown1.onclick=function(s){
  if (typeof(s) == "object")
    return
  else {
    console.log(s)
    Dropdown1.value = s 
    query = `SELECT state from customer WHERE name = '${s}'`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=mjm46639&pass=" + pw + "&database=mjm46639&query=" + query)

    if (req.status == 200) {
      customerSelectState = JSON.parse(req.responseText)
      console.log(customerSelectState)
    }
    query = `SELECT name from customer WHERE state = '${customerSelectState[0]}'`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=mjm46639&pass=" + pw + "&database=mjm46639&query=" + query)
    
    if (req.status == 200) { //transit worked.
      customerSelectSameState = JSON.parse(req.responseText)
      console.log(customerSelectSameState)
    }
    
    let customerMessage = ""
    for (i = 0; i <= customerSelectSameState.length - 1; i++)
      customerMessage = customerMessage + customerSelectSameState[i] + "\n"
    Textarea1.value = customerMessage
  }  
}



Button1.onclick=function(){
  ChangeForm(customerDelete)
}
