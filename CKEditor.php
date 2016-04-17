<?php
/**
 * Date: 10.04.16
 * Time: 11:44
 */

namespace mihaildev\ckeditor;


use yii\helpers\ArrayHelper;
use yii\helpers\Html;
use yii\web\JsExpression;
use yii\web\View;
use yii\helpers\Json;
use yii\widgets\InputWidget;
use Yii;

class CKEditor extends InputWidget
{
    /**
     * Editor options
     * @var array
     */

    public $editorOptions = [];
    /**
     * Container options
     * @var array
     */
    public $containerOptions = [];

    /**
     * Add extra plugins
     * @var array
     */
    public $extraPlugins = [
        'autosave',
        'autocorrect',
        'ckwebspeech',
        'codemirror',
        'oembed',
        'templates',
        'footnotes',
    ];

    private $corePlugins = [
        'image2',
        'dialog',
        'autolink',
        'widget',
        'lineutils',
        'justify',
        'codesnippet',
        'notification',
        'liststyle',
        'showblocks',
        //'sourcedialog',
    ];

    /**
     * Initialisation on event
     * @var bool
     */
    public $initOnEvent = false;

    private $_inline = false;

    const TYPE_STANDARD = 'standard';
    const TYPE_INLINE = 'inline';


    public function init()
    {
        parent::init();

        if (array_key_exists('inline', $this->editorOptions)) {
            $this->_inline = $this->editorOptions['inline'];
            unset($this->editorOptions['inline']);
        }

        if (array_key_exists('preset', $this->editorOptions)) {
            if ($this->editorOptions['preset'] == 'basic') {
                $this->presetBasic();
            } elseif ($this->editorOptions['preset'] == 'standard') {
                $this->presetStandard();
            } elseif ($this->editorOptions['preset'] == 'full') {
                $this->presetFull();
            }
            unset($this->editorOptions['preset']);
        }

        if ($this->_inline && !isset($this->editorOptions['height']))
            $this->editorOptions['height'] = 100;

        if ($this->_inline && !isset($this->containerOptions['id']))
            $this->containerOptions['id'] = $this->id . '_inline';
    }

    private function presetBasic()
    {
        $options['height'] = 100;

        $options['toolbarGroups'] = [
            ['name' => 'undo'],
            ['name' => 'basicstyles', 'groups' => ['basicstyles', 'cleanup']],
            ['name' => 'colors'],
            ['name' => 'links', 'groups' => ['links', 'insert']],
            ['name' => 'others', 'groups' => ['others', 'about']],
        ];

        $options['extraPlugins'] = $this->plugins();

        $options['removeButtons'] = 'Subscript,Superscript,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe';
        $options['removePlugins'] = 'elementspath';
        $options['resize_enabled'] = false;


        $this->editorOptions = ArrayHelper::merge($options, $this->editorOptions);
    }

    private function presetStandard()
    {
        $options['height'] = 300;

        $options['toolbarGroups'] = [
            ['name' => 'clipboard', 'groups' => ['mode', 'undo', 'selection', 'clipboard', 'doctools']],
            ['name' => 'editing', 'groups' => ['tools', 'about']],
            '/',
            ['name' => 'paragraph', 'groups' => ['templates', 'list', 'indent', 'align']],
            ['name' => 'insert'],
            '/',
            ['name' => 'basicstyles', 'groups' => ['basicstyles', 'cleanup']],
            ['name' => 'colors'],
            ['name' => 'links'],
            ['name' => 'others'],
        ];

        $options['removeButtons'] = 'Smiley,Iframe';

        $options['extraPlugins'] = $this->plugins();

        if ($this->_inline) {
            $options['extraPlugins'] = 'sourcedialog';
            $options['removePlugins'] = 'sourcearea';
        }

        $this->editorOptions = ArrayHelper::merge($options, $this->editorOptions);
    }


    private function presetFull()
    {
        $options['height'] = 400;

        $options['toolbarGroups'] = [
            ['name' => 'clipboard', 'groups' => ['mode', 'undo', 'selection', 'clipboard', 'doctools']],
            ['name' => 'editing', 'groups' => ['find', 'spellchecker', 'tools', 'about']],

            ['name' => 'paragraph', 'groups' => ['templates', 'align', 'list', 'indent', 'ckwebspeech']],
            ['name' => 'forms'],

            '/',

            ['name' => 'styles'],
            ['name' => 'blocks'],

            ['name' => 'basicstyles', 'groups' => ['basicstyles', 'colors', 'cleanup']],
            ['name' => 'links', 'groups' => ['links', 'insert']],
            ['name' => 'others'],
        ];

        // autogrow,
        $options['extraPlugins'] =  $this->plugins();

        if ($this->_inline) {
            $options['extraPlugins'] = 'sourcedialog';
            $options['removePlugins'] = 'sourcearea';
        }

        $this->editorOptions = ArrayHelper::merge($options, $this->editorOptions);
    }

    public function run()
    {
        Assets::register($this->getView());

        $this->addExtraPlugins();

        echo Html::beginTag('div', $this->containerOptions);

        if ($this->hasModel()) {
            echo Html::activeTextarea($this->model, $this->attribute, $this->options);
        } else {
            echo Html::textarea($this->name, $this->value, $this->options);
        }

        echo Html::endTag('div');


        if ($this->_inline) {

            $editorJs = $this->getCKeditor(self::TYPE_INLINE);

            $this->getView()->registerCss('#' . $this->containerOptions['id'] . ', #' . $this->containerOptions['id']
                . ' .cke_textarea_inline{height: ' . $this->editorOptions['height'] . 'px;}');
            $this->getView()->registerJs($editorJs, View::POS_END);

        } elseif ($this->initOnEvent) {

            $editorJs = $this->getCKeditor(self::TYPE_STANDARD);
            $js = 'jQuery("#' . $this->options['id'] . '").one("' . $this->initOnEvent . '", function () {' . $editorJs . '});';

            $this->getView()->registerJs($js, View::POS_END);

        } else {
            $editorJs = $this->getCKeditor(self::TYPE_STANDARD);
            $this->getView()->registerJs($editorJs, View::POS_END);
        }
    }

    private function getCKeditor($type)
    {
        $editorJs = null;
        switch ($type) {
            case self::TYPE_STANDARD :
                $editorJs = $this->typeStandard();
                break;
            case self::TYPE_INLINE :
                $editorJs = $this->typeInline();
                break;
        }
        return $editorJs;
    }

    private function typeInline()
    {
        $js = "CKEDITOR.inline(";
        $js .= Json::encode($this->options['id']);
        $js .= empty($this->editorOptions) ? '' : ', ' . Json::encode($this->editorOptions);
        $js .= ");";
        return $js;
    }

    private function typeStandard()
    {
        $js = "CKEDITOR.replace(";
        $js .= Json::encode($this->options['id']);
        $js .= empty($this->editorOptions) ? '' : ', ' . Json::encode($this->editorOptions);
        $js .= ");";
        return $js;
    }

    private function addExtraPlugins()
    {
        if (!is_array($this->extraPlugins) || !count($this->extraPlugins)) {
            return false;
        }
        $bundle = AssetsPlugins::register($this->getView());

        foreach ($this->extraPlugins as $name) {
            $pluginJs = "CKEDITOR.plugins.addExternal('$name', '$bundle->baseUrl/$name/');";
            $this->getView()->registerJs($pluginJs, View::POS_END);
        }

    }

    private function plugins(){
        $plugins = ArrayHelper::merge($this->corePlugins, $this->extraPlugins);
        return implode(',', $plugins);
    }

} 