<?php
  include('simple_html_dom.php');

  $html = str_get_html($_POST['table1']);
  
  $dom = new domDocument("1.0", "utf-8");
  $root = $dom->createElement("table");
  $dom->appendChild($root);
  $cols=[];
  $i=0;
  
  foreach ($html->find('thead') as $thead){
      foreach ($thead->find('tr') as $tr){ 
          foreach ($tr->find('th') as $th){
            $col[$i] = $th->plaintext;
            $i++;
        }
    }
  }
    
    $N=$i;
  
    $kost = FALSE;
    
    foreach($html->find('tr') as $row) {
        
    if($kost)
    {
     
    $i=0;
    $rowXML = $dom->createElement("row");
    
    foreach ($row->find('th') as $td){

        $tz1=$td->plaintext;
        $colXML1= $dom->createElement("col",$tz1);
        $colXML1->setAttribute('name',$col[$i]."");
        $rowXML->appendChild($colXML1);
        $i++;
    }
    
    foreach ($row->find('td') as $td){

        $tz=$td->plaintext;
        
        $colXML= $dom->createElement("col",$tz);
        $colXML->setAttribute('name',$col[$i]."");
        $rowXML->appendChild($colXML);
        $i++;
    }
    $root->appendChild($rowXML);
    }
    $kost=TRUE;
    }

    
  $dom->save($_POST['TableName'].'_NEW.xml');

  echo "ОК";
?>


