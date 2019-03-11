<?php
    include('simple_html_dom.php');
    $html = str_get_html($_POST['table']);
    $html1 = str_get_html($_POST['tablePrim']);
    $html2 = str_get_html($_POST['tableSrc']);
    
    
    
    $xml_doc = new DomDocument; 

    $xml_doc->Load('tables.xml'); 

    $tables = $xml_doc->getElementsByTagName('tables')->item(0); 
    $table = NULL;
    foreach ($xml_doc->getElementsByTagName('table') as $tb){
        if($tb->getAttribute('name')==$_POST['nametable']){
            $table = $tb;
        }
    }
    
    if($table != NULL){
        $tables->removeChild($table);
    }
    
    $table = $xml_doc->createElement('table');
    
    $table->setAttribute('name',$_POST['nametable']);
    $tables->appendChild($table);
    
    foreach ($html1->find('span') as $row){
        $name = $row->find('input',0)->value;
        $type= $row->find('select',0)->value;
        $auto= $row->find('select',1)->value;
        $param;
        if($auto=='YES'){
            $param = $xml_doc->createElement("colPrimary",0);
        }
        else{
            $param = $xml_doc->createElement("colPrimary");
        }
        $param->setAttribute('name',$name);
        $param->setAttribute('type',$type);
        $param->setAttribute('auto',$auto);
        $table->appendChild($param);
    }
    
    $tablesrc = $xml_doc->createElement('tablesrc');
    $srccols = $xml_doc->createElement('srccols');
    
    $table->appendChild($tablesrc);
    $table->appendChild($srccols);
    
  
     if (!empty($html2)) {
     foreach ($html2->find('span') as $row){
        $name = $row->find('input',0)->value;
        $tab= $row->find('select',0)->value;
        $tab1;
        
        
       foreach ($xml_doc->getElementsByTagName('table') as $tb){
            if($tb->getAttribute('name')==$tab){
                $tab1 = $tb;
            }
        }
        
        
        $src = $xml_doc->createElement('src');
        $src ->setAttribute('name', $name);
        $src ->setAttribute('nametable', $tab);
        $srccols ->appendChild($src);
        
        
        
        $tsrc  = $xml_doc->createElement('tsrc');
        $tsrc -> setAttribute('typesrc', 'pr');
        $tsrc -> setAttribute('namesrc',$tab1->getAttribute('name'));
        $tablesrc ->appendChild($tsrc);
        
        $tab1src;
        
        foreach ($tab1->getElementsByTagName('tablesrc') as $s){
             $tab1src = $s;
        }
        
        $bool = FALSE;
        foreach ($tab1src->getElementsByTagName('tsrc') as $s){
            if($s->getAttribute('namesrc')!= $_POST['nametable']){
                $poh = $xml_doc->createElement('tsrc');
                $poh -> setAttribute('typesrc', 'cos');
                $poh -> setAttribute('namesrc',$s->getAttribute('namesrc'));
                $tablesrc ->appendChild($poh);
            }else{
                $bool = TRUE;
            }
        }
        
        if(!$bool){
            $poh = $xml_doc->createElement('tsrc');
            $poh -> setAttribute('typesrc', 'pr');
            $poh -> setAttribute('namesrc',$_POST['nametable']);
            $tab1src->appendChild($poh);
        }
        
    }
     }
    
    $cols = $xml_doc->createElement('cols');
    $table->appendChild($cols);
    
     if (!empty($html)) {
    foreach ($html->find('span') as $row){
        $name = $row->find('input',0)->value;
        $def = $row->find('input',1)->value;
        $type= $row->find('select',0)->value;
        $param = $xml_doc->createElement("col");
        $param->setAttribute('name',$name);
        $param->setAttribute('default',$def);
        $param->setAttribute('type',$type);
        $cols->appendChild($param);
    }
     }
    $xml_doc->save("tables.xml");
    
    
    
    if(file_exists($_POST['nametable'].'TR.xml')){
        $xml_doc1 = new DomDocument;
        $xml_doc1 -> Load($_POST['nametable'].'zad4.xml');
        $xml_doc2 = new domDocument("1.0", "utf-8");
        $root = $xml_doc2->createElement("table");
        $xml_doc2->appendChild($root);
        foreach ($xml_doc1->getElementsByTagName('row') as $r1){
            $r2 = $xml_doc2->createElement("row");
            $root->appendChild($r2);
            foreach ($table->getElementsByTagName('col') as $colH){
                $nameH = $colH->getAttribute('name');
                $defH = $colH->getAttribute('default');
                 
                foreach ($r1->getElementsByTagName('col') as $col1){
                    if(($col1->getAttribute('name'))==($colH->getAttribute('name'))){
                        $defH =  $col1->nodeValue;
                        break;
                    }
                }
                $col2 = $xml_doc2->createElement("col",$defH);
                $col2->setAttribute('name',$nameH);
                $r2->appendChild($col2);
            }
        }
        $xml_doc2->save($_POST['nametable'].'TR.xml');
    }
    else{
        $xml_doc1 = new domDocument("1.0", "utf-8");
        $root = $xml_doc1->createElement("table");
        $xml_doc1->appendChild($root);
        $xml_doc1->save($_POST['nametable'].'TR.xml');
    }
    
    echo 'ОК';
    
    
?>