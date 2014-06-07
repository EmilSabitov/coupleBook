<?php
/**
 * Created by: emilsabitov
 * Date: 07.06.14
 * Time: 16:15
 * 
 * File for:
 */
include_once('vk/vk.api.php');


$config['secret_key'] = 'YvhIAfUfDRNbiFAHLiFU';
$config['client_id'] = 4402236; // номер приложения
$config['user_id'] = 19042134; // id текущего пользователя (не обязательно)//
$config['scope'] = 'wall,messages,video'; // права доступа к методам (для генерации токена)
$config['access_token'] = 'bdae317bb90dd293998c882f4ca71cd4ca6aa187638bc7a2ac85c41c75f08af897fd92bb29dba4b12aac7';
$v = new Vk($config);

$mess = $v->api('messages.getHistory', array( "user_id" => '12873402', 'count'=>'200'));
var_dump($mess);

?>