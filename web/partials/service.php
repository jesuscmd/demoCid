<?php 

require_once('twitteroauth.php');

function tw_tokoauth2($id) {
	$consk = 'irKUT8caxIAy8QwZ7huiImP82';
	$conss = '8lsquIWdPBJ0uiTNAk6Wh7nlDLvRyCGi71wPXBDS2KbgoapJNn';
	return array($consk,$conss);
}

function tw_tokoauth3() {
	$tok = '179708819-wD38AsjVhCyKyONhNGJvluGj6gY49QIWXyycUUb1';
	$toks = 'N2YiTRBLiXYDs5A9FNQrXEEgPxF4TxVtLPiHhDDziwmRU';
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
			$a[] = $content->name;
			$a[] = $content->screen_name;

			$a[] = str_replace('_normal' ,'' , $content->profile_image_url);
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

	//print_r($a);
	return $a;
}

/* require the user as the parameter */
if(isset($_GET['user'])) {

	$cta = $_GET['user'];

	$posts = tw_perfil($cta);

	//$posts = array();

	header('Content-type: application/json');
	echo json_encode(array('data'=>$posts));

} else {
	header('Content-type: application/json');
	echo json_encode(array('data'=>'Error'));
}

?>