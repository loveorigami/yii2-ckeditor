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
                        items: [['1'], ['2'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8'], ['9'], ['10'], ['11'], ['12']],
                        setup: function (widget) {
                            this.setValue(widget.data.disktop || '');
                        },
                        commit: function (widget) {
                            widget.setData('disktop', this.getValue());
                        }
                    },
                    {
                        id: 'mobile',
                        type: 'select',
                        label: "Mobile",
                        items: [['1'], ['2'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8'], ['9'], ['10'], ['11'], ['12']],

                        setup: function (widget) {
                            this.setValue(widget.data.mobile || '');
                        },
                        commit: function (widget) {
                            widget.setData('mobile', this.getValue());
                        }
                    },
                    {
                        id: 'tablite',
                        type: 'select',
                        label: "Tab Lite",
                        items: [['1'], ['2'], ['3'], ['4'], ['5'], ['6'], ['7'], ['8'], ['9'], ['10'], ['11'], ['12']],
                        setup: function (widget) {
                            this.setValue(widget.data.tablite || '');
                        },
                        commit: function (widget) {
                            widget.setData('tablite', this.getValue());
                        }
                    }
                ]
            }
        ],
        onOk: function () {
            var xclass = (this.getValueOf('tab1', 'disktop') != "") ? "col-md-" + this.getValueOf('tab1', 'disktop') : "";
            xclass += (this.getValueOf('tab1', 'tablite') != "") ? " col-sm-" + this.getValueOf('tab1', 'tablite') : "";
            xclass += (this.getValueOf('tab1', 'mobile') != "") ? " col-lg-" + this.getValueOf('tab1', 'mobile') : "";

            editor.insertHtml('[col xclass="' + xclass + '"][/col]');
        }
    };
});