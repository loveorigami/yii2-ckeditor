CKEDITOR.dialog.add('btsgal', function (editor) {
    return {
        title: 'Gallery',
        minWidth: 300,
        minHeight: 150,
        resizable: false,
        contents: [
            {
                id: 'tab1',
                label: 'First Tab',
                title: 'First Tab',
                elements: [
                    {
                        id: 'type',
                        type: 'select',
                        label: "Type",
                        'default': "img",
                        items: [
                            ["gallery", 'gallery'],
                            ["img", 'img'],
                        ],
                        validate: CKEDITOR.dialog.validate.notEmpty("Explanation field cannot be empty."),
                        setup: function (widget) {
                            this.setValue('img');
                        },
                        commit: function (widget) {
                            widget.setData('type', this.getValue());
                        }
                    },
                    {
                        id: 'id',
                        type: 'number',
                        label: "Id",
                        validate: CKEDITOR.dialog.validate.notEmpty("Explanation field cannot be char."),
                        commit: function (widget) {
                            widget.setData('id', this.getValue());
                        }
                    },
                    {
                        id: 'pull',
                        type: 'select',
                        label: "Pull",
                        items: [
                            ["Right", 'right'],
                            ["Center", 'center'],
                            ["Left", 'left'],
                        ],
                        setup: function (widget) {
                            this.setValue(widget.data.btntype || '');
                        },
                        commit: function (widget) {
                            widget.setData('pull', this.getValue());
                        }
                    },
                ]
            }
        ],
        onShow: function () {
            this.setValueOf('tab1', 'id', editor.getSelection().getSelectedText().toString());
        },
        onOk: function () {
            var type = this.getValueOf('tab1', 'type');
            var id = this.getValueOf('tab1', 'id');
            var pull = this.getValueOf('tab1', 'pull');
            var align = pull ? ' pull="' + pull + '"': '';

            editor.insertHtml('[' + type + ' id="' + id + '"' + align + ']');
        }
    };
});