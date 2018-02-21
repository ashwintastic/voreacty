import {API_SERVER_URL} from '../config/config'

export default function uploadImage(url,data){

	api_url = API_SERVER_URL+api_url;

	return new Promise((resolve, reject) => {
    	let imageFormData = new FormData();
    	imageFormData.append('imageFile', imageFile);
 
    	let xhr = new XMLHttpRequest();
    
    	xhr.open('post',url, true);
    
    	xhr.onload = function () {
      		if (this.status == 200) {
        		resolve(this.response);
      	} else {
        		reject(this.statusText);
      	}
    	};
    	xhr.send(imageFormData);

  });

}