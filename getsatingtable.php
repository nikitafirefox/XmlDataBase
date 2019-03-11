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
    

    $i=0;
    foreach ($table->getElementsByTagName('col') as $c){
        $i++;
        echo "<tr><th scope='row'>".$i."</th><td>".$c->getAttribute('name').
                "</td><td>".$c->getAttribute('type').
                "</td><td>".$c->getAttribute('default')."</td></tr>";
    }
    
?>