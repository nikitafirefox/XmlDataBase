$(document).ready(function(){
    var bool;
    
    START();
    
    function START(){
        var i=0;
        $('#TableSel').find('option').each(function(){
           i++; 
        });
        
        if (i <= 0){
          $('#table1').fadeOut(700,function(){
          $('#table2').fadeOut(600,function(){
          $('#table3').fadeOut(400,function(){
           $('h3').fadeOut(400,function(){
               $('#EditTable').fadeOut(300,function(){
                   $('#DelTable').fadeOut(200,function(){
                       $('#FormTable').fadeOut(100);
                   });
               });
           });
        });
        });
        });
  
       $('#AddTable').show();
   }else{
       $('#FormTable').fadeIn(700,function(){
           $('#DelTable').fadeIn(600,function(){
               $('#EditTable').fadeIn(500,function(){
                   $('h3').fadeIn(400,function(){
                       $('#table1').fadeIn(300,function(){
                           $('#table2').fadeIn(200,function(){
                           $('#table3').fadeIn(100,function(){
                            });                               
                            });
                       });
                   });
               });
           });
       });
       GETTABLEPARAM();
   }
    }
   
    $('#AddTable').click(function(){
       $('#MTitle').text('Создание таблицы');
       $('#MBtn').text('Создать'); 
       $('#FormModal').html("");
       $('#FormModalSrc').html("");
       $('#FormModalPrim').html('<span id="row"><div class="form-group row"><div class="col-sm-4">'+
               '<input type="text" id="NamePar" class="form-control" value="ID"/></div>'+
               '<div class="col-sm-4"><select id="SelPar" class="custom-select mr-sm-2"><option>VARCHAR</option>'+
               '<option>INT</option></select></div>'+'<div class="col-sm-4"><select id="SelAuto" class="custom-select mr-sm-2"><option>NO</option>'+
               '<option>YES</option></select></div></div></span>');
       $('#FormModalPrim #SelAuto').prop('disabled', true);
       $('#nametable').val("");
       $('#MBtn').prop('disabled', true);
       $('#nametable').prop('disabled', false);
       $('#nametable').val("");
       bool=false;
       GETPROVSRC();
       $('#Modal').modal('show');
   });
   
    $('#FormModalPrim').on('change','#SelPar',function(){
       var optionSelected = $("option:selected", this).text();
       var inputtype; 
      
       $(this).parent().parent().parent().find('#SelAuto').each(function(){
            inputtype = this;
        });
        
        $(inputtype).val("NO");
        if(optionSelected === "INT"){
            $(inputtype).prop('disabled', false);
        }else{
            $(inputtype).prop('disabled', true);
        }
   });
   
    $('#AddParam').click(function(){
       var i=0;
       $('#FormModal').find('label').each(function(){
          i=$(this).text();
       });
       i++;
      $('#FormModal').append('<span id="row"><div class="form-group row"><label class="col-sm-1 col-form-label">'+
               i+'</label><div class="col-sm-3"><input type="text" id="NamePar" class="form-control" value="param'+i
               +'"/></div>'+'<div class="col-sm-3"><select id="SelPar" class="custom-select mr-sm-2"><option>VARCHAR</option>'+
               '<option>INT</option></select></div>'
               +'<div class="col-sm-3"><input id="DefPar" type="text" class="form-control" value="NULL"/></div>'
               +'<div class="col-sm-2"><button id="DelParam" type="button" class="btn btn-danger shadow-sm">'+
               'Удалить</button></div></div></span>'); 
       LOCK();
   });
   
    $('#FormModal').on('click','#DelParam',function(){
        $(this).parent().parent().parent().remove();
        LOCK();
    }); 
   
    $('#FormModal').on('change','#SelPar',function(){
       var optionSelected = $("option:selected", this).text();
       var inputtype;
       $(this).parent().parent().parent().find('#DefPar').each(function(){
            inputtype = this;
        });
       if(optionSelected === "INT"){
           $(inputtype).attr('type','number')
           $(inputtype).val(0);
       }else{
           $(inputtype).attr('type','text')
           $(inputtype).val("NULL");
       }
       LOCK();
   });
   
    $('#FormModal').on('keyup','#NamePar',function(){
        LOCK();
    });
   
    $('#FormModal').on('keyup','#DefPar',function(){
        LOCK();
    });
    
    $('#FormModal').on('change','#DefPar',function(){
        LOCK();
    });
    
    $('#nametable').change(function(){
       LOCK(); 
    });
    
    $('#nametable').keyup(function(){
       LOCK(); 
    });
   
   function LOCK(){
       var boolLOCK = true;
       
       var i = 0;
       $('#FormModal').find('input').each(function(){
           i++;
           $(this).val($(this).val().replace(/\s+/g,'_'));
          if(boolLOCK){
            boolLOCK = ($(this).val()!=="");            
          } 
       });
       
       $('#nametable').val($('#nametable').val().replace(/\s+/g,'_'));
       if(!bool){
            $('#TableSel').find('option').each(function(){
                if(boolLOCK){
                    boolLOCK = $('#nametable').val() !== $(this).text();
                } 
            });
        }
      if((boolLOCK)&&($('#nametable').val() !== "")&&(i>0)){
          $('#MBtn').prop('disabled', false);
      }else{
        $('#MBtn').prop('disabled', true);  
      }
   }
   
   $('#MBtn').click(function(){
       
       $('#FormModalPrim').find('input').each(function(){
            $(this).attr('value',$(this).val());
       });
       
       $('#FormModalPrim').find('select').each(function(){
            $(this).attr('value',$("option:selected", this).text()); 
       });
       
       $('#FormTextareaPrim').html($('#FormModalPrim').html());
       
        $('#FormModalSrc').find('input').each(function(){
            $(this).attr('value',$(this).val());
       });
       
       $('#FormModalSrc').find('select').each(function(){
            $(this).attr('value',$("option:selected", this).text()); 
       });
       
       $('#FormTextareaSrc').html($('#FormModalSrc').html());
       
       $('#FormModal').find('input').each(function(){
            $(this).attr('value',$(this).val());
       });
       
       $('#FormModal').find('select').each(function(){
          $(this).attr('value',$("option:selected", this).text()); 
       });
   
       $('#FormTextarea').html($('#FormModal').html());
     
       var msg   = $('#BidFormTable').serialize();
        $.ajax({
            type: 'POST',
            url: 'postsetingtable.php',
            data: msg,
            success: function(data) {
                console.log(data);
                if(!bool){
                    $("#TableSel").html($("#TableSel").html()+'<option>'+$('#nametable').val()+'</option>');
                }
                START();
            },
            error:  function(xhr, str){
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
        }); 
        $('#Modal').modal('hide');
   });
   
   $('#TableSel').change(function(){
        GETTABLEPARAM();
   });
   
   function GETTABLEPARAM(){
       var msg   = $('#FormTable').serialize();
        $.ajax({
            type: 'POST',
            url: 'getsatingtable.php',
            data: msg,
            success: function(data) {
                $('#TableParamBody').html(data);
            },
            error:  function(xhr, str){
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
        }); 
        
        $.ajax({
            type: 'POST',
            url: 'getsatingtablePrim.php',
            data: msg,
            success: function(data) {
                $('#TablePrimaryKey').html(data);
            },
            error:  function(xhr, str){
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
        }); 
        
        $.ajax({
            type: 'POST',
            url: 'getsatingtableSrc.php',
            data: msg,
            success: function(data) {
                $('#TableSrcBody').html(data);
            },
            error:  function(xhr, str){
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
        }); 
   }
   
   function GETROWS(){
       var s='';
       var i=0;
       $('#TableParamBody').find('tr').each(function(){
           i++;
           s='<span id="row"><div class="form-group row"><label class="col-sm-1 col-form-label">'+i+'</label>';
           var j=0;
           $(this).find('td').each(function(){
              if(j===0){s+='<div class="col-sm-3"><input type="text" id="NamePar" class="form-control" value="'+
                          $(this).text()+'" readonly/></div>'}
              if(j===1){s+='<div class="col-sm-3"><select id="SelPar" class="custom-select mr-sm-2" disabled>'
              if($(this).text()==='VARCHAR'){s+='<option selected>VARCHAR</option><option>INT</option></select></div>'}else{
                  s+='<option>VARCHAR</option><option selected>INT</option></select></div>';
              }}
              if(j===2){
                 s+='<div class="col-sm-3"><input id="DefPar" type="text" class="form-control" value="'+
                         $(this).text()+'"readonly/></div>'; 
              }
              
              j++;
           });
           s+='<div class="col-sm-2"><button id="DelParam" type="button" class="btn btn-danger shadow-sm">Удалить</button></div></div></span>';
           $('#FormModal').append(s);
       });
       
   }
   function GETPRIM(){
       var s='<span id="row"><div class="form-group row"><div class="col-sm-4">';
        $('#TablePrimaryKey').find('tr').each(function(){
           var j=0;
           $(this).find('td').each(function(){
               if(j===0){
                   s+='<input type="text" id="NamePar" class="form-control" value="'+$(this).text()+'" disabled/></div>';
               }
               if(j===1){
                   s+='<div class="col-sm-4"><select id="SelPar" class="custom-select mr-sm-2" disabled>';
                   if($(this).text()==='VARCHAR'){
                       s+='<option selected>VARCHAR</option><option>INT</option></select></div>';
                   }else{
                       s+='<option>VARCHAR</option><option selected>INT</option></select></div>';
                   }
               }
               if(j===2){
                   s+='<div class="col-sm-4"><select id="SelAuto" class="custom-select mr-sm-2" disabled>';
                   if($(this).text()==='NO'){
                       s+='<option selected>NO</option><option>YES</option></select></div>';
                   }else{
                       s+='<option>NO</option><option selected>YES</option></select></div>';
                   }
               }
               j++;
           });
           s+= '</div></span>';
           $('#FormModalPrim').append(s); 
        });
        
   }
   function GETSRC(){
       var i=0;
       var s='';
        $('#TableSrcBody').find('tr').each(function(){
             i++;
            s+='<span id="row"><div class="form-group row"><label class="col-sm-1 col-form-label">'+i+'</label>';
           var j=0;
           $(this).find('td').each(function(){
               if(j===0){
                   s+='<div class="col-sm-5"><input type="text" id="NamePar" class="form-control" value="'
                           +$(this).text()+'" readonly/></div>';
               }else{
                   s+='<div class="col-sm-4"><input type="text" id="NamePar" class="form-control" value="'
                           +$(this).text()+'" readonly/></div>';
               }
               j++;
           });
           s+='<div class="col-sm-2"><button id="DelParam" type="button" class="btn btn-danger shadow-sm" >'+
               'Удалить</button></div></div></span>';
       });
       $('#FormModalSrc').append(s);
   }
   
   $('#EditTable').click(function(){
       $('#MTitle').text('Изменение таблицы');
       $('#MBtn').text('Изменить'); 
       $('#FormModal').html("");
       
       $('#FormModalSrc').html("");
       
       $('#FormModalPrim').html(""); 
       
       $('#nametable').val($('#TableSel option:selected').val());
       $('#MBtn').prop('disabled', false);
       $('#nametable').prop('disabled', true);
       GETSRC();
       GETROWS();
       GETPRIM();
       bool=true;
       GETPROVSRC();
       $('#Modal').modal('show');
   });
   
   $('#DelTable').click(function(){
       var msg   = $('#FormTable').serialize();
       $.ajax({
            type: 'POST',
            url: 'DelTable.php',
            data: msg,
            success: function(data) {
            },
            error:  function(xhr, str){
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
        });
       $('#TableSel option:selected').remove();
       START();
        
   });
   
   function GETPROVSRC(){
       $('#ContainerSrc1').html("");
       $('#ContainerSrc2').html("");
       $('#BigKostyl1').val($('#nametable').val());
       GETSCRTABLES();
       
   }
   
   function GETSCRTABLES(){
       var msg   = $('#BigKostyl').serialize();
        $.ajax({
            type: 'POST',
            url: 'getsrcnametables.php',
            data: msg,
            success: function(data) {
                console.log(data);
                $('#ContainerSrc1').append(data);
                GETSRCNEWTABLES();
            },
            error:  function(xhr, str){
                alert('Возникла ошибка: ' + xhr.responseCode);
            }
        });
    }
    
   function GETSRCNEWTABLES(){
       var i =0;
       $('#TableSel').find('option').each(function(){
           var b = true;
           var text = $(this).text();
           b = text !== $('#nametable').val();
           $('#ContainerSrc1').find('span').each(function(){

               if(b){
                   b = text!==$(this).text();
               }
           });
           
           $('#FormModalSrc').find('select').each(function(){
               if(b){
                   b = text!==$(this).val();
               }
           });
           
           if(b){
               $('#ContainerSrc2').append('<span>'+text+'</span>');
               i++;
           }
       });
       
       if(i>0){
           $('#AddSrc').prop('disabled', false);
       }else{
           $('#AddSrc').prop('disabled', true);
       }
   }
   

   $('#AddSrc').click(function(){
       var i=0;
       $('#FormModalSrc').find('label').each(function(){
          i=$(this).text();
       });
       i++;
      var s= '<span id="row"><div class="form-group row"><label class="col-sm-1 col-form-label">'+
               i+'</label><div class="col-sm-5"><input type="text" id="NamePar" class="form-control" value="src'+i
               +'"/></div>'+'<div class="col-sm-4"><select id="SelTableSrc" class="custom-select mr-sm-2">';
        $('#ContainerSrc2').find('span').each(function(){
            s+='<option>'+$(this).text()+'</option>';
        });
        s+='</select></div>'
                +'<div class="col-sm-2"><button id="DelParam" type="button" class="btn btn-danger shadow-sm" >'+
               'Удалить</button></div></div></span>';
       $('#FormModalSrc').append(s);
       
       GETPROVSRC();
       LOCK();
   });
   
   $('#FormModalSrc').on('change','select',function(){
       GETPROVSRC();
   });
   
   $('#FormModalSrc').on('click','#DelParam',function(){
        $(this).parent().parent().parent().remove();
        GETPROVSRC();
        LOCK();
    }); 
   
});