import axios from 'axios';

const ApiCall = {
    getItem: function(ItemUrl, callback) {
    let url = ItemUrl.url;
    let method = ItemUrl.method;
    var headers = {
      "x-api-key": userToken
    };
    axios
      .request({ url: url, method: method, headers })
      .then(response => {
        if (response) {
          callback(response);
        } else {
          let error = "error";
          return error;
        }
      })
      .catch(function(error) {
        return "error";
      });
  },
  getAllData:function(allDataArray, callback){
    let config = {
        headers: {
          'x-access-token': userToken
        }
    }
    axios.all([
        axios.get(allDataArray[0].url, config),
        axios.get(allDataArray[1].url, config)
      ])
      .then(results => {
          callback(results);   
      });
  }
}

export default ApiCall;