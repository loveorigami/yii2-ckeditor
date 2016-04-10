<?php
/**
 * Date: 17.01.14
 * Time: 1:06
 */

namespace mihaildev\ckeditor;

use yii\web\AssetBundle;

class Assets extends AssetBundle{
	public $sourcePath = '@bower/ckeditor/';

    public $js = [
        'ckeditor.js',
    ];

	public $depends = [
		'yii\web\YiiAsset',
	];
}