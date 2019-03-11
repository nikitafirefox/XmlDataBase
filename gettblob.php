<?php

    $xml_doc = new DomDocument; 
    $xml_doc->Load('tables.xml');
    $tables = $xml_doc->getElementsByTagName('tables')->item(0);
    
  
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
        $res=$res.'<th scope="col">'.$colpr->getAttribute('name').'</th>';
    }

    foreach ($table->getElementsByTagName('col') as $c){
        $res = $res.'<th scope="col">'.$c->getAttribute('name').'</th>';
    }
    
    $i=0;
    $col;
    $tab;

    foreach ($table->getElementsByTagName('src') as $c){
        foreach ($tables->getElementsByTagName('table') as $t){
            if($t->getAttribute('name') == $c->getAttribute('nametable')){
                $col[$i] = $c->getAttribute('name');
                $tab[$i] = $t->getAttribute('name');
                $i++;
                foreach ($t->getElementsByTagName('colPrimary') as $colpr){
                $res=$res.'<th scope="col">'.$colpr->getAttribute('name').'</th>';
                }

                foreach ($t->getElementsByTagName('col') as $cr){
                    $res = $res.'<th scope="col">'.$cr->getAttribute('name').'</th>';
                }

                foreach ($t->getElementsByTagName('src') as $cr){
                    $res = $res.'<th scope="col">'.$cr->getAttribute('name').'</th>';
                }
            }
        }
    }
    
    $N = $i;

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
            $b = TRUE;
            for($j=0;$j<$N;$j++){
                if($c->getAttribute('name')==$col[$j]){
                    $b=FALSE;
                    $xml_doc2 = new DomDocument;
                    $xml_doc2 -> Load($tab[$j].'TR.xml');
                    $table2 = $xml_doc2->getElementsByTagName('table')->item(0);
                    
                    foreach ($table2->getElementsByTagName('row') as $row1){
                        $b2 = FALSE;
                         foreach ($row1->getElementsByTagName('col') as $c1){
                             if($c1->getAttribute('TypeKey')=="Primary"){
                                 if($c1->nodeValue == $c->nodeValue){
                                   $b2 = TRUE;
                                   $res = $res.'<td>'.$c1->nodeValue.'</td>';
                                }
                             }else{
                                 if($b2){
                                    $res = $res.'<td>'.$c1->nodeValue.'</td>'; 
                                 }
                             }
                         }
                    }
                }
            }
            if($b){
                $res = $res.'<td>'.$c->nodeValue.'</td>';
            }
            }
        }
        $res = $res.'</tr>';
    }

    $res = $res.'</tbody>';

    echo $res;
?>

