<?php
/**
 * Date: 17.01.14
 * Time: 1:06
 */

namespace mihaildev\ckeditor;

use yii\web\AssetBundle;

class AssetsPlugins extends AssetBundle{

	public function init()
    {
        $this->sourcePath = __DIR__ . "/plugins";
        parent::init();
    }
	
	public $depends = [
		'mihaildev\ckeditor\Assets',
	];
}