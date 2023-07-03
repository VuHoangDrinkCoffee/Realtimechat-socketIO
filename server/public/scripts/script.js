  const socket = io("http://localhost:3000/");

  socket.on("server-send-room-list", (data) => {
    $("boxContent").html("");
    data.map((r) => {
      $("#boxContent").append("<h4 class='rooms'>" + r + "</h4>");
    });
  });

  socket.on("server-send-message", (data) =>{
    $("#listMessages").append("<h4 class='rooms'>" + data + "</h4>");
  })

  $(document).ready(function () {
    $(".loginForm").show();
    $(".chatForm").hide();
    $("#btnCreateRoom").click(() => {
      $("#currentRoom").html($("#txtRoomInput").val());
      $(".loginForm").hide(500);
      $(".chatForm").show(1000);
      socket.emit("room-created", $("#txtRoomInput").val());
    });

    $("#btnSubmit").click(() =>{
      socket.emit("user-send-message", $('#txtMessages').val());
    })

    $("#btnLogout").click(() => {
      $(".loginForm").show(500);
      $(".chatForm").hide(1000);
      socket.emit("leave-room", data.username);
    });
  });
