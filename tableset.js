$(document).ready(function(){
    var boolrow;
    var changeelem;
    var numberC;
    var tcontants;
    var autoinc;
    
    $('#TableSel').change(function(){
        GETTABLE();
    });
    
    function GETNAMES(){        
        $.ajax({  
            type: 'GET',
            url: 'getnames.php',
            success: function(data) {
                $('#TableSel').html(data);
                START();
            },
            error:  function(xhr, str){
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
        }); 
 
    }
    
    function START(){
        var i=0;
        $('#TableSel').find('option').each(function(){
           i++; 
        });
        if (i <= 0){
        $('#TableRows').fadeOut(600);
        $('#FormTable').fadeOut(600);
        $('#tableno').fadeIn(700);
        }else{
        $('#TableRows').fadeIn(700);
        $('#FormTable').fadeIn(700);
        $('#tableno').fadeOut(600);
        GETTABLE();
        }
    }
    
   function GETTABLE(){
       $('#MainTable').html("");
       var msg   = $('#FormTable').serialize();
        $.ajax({
            type: 'POST',
            url: 'getdatatable.php',
            data: msg,
            success: function(data) {
                $('#MainTable').html(data);
            },
            error:  function(xhr, str){
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
        }); 
   }
   
   function GETSETTINGSROW(){
       var str = '';
       if(boolrow){
           $('#MainTable').find('thead').each(function() {
                $(this).find('tr').each(function(){
                   $(this).find('th').each(function(){
                       var tp = "";
                       var name = "";
                       var type = "";
                       var auto = "";
                       var def = "";
                       var src = "";
                      $(this).find('span').each(function() {
                          if (tp===""){
                             tp = $(this).text(); 
                          }
                          else{
                              if(tp==="primary"){
                                  if(name === ""){
                                      name = $(this).text();
                                  }else{
                                      if(type === ""){
                                         type = $(this).text();
                                      }
                                      else{
                                          if(auto === ""){
                                              auto = $(this).text();
                                          }
                                      }
                                  }
                                 
                              }
                              if(tp==="osn"){
                                  if(name === ""){
                                      name = $(this).text();
                                  }else{
                                      if(type === ""){
                                         type = $(this).text();
                                      }
                                      else{
                                         if(def === ""){
                                         def = $(this).text();
                                      }
                                    }
                                  }
                              }
                              if(tp==="src"){
                                if(name === ""){
                                    name = $(this).text();
                                }else{
                                    if(src === ""){
                                        src = $(this).text();
                                    }
                                }  
                              }
                          }
                      
                      });
                      str+='<div class="form-group row"><label for="name" class="col-sm-4 col-form-label">'+
                               name+'</label><div class="col-sm-8">';
                      if(tp==="primary"){

                        
                          if(type === 'VARCHAR'){
                            str+='<input type="text" class="form-control" value=""/>';
                        }else{
                            if(auto==='NO')
                            {
                                str+='<input type="number" class="form-control" value=""/>';
                            }else{
                                var uu = $('#AutoNumKos').text();
                                uu++;
                                str+='<input type="number" class="form-control" value="'+uu+'" readonly/>';
                            }
                        }
                        
                      }
                      if(tp==="osn"){
                          if(type === 'VARCHAR'){
                            str+='<input type="text" class="form-control" value="'+def+'"/>';
                        }else{
                            str+='<input type="number" class="form-control" value="'+def+'"/>';
                        }
                      }
                      if(tp==="src"){
                          str+="<select class='custom-select mr-sm-2'></select><span style='display:none;'>"+src+'</span>'
                      }
                        
                       str+='</div></div>';
                       
                       
                      
                      
                   }); 
                });
           });
       }
       else{
           var i = 0;
           $('#MainTable').find('thead').each(function() {
                $(this).find('tr').each(function(){
                   $(this).find('th').each(function(){
                    
                       var tp = "";
                       var name = "";
                       var type = "";
                       var auto = "";
                       var def = "";
                       var src = "";
                      $(this).find('span').each(function() {
                          if (tp===""){
                             tp = $(this).text();
                             
                          }
                          else{
                              if(tp==="primary"){
                                  if(name === ""){
                                      name = $(this).text();
                                  }else{
                                      if(type === ""){
                                         type = $(this).text();
                                      }
                                      else{
                                          if(auto === ""){
                                              auto = $(this).text();
                                          }
                                      }
                                  }
                                 
                              }
                              if(tp==="osn"){
                                  if(name === ""){
                                      name = $(this).text();
                                  }else{
                                      if(type === ""){
                                         type = $(this).text();
                                      }
                                      else{
                                         if(def === ""){
                                         def = $(this).text();
                                      }
                                    }
                                  }
                              }
                              if(tp==="src"){
                                if(name === ""){
                                    name = $(this).text();
                                }else{
                                    if(src === ""){
                                        src = $(this).text();
                                    }
                                }  
                              }
                          }
                      
                      });
                      str+='<div class="form-group row"><label for="name" class="col-sm-4 col-form-label">'+
                               name+'</label><div class="col-sm-8">';
                      if(tp==="primary"){

                        
                          if(type === 'VARCHAR'){
                            str+='<input type="text" class="form-control" value="'+numberC+'"/>';
                        }else{
                            if(auto==='NO')
                            {
                                autoinc=false;
                                str+='<input type="number" class="form-control" value="'+numberC+'"/>';
                            }else{
                                autoinc=true;;
                                str+='<input type="number" class="form-control" value="'+numberC+'" readonly/>';
                            }
                        }
                        
                      }
                      if(tp==="osn"){
                          if(type === 'VARCHAR'){
                            str+='<input type="text" class="form-control" value="'+tcontants[i]+'"/>';
                        }else{
                            str+='<input type="number" class="form-control" value="'+tcontants[i]+'"/>';
                        }
                        i++;
                      }
                      if(tp==="src"){
                          str+="<select class='custom-select mr-sm-2'></select><span style='display:none;'>"+src+'</span>'
                          
                          i++;
                      }
                        
                       str+='</div></div>';
                       
                       
                      
                      
                   }); 
                });
           });
       }
       $('#MRowsBody').html(str);
   }
   
   $('#MRowsBody').on('keyup','input',LOCKROW);
   $('#MRowsBody').on('change','input',LOCKROW);
   $('#MRowsBody').on('change','select',LOCKROW);
   
   function LOCKROW(){
    var b = true;
    var bu = true;
    var text;
    $('#MRowsBody').find('input').each(function(){
        if(bu){
            text=$(this).val();
            bu=false;
        }
    });
    
    
    
    $('tbody').find('th').each(function(){
       if(b){
           b = $(this).html() !== text;
       } 
    });
    
    $('#MRowsBody').find('input').each(function(){
       if(b){
           b=$(this).val().replace(/\s+/g,'') !== "";
       } 
    });
    
    $('#MRowsBody').find('select').each(function(){
       if(b){
           b=$(this).val().replace(/\s+/g,'') !== "";
       } 
    });
    
    
    if(b){
        $('#MBtnRow').prop('disabled', false);
    }else{
        $('#MBtnRow').prop('disabled', true);
    }
    
   }
   
   $('#MBtnRow').click(function(){
      if(boolrow){
          
          $('#MainTable').find('tbody').each(function(){
            var b = true;  
            var str='';
            $('#MRowsBody').find('input').each(function(){
                if(b){
                  str+='<tr><th scope="col">'+$(this).val()+'</th>';
                  b=false;
                }else{
                 str+='<td>'+$(this).val()+'</td>';
                }

            });
            $('#MRowsBody').find('select').each(function(){
                str+='<td>'+$(this).val()+'</td>';
            });
            str+='</tr>';
            
            if(autoinc){
                var uu = $('#AutoNumKos').text();
                uu++;
                $('#AutoNumKos').text(uu);
            }
            $(this).append(str);
          });
      }else{
            $('#MainTable').find('tbody').each(function(){
            var b = true;  
            var str='';
            $('#MRowsBody').find('input').each(function(){
                if(b){
                  str+='<th scope="col">'+$(this).val()+'</th>';
                  b=false;
                }else{
                 str+='<td>'+$(this).val()+'</td>';
                }

            });
            $('#MRowsBody').find('select').each(function(){
                str+='<td>'+$(this).val()+'</td>';
            });
           
            $(changeelem).html(str);
            });
        }
        $('#ModalRow').modal('hide');
   });
   
   $('#MainTable').on('click','tbody tr', function(){
        var t=[];
        var c;
        $(this).contents('th').each(function(){
            c=$(this).text();
        });
        $(this).contents('td').each(function(){
            t[t.length]=$(this).text();
        });
        numberC = c;
        tcontants = t;
        changeelem = this;
        $('#MTitleRow').text('Изминение записи №'+c);
        $('#MBtnRow').text('Изменить');
        $('#MBtn').prop('disabled', false);
        boolrow = false;
        GETSETTINGSROW();
        GETSRC();
        $('#MBtnRow2').show();
        $('#ModalRow').modal('show');
    });
   
   $('#AddBut').click(function(){
        $('#MTitleRow').text('Добавление записи');
        $('#MBtnRow').text('Добавить');
        boolrow = true;
        GETSETTINGSROW();
        GETSRC();
        $('#MBtnRow').prop('disabled', true);
        LOCKROW();
        $('#MBtnRow2').hide();
        $('#ModalRow').modal('show');
    });
    
   $('#MBtnRow2').click(function(){
        $('#ModalRow').modal('hide');
        $(changeelem).remove();
        var i=0;
        $('#MainTable tbody').find('th').each(function(){
            $(this).html(++i);
        });
    });
   
   $('#HTMLtoXML').click(function(){
        $('#OsnTextArea').html("<table>"+$('#MainTable').html()+"</table>");
        var msg   = $('#FormTable').serialize();
        $.ajax({
            type: 'POST',
            url: 'savetable.php',
            data: msg,
            success: function(data) {
                alert(data);
            },
            error:  function(xhr, str){
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
        });
    });
    
    function GETSRC(){
        $('#MRowsBody').find('select').each(function(){
           var name;
           $(this).parent().find('span').each(function(){
              name = $(this).text(); 
   
           });
           $('#FormBigKost1').val(name);
           var el = this;
        var msg   = $('#FormBigKost').serialize();
        $.ajax({
            type: 'POST',
            url: 'getsrcfordata.php',
            data: msg,
            success: function(data) {
              $(el).html(data);
             
            },
            error:  function(xhr, str){
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
        });
           
        });
    }
    
    GETNAMES();
    
});


