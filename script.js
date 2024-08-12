document
.getElementById("location")
.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (document.getElementById("location").value.trim() !== "") {
      getWeatherInfo();
    } else {
      var alertDiv = document.getElementById("empty-input-alert");
      alertDiv.style.display = "block";
      setTimeout(function () {
        alertDiv.style.display = "none";
      }, 3500);
    }
  }
});

function getWeatherInfo() {
  var location = document.getElementById("location").value.trim();
  var access_key = "edd9a63772014bea9cb73011241503";
  var url =
    "https://api.weatherapi.com/v1/current.json?key=" +
    access_key +
    "&q=" +
    location;
  $.get(url, function (data) {
    if (data) {
      var temp = data.current.temp_c;
      var desc = data.current.condition.text;
      var icon = "https://" + data.current.condition.icon.substring(2);
      var info =
        "<h3>Current Weather in " +
        location +
        "</h3><br><img src=" +
        icon +
        "><br>" +
        temp +
        " °C<br>" +
        desc;
      $("#weather-info").html(info);
    } else {
      var errorInfo =
        "<h3>Oops, we couldn't find any information for " +
        location +
        ". Please try again.</h3>";
      $("#weather-info").html(errorInfo);
    }
  }).fail(function() {
      var errorInfo =
        "<h3>Oops, there was an error retrieving the weather information. Please try again.</h3>";
      $("#weather-info").html(errorInfo);
  });
}