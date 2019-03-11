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




$res='<thead><tr class="table-warning">';

foreach ($table->getElementsByTagName('colPrimary') as $colpr){
   $res=$res.'<th scope="col"><span style="display:none;">primary</span><span>'.$colpr->getAttribute('name').'</span><span style="display:none;">'.
           $colpr->getAttribute('type').'</span><span style="display:none;">'.$colpr->getAttribute('auto').'</span></th>';
}

foreach ($table->getElementsByTagName('col') as $c){
    $res = $res.'<th scope="col"><span style="display:none;">osn</span><span>'.$c->getAttribute('name').'</span><span style="display:none;">'.
            $c->getAttribute('type').'</span><span style="display:none;">'.$c->getAttribute('default').'</span></th>';
}

foreach ($table->getElementsByTagName('src') as $c){
    $res = $res.'<th scope="col"><span style="display:none;">src</span><span>'.$c->getAttribute('name').'</span><span style="display:none;">'.
            $c->getAttribute('nametable').'</span></th>';
}


$res = $res.'</tr></thead><tbody>';

$xml_doc1 = new DomDocument;
$xml_doc1 -> Load($_POST['TableSel'].'TR.xml');

$table1 = $xml_doc1->getElementsByTagName('table')->item(0);



foreach ($table1->getElementsByTagName('row') as $row){
    
    
    foreach ($row->getElementsByTagName('col') as $c){
        if($c->getAttribute('TypeKey')=="Primary"){
          $res=$res.'<tr><th scope="col">'.$c->nodeValue.'</th>';
        }
        else{
        $res = $res.'<td>'.$c->nodeValue.'</td>';
        }
    }
    $res = $res.'</tr>';
}

$res = $res.'</tbody>';

echo $res;

?>