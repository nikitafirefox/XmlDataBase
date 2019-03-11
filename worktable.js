$(document).ready(function(){
    
    GETNAMES();
    
     function GETNAMES(){        
        $.ajax({  
            type: 'GET',
            url: 'getnames.php',
            success: function(data) {
                $('#TableSel').html(data);
                GETTABLE();
            },
            error:  function(xhr, str){
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
        }); 
 
    }
    
    $('#TableSel').change(function(){
        GETTABLE();
    });
    
    function GETTABLE(){
       $('#MainTable').html("");
       var msg   = $('#FormTable').serialize();
        $.ajax({
            type: 'POST',
            url: 'gettblob.php',
            data: msg,
            success: function(data) {
                $('#MainTable').html(data);
                console.log(data);
            },
            error:  function(xhr, str){
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
        });
    }
    
    $('#Search').click(function(){
       $('#Sel').html('');
       $('thead').find('th').each(function(){
          $('#Sel').append('<option>'+$(this).text()+"</option>"); 
       });
       $('#MBtnRow').prop('disabled', true);
       $('#ModalRow').modal('show');
    });
    
    $('#Znach').keyup(function(){
        LOCK();
    });
    $('#Znach').change(function(){
        LOCK();
    });

    $('#HTMLtoXML').click(function(){
       $('#MBtn').prop('disabled', true);
       $('#Modal').modal('show');
    });

    $('#NameXML').keyup(function(){
        LOCK1();
    });
    $('#NameXML').change(function(){
        LOCK1();
    });
    
    function LOCK(){
        if($('#Znach').val().replace(/\s+/g,'') !== ""){
           $('#MBtnRow').prop('disabled', false);
        }else{
            $('#MBtnRow').prop('disabled', true);
        }
    }
    
    function LOCK1(){
        if($('#NameXML').val().replace(/\s+/g,'') !== ""){
           $('#MBtn').prop('disabled', false);
        }else{
            $('#MBtn').prop('disabled', true);
        }
    }
    
    $('#MBtnRow').click(function(){
       var coldel=[];
       var i=0;
       var b = true;
       $('thead').find('th').each(function(){
          if($(this).text()===$('#Sel').val()){
              b=false;
          }
          if(b){i++;}
       });
       
       $('tbody').find('tr').each(function(){
       var j = 0;
       var b = true;
       $(this).find('th').each(function(){
          if(j===i){
              if($(this).text()!==$('#Znach').val()){
                  b=false;
              }
          } 
          j++;
       });
       
       $(this).find('td').each(function(){
          if(j===i){
              if($(this).text()!==$('#Znach').val()){
                  b=false;
              }
            } 
          j++;
        });
       
       if(!b){
         coldel[coldel.length] = this;  
       }
       
       });
       
       for(var uu=0;uu<coldel.length;uu++){
           $(coldel[uu]).remove();
       }
       
       
       $('#ModalRow').modal('hide');
    });
    
    $('#MBtn').click(function(){
        $('#OsnTextArea1').val($('#MainTable').html());
        alert($('#OsnTextArea1').val());
        var msg   = $('#MBody').serialize();
        $.ajax({
            type: 'POST',
            url: 'SaveXML.php',
            data: msg,
            success: function(data) {
                
                alert('Сохраненно');
                console.log(data);
            },
            error:  function(xhr, str){
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
        });
        $('#Modal').modal('hide');
    });
});


