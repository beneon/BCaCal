var result="0"
function btnClick(btnSrc){
  var cellClicked = $(btnSrc).attr("name")
  var cellTypeClicked = $(btnSrc).attr("dialType")

  switch (cellTypeClicked) {
    case "digit":
      if(result=="0"){
        result = cellClicked
      }else{
        result += cellClicked;
      }
      break;
    case "dot":
      if(result.indexOf(".")==-1){
        result += "."
      }else{
        console.log("w/ dot already")
      }
      break;
    case "bs":
      if(result.length>1){
        result = result.substr(0,(result.length-1))
      }else{
        result="0"
      }
      if(result[result.length-1]=="."){
        result = result.substr(0,(result.length-1))
      }
      break;
    default:
      console.log("only digit,dot,bs allowed,ur is: "+cellTypeClicked)
  }
  $("#dialResult").val(result)
  $("#dialResult").html(result+" <span class='glyphicon glyphicon-share-alt'></span>")
}

function btnSubmit(btnSrc){
  var resultFloat = parseFloat(result)
  result = "0"
  $(btnSrc).html("输入数值")
  return resultFloat
}
