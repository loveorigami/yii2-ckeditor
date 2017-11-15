CKEDITOR.dialog.add('btsprogress', function (editor) {
					return {
						title: 'Progress Bar',
						minWidth: 500,
						minHeight: 150,
						resizable: false,
						contents: [
							{
								id : 'tab1',
								label : 'First Tab',
								title : 'First Tab',
								elements :[
									{
										id: 'percent',
										type: 'text',
										label: "Percent",
										validate: CKEDITOR.dialog.validate.notEmpty( "Explanation field cannot be empty." ),
										setup: function (widget) {
											this.setValue(widget.data.percent || '');
										},
										commit: function (widget) {
											widget.setData('percent', this.getValue());
										}
									}
								]
							}
						],
						onOk: function() {
							var percent = this.getValueOf('tab1', 'percent');
							editor.insertHtml('[progress percent="'+percent+'"][/progress]');
							// editor.insertText('[alerts type="'+type+'"]'+message+'[/alerts]');
						}
					};
				});