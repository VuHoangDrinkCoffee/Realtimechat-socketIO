const socket = io("http://localhost:3000/");

socket.on("user-send-failed", () => {
  alert("WRONG");
});
socket.on("user-send-succes", (data) => {
  $("#currenUser").html(data);
  $(".chatForm").show(1000);
  $(".loginForm").hide(1500);
});
socket.on('sever-send-onlineUser', (data)=>{
    $('#boxContent').html('');
    data.forEach((i)=>{
        $('#boxContent').append("<div class='user'>" + i + "<div>")
    }); 
})
$(document).ready(function () {
  $(".loginForm").show();
  $(".chatForm").hide();

  $("#btnRegister").click(() => {
    socket.emit("client-send-userName", $("#txtUsername").val());
  });
});
