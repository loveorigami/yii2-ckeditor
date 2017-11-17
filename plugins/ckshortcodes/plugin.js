(function () {
    CKEDITOR.plugins.add('ckshortcodes', {
        requires: 'widget,dialog,numericinput',
        lang: 'ru,en',
        init: function (editor) {
            editor.addMenuGroup('bs_shortcodes');

            var items = {
                btsgal: {
                    command: 'btsgal',
                    label: "Gallery",
                    group: 'bs_shortcodes',
                    icon: this.path + 'icons/image.png',
                    order: 1
                },
                btsembed: {
                    command: 'btsembed',
                    label: "Embed",
                    group: 'bs_shortcodes',
                    icon: this.path + 'icons/oembed.png',
                    order: 2
                },
                btstab: {
                    command: 'btstab',
                    label: "Tab & Accordion",
                    group: 'bs_shortcodes',
                    icon: this.path + 'icons/btstab.png',
                    order: 3
                },
                btsalerts: {
                    command: 'btsalerts',
                    label: "Alerts",
                    group: 'bs_shortcodes',
                    icon: this.path + 'icons/btsalerts.png',
                    order: 10
                },
                btsrow: {
                    command: 'btsrow',
                    label: "Row",
                    group: 'bs_shortcodes',
                    icon: this.path + 'icons/btsrow.png',
                    order: 12
                },
                btscol: {
                    command: 'btscol',
                    label: "Col",
                    group: 'bs_shortcodes',
                    icon: this.path + 'icons/btscol.png',
                    order: 13
                }
            };

            editor.addMenuItems(items);

            editor.ui.add('Groupped', CKEDITOR.UI_MENUBUTTON, {
                label: editor.lang.ckshortcodes.shortcodes,
                // Disable in source mode.
                modes: {
                    wysiwyg: 1
                },
                icon: this.path + 'icons/shortcode.png',
                toolbar: 'insert,55',
                onMenu: function () {
                    var active = {};
                    // Make all items active.
                    for (var p in items) {
                        active[p] = CKEDITOR.TRISTATE_OFF;
                    }

                    return active;
                }
            });

            editor.addCommand('btsgal', new CKEDITOR.dialogCommand('btsgal', {}));
            editor.addCommand('btstab', new CKEDITOR.dialogCommand('btstab', {}));
            editor.addCommand('btsembed', new CKEDITOR.dialogCommand('btsembed', {}));
            editor.addCommand('btsalerts', new CKEDITOR.dialogCommand('btsalerts', {}));
            editor.addCommand('btscol', new CKEDITOR.dialogCommand('btscol', {}));
            editor.addCommand('btsrow', {exec: bsRow});

            CKEDITOR.dialog.add('btsgal', this.path + 'dialogs/btsgal.js');
            CKEDITOR.dialog.add('btstab', this.path + 'dialogs/btstab.js');
            CKEDITOR.dialog.add('btsembed', this.path + 'dialogs/btsembed.js');
            CKEDITOR.dialog.add('btsalerts', this.path + 'dialogs/btsalerts.js');
            CKEDITOR.dialog.add('btscol', this.path + 'dialogs/btscol.js');

            function bsRow(e) {
                var text = e.getSelection().getSelectedText().toString();
                e.insertHtml('[row]' + text + '[/row]');
            }

        },
    });
})();