
$(document).on("click","#insert",function(){
  var dados = {
    "nome":$("#name").val(),
    "email":$("#email").val(),
    "senha":$("#password").val()
  }

    $.ajax({
    type:"post",
    data:dados,
    url:"http://profrodolfo.com.br/webservice/index.php", 
    success:function(data){
           alert(data);
           ShowAll();
           Clear();
    },
    error: function(){
           alert("Erro ao realizar o cadastro");
    }
  });
  
});

function Clear(){
   $("#name").val('');
   $("#email").val('');
   $("#password").val('');
}

function ShowAll(){
  $.getJSON("http://profrodolfo.com.br/webservice/index.php?listar",function(data){
    var text = '';
   for(var i = 0; i < data.length; i++){
     text += "<li>" + data[i].nm_aluno;
     text += "<button class='btn btn-danger btn-sm delete' value="+data[i].cd_aluno+">X</button>";
     text += "<button class='btn btn-primary btn-sm update' value="+data[i].cd_aluno+">✏️</button></li>";
   }
   $("#list").html(text);
  });
}

function teste() {
    if($("#name").val() === '' || $("#email").val() === '' || $("#password").val() === '')
    {
      $('#insert').prop('disabled', true);
    } else {
      $('#insert').prop('disabled', false);
    }
}

$(document).on("click",".delete",function(){
  var code = $(this).val();
  
    $.ajax({
    type:"get",
    url:"http://profrodolfo.com.br/webservice/index.php?excluir="+ code, 
    success:function(data){
           alert(data); 
           ShowAll();
    },
    error: function(){
           alert("Erro ao excluir o cadastro");
    }
  });
  Clear();
});

$(document).on("click",".update",function(){
    var code = $(this).val();
    $("#insert").hide("fast");
    $("#update").show("slow");
  $.getJSON("http://profrodolfo.com.br/webservice/index.php?listar",function(data){
   for(var i = 0; i < data.length; i++){
     $("#name").val(data[i].nm_aluno);
     $("#email").val(data[i].ds_email);
     $("#password").val(data[i].ds_senha);
   }
    $("#code").val(code);
  });

});



$(document).on("click","#update",function(){

 var dados2 = {
    "cd":$("#code").val(),
    "nome":$("#name").val(),
    "email":$("#email").val(),
    "senha":$("#password").val()
 }
    $.ajax({
    type:"post",
    data:dados2,
    url:"http://profrodolfo.com.br/webservice/index.php", 
    success:function(data){
           alert(data); 
           ShowAll();
    },
    error: function(){
           alert("Erro ao atualizar o cadastro");
    }
  });
  Clear();
  $("#insert").show("fast");
  $("#update").hide("slow");
});


$(document).ready(function(){
 ShowAll();
 $("#update").hide();
 $("#insert").prop("disabled",true);
});