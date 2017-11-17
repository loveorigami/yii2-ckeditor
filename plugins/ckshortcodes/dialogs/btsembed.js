CKEDITOR.dialog.add('btsembed', function (editor) {
    return {
        title: 'Embed',
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
                        'default': "youtube",
                        items: [
                            ["YouTube", 'youtube'],
                            ["Yandex Map", 'ymap'],
                        ],
                        validate: CKEDITOR.dialog.validate.notEmpty("Explanation field cannot be empty."),
                        commit: function (widget) {
                            widget.setData('type', this.getValue());
                        }
                    },
                    {
                        id: 'code',
                        type: 'textarea',
                        label: "Code (with iframe or script)",
                        validate: CKEDITOR.dialog.validate.notEmpty("Explanation field cannot be empty."),
                        commit: function (widget) {
                            widget.setData('code', this.getValue());
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
                        commit: function (widget) {
                            widget.setData('pull', this.getValue());
                        }
                    },
                    {
                        id: 'h',
                        type: 'text',
                        label: "Height",
                        commit: function (widget) {
                            widget.setData('h', this.getValue());
                        }
                    },
                    {
                        id: 'w',
                        type: 'text',
                        label: "Width",
                        commit: function (widget) {
                            widget.setData('w', this.getValue());
                        }
                    },
                ]
            }
        ],
        onShow: function () {
            this.setValueOf('tab1', 'code', editor.getSelection().getSelectedText().toString());
        },
        onOk: function () {
            var code = this.getValueOf('tab1', 'code');
            var type = this.getValueOf('tab1', 'type');
            var pull = this.getValueOf('tab1', 'pull');
            var h = this.getValueOf('tab1', 'h');
            var w = this.getValueOf('tab1', 'w');

            var align = pull ? ' pull="' + pull + '"' : '';
            var width = w ? ' w="' + w + '"' : '';
            var height = h ? ' h="' + h + '"' : '';

            var op = align + w + h;

            if (type == 'ymap') {
                // https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A5b2c4e62dff63e4d246580760a6adaf1046aa1145db78092bbd260dd6e7aa938&amp;width=100%25&amp;height=400
                var regExp = /um=([A-Za-z0-9-%]+)/,
                    mapId = code.match(regExp);

                if (mapId && mapId[1].length > 10) {
                    code = mapId[1];
                }

                editor.insertHtml('[ymap um="' + code + '"' + op + ']');
            }

            if (type == 'youtube') {
                var regExp = /youtube.com\/embed\/([A-Za-z0-9-]+)/,
                    videoId = code.match(regExp);

                if (videoId && videoId[1].length > 10) {
                    code = videoId[1];
                }

                editor.insertHtml('[youtube code="' + code + '"' + op + ']');
            }
        }
    };
});