CKEDITOR.dialog.add('btscol', function (editor) {
    return {
        title: 'Column',
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
                        id: 'disktop',
                        type: 'select',
                        label: "Disktop",
                        items: [['2'], ['3'], ['4'], ['6'], ['9'], ['12']],
                        setup: function (widget) {
                            this.setValue(widget.data.disktop || '');
                        },
                        commit: function (widget) {
                            widget.setData('disktop', this.getValue());
                        }
                    },
                    {
                        id: 'tablite',
                        type: 'select',
                        label: "Tab Lite",
                        items: [['2'], ['3'], ['4'], ['6'], ['9'], ['12']],
                        setup: function (widget) {
                            this.setValue(widget.data.tablite || '');
                        },
                        commit: function (widget) {
                            widget.setData('tablite', this.getValue());
                        }
                    },
                    {
                        id: 'mobile',
                        type: 'select',
                        label: "Mobile",
                        items: [['2'], ['3'], ['4'], ['6'], ['9'], ['12']],

                        setup: function (widget) {
                            this.setValue(widget.data.mobile || '');
                        },
                        commit: function (widget) {
                            widget.setData('mobile', this.getValue());
                        }
                    },
                ]
            }
        ],
        onOk: function () {
            var lg = (this.getValueOf('tab1', 'disktop') != "") ? "lg=" + this.getValueOf('tab1', 'disktop') : "lg=12";
            var md = (this.getValueOf('tab1', 'tablite') != "") ? "md=" + this.getValueOf('tab1', 'tablite') : "md=12";
            var sm = (this.getValueOf('tab1', 'mobile') != "") ? " sm=" + this.getValueOf('tab1', 'mobile') : "sm=12";
            var xc = lg + ' ' + md + ' ' + sm;
            var text = editor.getSelection().getSelectedText().toString();
            editor.insertHtml('[col ' + xc + ']' + text + '[/col]');
        }
    };
});
