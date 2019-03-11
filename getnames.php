<?php
    $xml_doc = new DomDocument; 
    $xml_doc->Load('tables.xml');
    
    foreach($xml_doc->getElementsByTagName('table') as $tb){
        echo '<option>'.$tb->getAttribute('name').'</option>';
    }
?>

