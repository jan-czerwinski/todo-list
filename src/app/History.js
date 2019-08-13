//skopiowane z bmi-calc
export default class History{
  genKey(){
    const newKey = parseInt(localStorage.getItem("i"))
    if(isNaN(newKey)){
      this.resetHistory()
      console.log(newKey)
      console.log("co tu sie")
      return this.genKey()
    }
    localStorage.removeItem("i")
    localStorage.setItem("i", (newKey+1))
    return newKey
  }

  addObj(obj){
    const key = this.genKey()
    const keyObj = {id:key}
    Object.assign(obj, keyObj)
    localStorage.setItem(key, JSON.stringify(obj))
  }

  modifyObj(key, modObj){
    const obj = JSON.parse(localStorage.getItem(key))
    const modObjArr = Object.entries(modObj)
    obj.modObjArr[0] = modObjArr[1]
    localStorage.setItem(key, JSON.stringify(obj))
  }

  resetHistory(){
    localStorage.clear()
    localStorage.setItem("i", 0);
  }

  readHistory(){
    const output = []
    const len = localStorage.length -1
    for(let i = 0; i < len; i++){
      const row = JSON.parse(localStorage.getItem(i))
      output.push(row)
    }
    return output
  }
}
