CKEDITOR.dialog.add('btsalerts', function (editor) {

    var clientHeight = document.documentElement.clientHeight;

    // Size adjustments.
    var size = CKEDITOR.document.getWindow().getViewPaneSize(),
        // Make it maximum 800px wide, but still fully visible in the viewport.
        width = Math.min(size.width - 70, 800),
        // Make it use 2/3 of the viewport height.
        height = size.height / 1.5;

    // Low resolution settings.
    if (clientHeight < 650) {
        height = clientHeight - 220;
    }
    return {
        title: 'Alerts',
        minHeight: 200,
        resizable: false,
        contents: [
            {
                id: 'tab1',
                label: 'First Tab',
                title: 'First Tab',
                elements: [
                    {
                        id: 'btntype',
                        type: 'select',
                        label: "Alert type",
                        items: [
                            ["Success", 'success'],
                            ["Info", 'info'],
                            ["Warning", 'warning'],
                            ["Danger", 'danger']
                        ],
                        validate: CKEDITOR.dialog.validate.notEmpty("Explanation field cannot be empty."),
                        setup: function (widget) {
                            this.setValue(widget.data.btntype || 'info');
                        },
                        commit: function (widget) {
                            widget.setData('btntype', this.getValue());
                        },
                    },
                    {
                        id: 'message',
                        type: 'text',
                        label: "Text",
                        validate: CKEDITOR.dialog.validate.notEmpty("Explanation field cannot be empty."),
                        setup: function (widget) {
                            this.setValue(widget.data.text);
                        },
                        commit: function (widget) {
                            widget.setData('message', this.getValue());
                        },
                        required: true,
                        inputStyle: 'cursor:auto;' +
                        'width:' + width + 'px;' +
                        'height:' + height + 'px;' +
                        'tab-size:4;' +
                        'text-align:left;',
                        'class': 'cke_source'
                    },
                ]
            }
        ],
        onShow: function () {
            this.setValueOf('tab1', 'message', editor.getSelection().getSelectedText().toString());
        }
        ,
        onOk: function () {
            var type = this.getValueOf('tab1', 'btntype');
            var message = this.getValueOf('tab1', 'message');
            editor.insertHtml('[alert type="' + type + '"]' + message + '[/alert]');
        }
    }
        ;
})
;