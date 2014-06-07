<?
include('vk/vk.api.php');
$config['secret_key'] = 'YvhIAfUfDRNbiFAHLiFU';
$config['client_id'] = 4402236; // номер приложения
$config['user_id'] = 0; // id текущего пользователя (не обязательно)
//$config['access_token'] = 'ваш токен доступа';
$config['scope'] = 'wall,messages,video'; // права доступа к методам (для генерации токена)

$v = new Vk($config);
$url = $v->get_code_token();

echo $url;
?>
