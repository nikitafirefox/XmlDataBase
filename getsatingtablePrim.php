<?php
    include('simple_html_dom.php');
    
    $xml_doc = new DomDocument; 
    $xml_doc->Load('tables.xml');
    
    $tables = $xml_doc->getElementsByTagName('tables')->item(0);
    
    $table = NULL;
    foreach ($xml_doc->getElementsByTagName('table') as $tb){
        if($tb->getAttribute('name')==$_POST['TableSel']){
            $table = $tb;
        }
    }
    
     if($table == NULL){
         exit('Ошибка');
    }
    
    foreach ($table->getElementsByTagName('colPrimary') as $c){
    echo "<tr><td>".$c->getAttribute('name').
                "</td><td>".$c->getAttribute('type').
                "</td><td>".$c->getAttribute('auto')."</td></tr>";
    }
    
?>
