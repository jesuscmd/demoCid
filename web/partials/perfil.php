<?php 

require_once('twitteroauth.php');

$cta = 'jesus_jimmy3';

tw_perfil($cta);

function tw_tokoauth2($id) {
	// global $db, $link;
	
	// mysql_select_db($db, $link);
	// $q = "select consumer_key, consumer_secret from oauth_tw where id=$id ";
	// $r = mysql_query($q) or die ("Error FATAL al leer oauth_tw en $db: " . mysql_error());
	// if($row = mysql_fetch_object($r)) {
		$consk = 'irKUT8caxIAy8QwZ7huiImP82';
		$conss = '8lsquIWdPBJ0uiTNAk6Wh7nlDLvRyCGi71wPXBDS2KbgoapJNn';
	// } else {
	// 	$consk = "";
	// 	$conss = "";
	// }
	
	return array($consk,$conss);
}

function tw_tokoauth3() {
	// global $db, $link;
	
	// mysql_select_db($db, $link);
	// $q = "select oauth_token, oauth_token_secret from tokens_tw where id=$id ";
	// $r = mysql_query($q) or die ("Error FATAL al leer tokens_tw en $db: " . mysql_error());
	// if($row = mysql_fetch_object($r)) {
		$tok = '179708819-wD38AsjVhCyKyONhNGJvluGj6gY49QIWXyycUUb1';
		$toks = 'N2YiTRBLiXYDs5A9FNQrXEEgPxF4TxVtLPiHhDDziwmRU';
	// } else {
	// 	$tok = "";
	// 	$toks = "";
	// }
	
	return array($tok,$toks);
}



function tw_perfil($cta) {
	$a = array();
	$tipo_tw = 1;
	// tokens
	$idtok_int = 1;
	list($consk,$conss) = tw_tokoauth2($idtok_int);
	list($tok,$toks) = tw_tokoauth3();
	
	$cta = trim($cta);
	if( $cta != "" ) {
		// API 1.1
		$ap = array("screen_name" => $cta,
			"include_entities" => 0);
		
		$q2 = 'users/show';
		$connection = new TwitterOAuth($consk, $conss, $tok, $toks);
		$content = $connection->get($q2, $ap);
		//content da todo
		if(isset($content->errors)) {
			$a[] = $content->errors[0]->message;
			$a[] = "error code " . $content->errors[0]->code;
			$a[] = "";
			$a[] = -1;
			$a[] = -1;
			$a[] = -1;
			$a[] = -1;
			$a[] = -1;
			$a[] = "";
			$a[] = "";
			$a[] = "";
			$a[] = "";
		} else {
			//print_r($content);
			$a[] = $content->name;
			$a[] = $content->screen_name;
			$a[] = $content->profile_image_url;
			// $a[] = $content->id;
			// $a[] = $content->followers_count;
			// $a[] = $content->friends_count;
			// $a[] = $content->statuses_count;
			// $a[] = $content->favourites_count;
			// $a[] = $content->created_at;
			// $a[] = $content->description;
			// $a[] = $content->location;
		}
	}
	
	print_r($a);
	return $a;
}


//nos da el arreglo
?>