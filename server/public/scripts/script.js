const socket = io("http://localhost:3000/");

socket.on("user-send-failed", () => {
  alert("WRONG");
});
socket.on("user-send-succes", (data) => {
  $("#currenUser").html(data);
  $(".chatForm").show(1000);
  $(".loginForm").hide(1500);
});
socket.on("sever-send-onlineUser", (data) => {
  $("#boxContent").html("");
  data.forEach((i) => {
    $("#boxContent").append("<div class='user'>" + i + "</div>");
  });
});
socket.on("server-send-messages", (data) => {
  $("#listMessages").append(
    "<div class='ms'>" + data.un + ": " + data.nd + "</div>"
  );
});
socket.on('typing-by-someones', (data) =>{
  $("#noti").html(data);
})
socket.on('stop-typing-by-someones', (data) =>{
  $("#noti").html("");
})
$(document).ready(function () {
  $(".loginForm").show();
  $(".chatForm").hide();
  $("#txtMessages").focusin(() =>{
    socket.emit('typing-by-user');
  });
  $("#txtMessages").focusout(() =>{
    socket.emit('stop-typing-by-user');
  })

  $("#btnRegister").click(() => {
    socket.emit("client-send-userName", $("#txtUsername").val());
  });
  $("#bthLogout").click(() => {
    socket.emit("logout");
    $(".chatForm").hide(2000);
    $(".loginForm").show(1000);
  });
  $("#btnSubmit").click(() => {
    socket.emit("user-send-messages", $("#txtMessages").val());
    $("#txtUsername").val("");
  });
});
