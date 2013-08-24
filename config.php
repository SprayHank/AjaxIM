<?PHP

$CONFIG = array();
// The backend engine library.
$CONFIG['DB_ENGINE']                = 'MySQL';                                  
define('DB_ENGINE', 'MySQL');

// The IM server library.
$CONFIG['IM_LIBRARY']               = 'Default';                                
define('IM_LIBRARY', 'Default');

// If you're using the default MySQL server, change the below to
// match your settings.
$CONFIG['MYSQL']['HOSTNAME']        = 'localhost';                              
$CONFIG['MYSQL']['DATABASE']        = 'zbv3hkz8yt_Discuzdatabase';              
$CONFIG['MYSQL']['USERNAME']        = 'zbv3hkz8yt_Di';                          
$CONFIG['MYSQL']['PASSWORD']        = '1q4r7u8i';                               
$CONFIG['MYSQL']['PREFIX__']        = 'ajaxim_';                                
define('MYSQL_HOSTNAME', 'localhost');
define('MYSQL_DATABASE', 'zbv3hkz8yt_Discuzdatabase');
define('MYSQL_USERNAME', 'zbv3hkz8yt_Di');
define('MYSQL_PASSWORD', '1q4r7u8i');
define('MYSQL_PREFIX', 'ajaxim_');

// Session cookie used by Ajax IM
$CONFIG['COOKIE']['NAME']           = 'ajaxim_session';                         
define('COOKIE_NAME', 'ajaxim_session');

// Cookie period, in days
$CONFIG['COOKIE']['PERIOD']         = '365';                                    
define('COOKIE_PERIOD', '365');

// Cookie domain (e.g.: .domain.com, if you want it to work for
// all domains and subdomains), if any.
$CONFIG['COOKIE']['DOMAIN'] = false;
define('COOKIE_DOMAIN', false);

// If you're using the NodeJS server, change the below to match
// your settings.
$nodejs_memcache_server = array('127.0.0.1', 11998);

/*end of file:config_default.php*/