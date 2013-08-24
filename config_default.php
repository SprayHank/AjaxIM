<?PHP

$CONFIG = array();
// The backend engine library.
$CONFIG['DB_ENGINE'] = '';
define('DB_ENGINE', ' ');

// The IM server library.
$CONFIG['IM_LIBRARY'] = '';
define('IM_LIBRARY', ' ');

// If you're using the default MySQL server, change the below to
// match your settings.
$CONFIG['MYSQL']['HOSTNAME'] = '';
$CONFIG['MYSQL']['DATABASE'] = '';
$CONFIG['MYSQL']['USERNAME'] = '';
$CONFIG['MYSQL']['PASSWORD'] = '';
$CONFIG['MYSQL']['PREFIX__'] = '';
define('MYSQL_HOSTNAME', ' ');
define('MYSQL_DATABASE', ' ');
define('MYSQL_USERNAME', ' ');
define('MYSQL_PASSWORD', ' ');
define('MYSQL_PREFIX', ' ');

// Session cookie used by Ajax IM
$CONFIG['COOKIE']['NAME'] = 'ajaxim_session';
define('COOKIE_NAME', 'ajaxim_session');

// Cookie period, in days
$CONFIG['COOKIE']['PERIOD'] = '365';
define('COOKIE_PERIOD', '365');

// Cookie domain (e.g.: .domain.com, if you want it to work for
// all domains and subdomains), if any.
$CONFIG['COOKIE']['DOMAIN'] = false;
define('COOKIE_DOMAIN', false);

// If you're using the NodeJS server, change the below to match
// your settings.
$nodejs_memcache_server = array('127.0.0.1', 11998);

/*end of file:config_default.php*/