<?php
    include('simple_html_dom.php');
    $xml_doc = new DomDocument; 
    $xml_doc->Load('tables.xml');
    
    $table = NULL;
    foreach ($xml_doc->getElementsByTagName('table') as $tb){
        if($tb->getAttribute('name')==$_POST['name1']){
            $table = $tb;
        }
    }   
    
    if($table == NULL){
         exit($_POST['name1']);
    }
    
    
    

    foreach ($table->getElementsByTagName('tsrc') as $c){
        echo "<span>".$c->getAttribute('namesrc')."</span>";
    }
   
?>
