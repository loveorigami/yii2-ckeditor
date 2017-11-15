CKEDITOR.dialog.add('btsjumbotron', function (editor) {
					return {
						title: 'Jumbotron',
						minWidth: 500,
						minHeight: 150,
						resizable: false,
						contents: [
							{
								id : 'tab1',
								label : 'First Tab',
								title : 'First Tab',
								elements :[{
										id: 'title',
										type: 'text',
										label: "Title",
										validate: CKEDITOR.dialog.validate.notEmpty( "Explanation field cannot be empty." ),
										setup: function (widget) {
											this.setValue(widget.data.title || '');
										},
										commit: function (widget) {
											widget.setData('title', this.getValue());
										}
									},
									{
										id: 'text',
										type: 'text',
										label: "Text",
										validate: CKEDITOR.dialog.validate.notEmpty( "Explanation field cannot be empty." ),
										setup: function (widget) {
											this.setValue(widget.data.text || '');
										},
										commit: function (widget) {
											widget.setData('text', this.getValue());
										}
									}
								]
							}
						],
						onOk: function() {
							var title = this.getValueOf('tab1', 'title');
							var stext = this.getValueOf('tab1', 'text');
							editor.insertHtml('[jumbotron type="'+title+'"]'+stext+'[/jumbotron]');
						}
					};
				});