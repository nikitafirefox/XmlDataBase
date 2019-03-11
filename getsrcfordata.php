<?php
    
    include('simple_html_dom.php');
    
    $xml_doc = new DomDocument; 
    $xml_doc->Load($_POST['name1'].'TR.xml');

    foreach ($xml_doc->getElementsByTagName('col') as $s){
        if($s->getAttribute('TypeKey') == 'Primary'){
            echo '<option>'.$s->nodeValue.'</option>';
        }
    }
    
?>

