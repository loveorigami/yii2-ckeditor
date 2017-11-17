CKEDITOR.dialog.add('btstab', function (editor) {
    return {
        title: 'Tab and Accordion',
        minWidth: 500,
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
                        'default': "tabs",
                        items: [
                            ["Tabs", 'tabs'],
                            ["Accordion", 'collapse'],
                        ],
                        validate: CKEDITOR.dialog.validate.notEmpty("Explanation field cannot be empty."),
                        setup: function (widget) {
                            this.setValue('tabs');
                        },
                        commit: function (widget) {
                            widget.setData('type', this.getValue());
                        }
                    },
                    {
                        id: 'title',
                        type: 'text',
                        label: "Title",
                        validate: CKEDITOR.dialog.validate.notEmpty("Explanation field cannot be empty."),
                        setup: function (widget) {
                            this.setValue(widget.data.btntext || '');
                        },
                        commit: function (widget) {
                            widget.setData('title', this.getValue());
                        }
                    },
                ]
            }
        ],
        onOk: function () {
            var type = this.getValueOf('tab1', 'type');
            var title = this.getValueOf('tab1', 'title');
            var stext = editor.getSelection().getSelectedText().toString();

            if (type == 'tabs') {
                editor.insertHtml(
                    '[tabs]' +
                    '[tab title="' + title + '" active=1]' + stext + '[/tab]' +
                    '[tab title="Tab 2"]...text tab...[/tab]' +
                    '[/tabs]'
                );
            }

            if (type == 'collapse') {
                editor.insertHtml(
                    '[collapse]' +
                    '[panel title="' + title + '" active=1]' + stext + '[/panel]' +
                    '[panel title="Panel 2"]...text panel...[/panel]' +
                    '[/collapse]'
                );
            }
        }
    };
});