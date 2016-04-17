# Yii2 CKEditor

This is a fork [MihailDev/yii2-ckeditor](https://github.com/MihailDev/yii2-ckeditor)

#### Features:
- The ability to add custom plugins
- Initialisation editor on event
- Added custom plugins

Plugins:
- [Line Utilities](http://ckeditor.com/addon/lineutils)
- [Widget](http://ckeditor.com/addon/widget)
- [oembed](http://ckeditor.com/addon/oembed)
- Custom video (MP4, WebM)
- [Enhanced Image](http://ckeditor.com/addon/image2)
- [autocorrect](http://ckeditor.com/addon/autocorrect)
- [footnotes](http://ckeditor.com/addon/footnotes)


## Использование

```php
use mihaildev\ckeditor\CKEditor;
use yii\helpers\Html;

CKEditor::widget([
    'editorOptions' => [
        'preset' => 'full', //разработанны стандартные настройки basic, standard, full данную возможность не обязательно использовать
        'inline' => false, //по умолчанию false
    ]
]);

//или c ActiveForm

echo $form->field($post, 'content')->widget(CKEditor::className(),[
    'editorOptions' => [
        'preset' => 'full', //разработанны стандартные настройки basic, standard, full данную возможность не обязательно использовать
        'inline' => false, //по умолчанию false
    ],
]);
```

## Полезные ссылки

CKEditor Api - http://docs.ckeditor.com/

CKEditor Примеры - http://nightly.ckeditor.com/

Файл Менеджер ElFinder - https://github.com/MihailDev/yii2-elfinder