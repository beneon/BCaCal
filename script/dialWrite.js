function parentIDVarification(parentID){
  var tgContent = $(parentID).html()
  if (tgContent == null){
    console.log("parameter is not right")
    return null
  }else if(tgContent.search(/\w/) != -1){
    console.log("content between the <> should be empty, "+parentID)
    return null
  }else{
    return tgContent
  }
  //判定：1找得到这个对象 2里面没有内容（不要错把其他东西覆盖了）
}

function dialWrite(tagType){
  var result = "<"+tagType+" class='dialContainer'>"
  var immediateWrap = "</"+tagType+">"
  var tagDepth = 0;
  this.oneLevelDown = function(idname,classname){
    console.log(idname+","+classname)
    this.idname = idname == null?"":" id='"+idname+"'"
    this.classname = classname == null?"":" class='"+classname+"'"
    var tag = "<"+tagType+this.idname+this.classname+">"
    result += tag
    tagDepth ++
  }
  this.oneLevelUp = function(){
    if(tagDepth>0){
      result += immediateWrap
      tagDepth --
      return tagDepth
    }else if(tagDepth == 0){
      console.log("back to top now");
      return 0
      //最后的那个</tagType>就放在return的时候才加吧
    }else{
      console.log("well, it's odd, tagDepth is "+tagDepth)
      return -1
    }
  }
  this.fillContent = function(contentStr){
    result += contentStr
  }
  //----- when all is done
  this.finalizeResult = function(){
    for(var n=tagDepth;n>=0;n--){
      //n>=0: 下属tag都要有</tag>，然后总的container tag也要有，所以+1
      //这里是对于最后完结的时候自动补全所有</tag>
      result += "</"+tagType+">"
    }
    return result
  }
}
function addPTag(str,classname){
  var result = classname==null?"":("class='"+classname+"'")
  result = "<p "+result+">"+str+"</p>"
  return result
}
function padCreate(parentID){
  var dialButtons = [7,8,9,4,5,6,1,2,3,".",0,"<"]
  var rows = 4
  var colums = 3
  function currentCount(i,j){
    return i*colums+j
  }
  var tgContent = parentIDVarification(parentID)
  if(tgContent != null){
    var result = new dialWrite("div")
    result.oneLevelDown("disp","oneFifthH button");
    result.fillContent(addPTag("0","centerAlign"));
    result.oneLevelUp();
    result.oneLevelDown("dialPad","fourFifthH")
    for(var i=0;i<rows;i++){
      result.oneLevelDown(null,"oneFifthH")
      for(var j=0;j<colums;j++){
        var cellName = dialButtons[currentCount(i,j)]
        result.oneLevelDown("cell"+cellName,"button oneThirdW")
        result.fillContent(addPTag(cellName,"centerAlign"))
        result.oneLevelUp()
      }
      result.oneLevelUp()
    }
    var htmlResult = result.finalizeResult();
    console.log(htmlResult)
    $(parentID).html(htmlResult)
  }
}
