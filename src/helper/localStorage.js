/**
 * Created by root on 31/7/17.
 */

class LocalStorage {

  writeOnLocalStorage(key){
    localStorage.setItem('accessToken', ""+key+"")

  }
  setKeyValuePair(key,value){
  	localStorage.setItem(key,value);
  }

  removeFromLocalStorage(key){
    localStorage.removeItem(key);
  }

  readFromLocalStorage(key){
    return  localStorage.getItem(key);
  }
}
export default new LocalStorage;

