<?PHP defined('AJAXIM') || die('No direct script access.');
class CONFIG {

	private static $CONFIG = null;
	private static $_instance = '';
	private static $CFG = 'config.php';
	private static $CFG_DEFAULT = 'config_default.php';



	private function singleton() {
		self::$CONFIG === null && self::init();
		return self::$CONFIG;
	}



	private function init() {
		is_file(AJAXIM_ROOT.self::$CFG) || copy(AJAXIM_ROOT.self::$CFG_DEFAULT, AJAXIM_ROOT.self::$CFG) || die('lost config files!!!');
		(include AJAXIM_ROOT.self::$CFG) && (self::$CONFIG = $CONFIG);
		self::$CONFIG === null && die('couldn\'t init cconfig!!');
	}



	public static function getconf($flags) {
		$var = self::singleton();
		foreach($flags as $flag) {
			$var = $var[$flag];
		}
		return $var;
	}



	public static function setconf($flags, $value, $valueType = 'string') {
		$CONFIGFLAG = '$CONFIG';
		$valueType = strtolower($valueType);
		in_array($valueType, array('string', 'numeric', 'veriable')) || $valueType = 'string';
		foreach($flags as $flag) {
			$CONFIGFLAG .= '[\''.$flag.'\']';
		}
		$pointToValue = '';
		switch($valueType){
			case 'numeric':
				$pointToValue = " = $value;";
				break;
			case 'veriable':
				break;
			case 'string':
			default:
				$pointToValue = ' = \''.$value.'\';';
		}
		$preg = '/(\r|\r\n|\n)'.addcslashes($CONFIGFLAG, '[]\'\"$').'[^;]+;\s*(\/\/.+)?(\n|\r\n|\r)/';
		($data = file_get_contents(AJAXIM_ROOT.self::$CFG)) || die('could not load config file');
		$data = preg_replace($preg, "\n".self::interpolong($CONFIGFLAG).self::interpolong($pointToValue, 45).'$2'."\n", $data);
		file_put_contents(AJAXIM_ROOT.self::$CFG, $data) || die('could not write into config file');
		self::init();
	}



	private static function interpolong($string, $long = 35) {
		return sprintf('%-'.$long.'s', $string);
	}
}

function conf() {
	$args = func_get_args();
	return CONFIG::getconf($args);
}

function sconf() {
	$args  = func_get_args();
	$value = array_pop($args);
	CONFIG::setconf($args, $value);
}
/* end of file:libraries/class/CONFIG.class.php */