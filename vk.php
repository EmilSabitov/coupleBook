<?
include('vk/vk.api.php');
$config['secret_key'] = 'YvhIAfUfDRNbiFAHLiFU';
$config['client_id'] = 4402236; // номер приложения
$config['user_id'] = 19042134; // id текущего пользователя (не обязательно)//
$config['scope'] = 'wall,messages,video'; // права доступа к методам (для генерации токена)
$config['access_token'] = 'bdae317bb90dd293998c882f4ca71cd4ca6aa187638bc7a2ac85c41c75f08af897fd92bb29dba4b12aac7';
$v = new Vk($config);

$response = [];
if (isset($_GET['action'])) {
    switch ($_GET['action']) {
        case 'getDialogs':
        {
            $dialogs = $v->api('messages.getDialogs', array('captcha_sid' => '954391789268', 'captcha_key' => 'vmh2vz', "preview_length" => '1', 'count' => '2'));
            array_push($response, $dialogs);
            break;
        }
        case 'getUser' :
        {
            $dialogs = $v->api('users.get', array('user_ids' => $_GET['user_id']));
            break;
        }
        case 'getHistory' :
        {
            $dialogs = $v->api('messages.getHistory', array('user_id' => $_GET['user_id'], 'count' => '20'));
            array_push($response, $dialogs);
            break;
        }

        default:
            {
            array_push($response, "we don't have such action");
            break;
            }
    }

}
else {
    array_push($response, "action don't set");
}
//$mess = $v->api('messages.getHistory', array('captcha_sid' => '954391789268' , 'captcha_key' => 'vmh2vz', "user_id" => '12873402', 'count'=>'200'));
//var_dump($mess);

echo iconv('CP1252', 'UTF-8',(json_encode($response, JSON_UNESCAPED_UNICODE)));
?>
