import axios from "axios";

export function getData(url, params) {
  var success = () => {};
  if (typeof params.success == "function") {
    success = params.success;
  }
  const SERVER_URL = getUrl();
  axios.get(SERVER_URL + url)
    .then(response => {
      success(response);
    }).catch(error => {
      console.log(error)
    params.swal.fire({
      title: "<strong>Server error</strong>",
      icon: "error",
      html: error,
      showCloseButton: true
    });
  });
}

export function getUrl() {
  return document.querySelector("#app").getAttribute("SERVER_URL");
}

export function postData(url, params) {
  var success = () => {
  };
  if (typeof params.success == "function") {
    success = params.success;
  }
  let method = 'post';
  if(typeof params.method != 'undefined'){
    method = 'delete';
  }
  axios({
    method: method,
    url: getUrl() + url,
    data: params.data
  }).then((response) => {
    success(response);
  }).catch((error) => {
    params.swal.fire({
      title: "<strong>Server error</strong>",
      icon: "error",
      html: error,
      showCloseButton: true
    });
  });
}

export function deleteData(url,params)
{
   params.method = 'delete';
   postData(url,params);
}
