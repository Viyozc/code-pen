function get(url, data) {
    let promise = new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      url = handle(url)
      xhr.open("GET", url, true);
      xhr.onreadystatechange = function() {
        if (this.readyState !== 4) return;
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      };
      xhr.onerror = function() {
        reject(new Error(this.statusText));
      };
      xhr.responseType = "json";
      xhr.setRequestHeader("Accept", "application/json");
      xhr.send(data);
    });
    return promise;
  }